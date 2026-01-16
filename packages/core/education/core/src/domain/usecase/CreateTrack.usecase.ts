import { Result, UseCase } from "@spysec/shared";
import { CreateTrackInputDTO, Track } from "../model/Track.entity";
import { EducationRepository } from "../provider/Education.repository";

export class CreateTrack implements UseCase<CreateTrackInputDTO, Track>{
    constructor(
        private readonly repoEducation: EducationRepository
    ){}

    async execute(input: CreateTrackInputDTO): Promise<Result<Track>> {
        const trackOrError = Track.create(input);
        if(trackOrError.failed){
            return Result.fail(trackOrError.errors)
        }
        
        const track = trackOrError.value!;     
        const saveResult = await Result.tryAsync(() => 
            this.repoEducation.saveTrack(track)
        );   

        if (saveResult.failed) {            
            return Result.fail(saveResult.errors);
        }

        return Result.ok(track);
    }
}