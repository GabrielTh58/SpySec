import { Result, UseCase } from "@spysec/shared";
import { EducationRepository } from "../provider/Education.repository";
import { MissionStatus } from "../model/Mission.entity";
import { TrackProgressRepository } from "../provider/TrackProgress.repository";

export interface GetTrackDetailsInputDTO {
    trackId: string;
    userId: string; 
}

export interface GetTrackDetailsOutputDTO {
    track: {
        id: string;
        title: string;
        description: string;        
    };
    missions: {
        id: string;
        title: string;
        xpReward: number;
        order: number;
        status: MissionStatus; 
        isLocked: boolean;
    }[];
}

export class GetTrackDetails implements UseCase<GetTrackDetailsInputDTO, GetTrackDetailsOutputDTO> {
    constructor(
        private readonly repoEducation: EducationRepository,
        private readonly repoProgress: TrackProgressRepository 
    ) {}

    async execute(input: GetTrackDetailsInputDTO): Promise<Result<GetTrackDetailsOutputDTO>> {        
        const trackOrError = await Result.tryAsync(() => 
            this.repoEducation.findTrackById(input.trackId)
        );
        if (trackOrError.failed) return Result.fail(trackOrError.errors);

        const track = trackOrError.value;
        if (!track) return Result.fail('TRACK_NOT_FOUND');

        const dataOrError = await Result.tryAsync(() => Promise.all([
            this.repoEducation.findMissionsByTrackId(input.trackId),
            this.repoProgress.findProgress(input.userId, input.trackId)
        ]));
        if (dataOrError.failed) return Result.fail(dataOrError.errors);

        const [missions, progress] = dataOrError.value!

        const lastOrder = progress?.lastCompletedOrder ?? 0;

        missions.sort((a, b) => a.order - b.order);
        
       const missionsView = missions.map(mission => {
            const status = mission.calculateStatus(lastOrder);

            return {
                id: mission.id.toString(), 
                title: mission.title,
                xpReward: mission.xpReward,
                order: mission.order,
                status,
                isLocked: status === 'LOCKED'
            }
        });

        return Result.ok({
            track: {
                id: track.id.toString(),
                title: track.title,         
                description: track.description 
            },
            missions: missionsView
        });
    }
}