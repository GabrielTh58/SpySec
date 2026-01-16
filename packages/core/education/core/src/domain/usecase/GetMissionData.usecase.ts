import { Result, UseCase } from "@spysec/shared";
import { EducationRepository } from "../provider/Education.repository";
import { MissionBlock } from "../value-objects/MissionContent.vo";
import { TrackProgressRepository } from "../provider/TrackProgress.repository";

export interface GetMissionDataInputDTO {
  missionId: string;
  userId: string
}

export interface GetMissionDataOutputDTO {
  id: string;      
  title: string;       
  description?: string; 
  blocks: MissionBlock[];    
  nextMissionId?: string | null; 
}

export class GetMissionData implements UseCase<GetMissionDataInputDTO, GetMissionDataOutputDTO> {
  constructor(
    private readonly repoEducation: EducationRepository,
    private readonly repoProgress: TrackProgressRepository
) {}

  async execute(input: GetMissionDataInputDTO): Promise<Result<GetMissionDataOutputDTO>> {
    const missionOrError = await Result.tryAsync(() =>
      this.repoEducation.findMissionById(input.missionId)
    );
    if (missionOrError.failed) {
      return Result.fail(missionOrError.errors);
    }

    const mission = missionOrError.value;
    if (!mission) {
      return Result.fail("MISSION_NOT_FOUND");
    }

    const progressOrError = await Result.tryAsync(() => 
        this.repoProgress.findProgress(input.userId, mission.trackId)
    );
    if (progressOrError.failed) {
        return Result.fail(progressOrError.errors);
    }

    const progress = progressOrError.value!;
    const lastOrder = progress ? progress.lastCompletedOrder : 0;

    const status = mission.calculateStatus(lastOrder);
    if (status === 'LOCKED') {
        return Result.fail("MISSION_LOCKED");
    }

    const nextMissionOrError = await Result.tryAsync(() => 
      this.repoEducation.findMissionByOrder(mission.trackId, mission.order + 1)
    )

    const nextMission = nextMissionOrError.succeeded ? nextMissionOrError.value : null;

    return Result.ok({
      id: mission.id.toString(),
      title: mission.title,
      description: mission.description,
      blocks: mission.blocks,
      nextMissionId: nextMission ? nextMission.id.toString() : null
    });
  }
}
