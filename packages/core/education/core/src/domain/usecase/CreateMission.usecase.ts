import { Result, UseCase } from "@spysec/shared";
import { EducationRepository } from "../provider/Education.repository";
import { CreateMissionInputDTO, Mission } from "../model/Mission.entity";

export class CreateMission implements UseCase<CreateMissionInputDTO, Mission>{
    constructor(
        private readonly repoEducation: EducationRepository
    ){}

    async execute(input: CreateMissionInputDTO): Promise<Result<Mission>> {
        const trackExists = await this.repoEducation.findTrackById(input.trackId);        
        if (!trackExists) {
            return Result.fail("TRACK_NOT_FOUND");
        }
        
        const missionOrError = Mission.create(input);
        if(missionOrError.failed){
            return Result.fail(missionOrError.errors)
        }
        
        const mission = missionOrError.value!;     
        const saveResult = await Result.tryAsync(() =>  
            this.repoEducation.saveMission(mission)
        );   

        if (saveResult.failed) {            
            return Result.fail(saveResult.errors);
        }

        return Result.ok(mission);
    }
}