
import { BrowseTracks, BrowseTracksInputDTO, CompleteMission, CompleteMissionInputDTO, CompleteMissionOutputDTO, CreateMission, CreateMissionInputDTO, CreateTrack, CreateTrackInputDTO, EducationRepository, GamificationGateway, GetMissionData, GetMissionDataInputDTO, GetMissionDataOutputDTO, GetTrackDetails, TrackCardDTO, GetTrackDetailsInputDTO, GetTrackDetailsOutputDTO, TrackProgressRepository } from "@spysec/education";
import { CreateTrackOutputDTO, CreateMissionOutputDTO } from "../dto";

export class EducationFacade {
    constructor(
        private readonly repoEducation: EducationRepository,                
        private readonly repoProgress: TrackProgressRepository,    
        private readonly gatewayGamification: GamificationGateway    
    ) {}

    async createTrack(input: CreateTrackInputDTO): Promise<CreateTrackOutputDTO> {
        const useCase = new CreateTrack(this.repoEducation);
        
        const result = await useCase.execute(input);
        
        if (result.failed) result.throwIfFailed();

        const trackEntity = result.value!;
     
        return {
            id: trackEntity.id.toString(),
            title: trackEntity.title,
            slug: trackEntity.slug,
        };
    }   

    async createMission(input: CreateMissionInputDTO): Promise<CreateMissionOutputDTO> {
        const useCase = new CreateMission(this.repoEducation);
        
        const result = await useCase.execute(input);
        
        if (result.failed) result.throwIfFailed();

        const missionEntity = result.value!;
     
        return {
            id: missionEntity.id.toString(),
            title: missionEntity.title,
            trackId: missionEntity.trackId            
        };
    }   

    async getTrackDetails(input: GetTrackDetailsInputDTO): Promise<GetTrackDetailsOutputDTO> {        
        const useCase = new GetTrackDetails(
            this.repoEducation, 
            this.repoProgress
        );
                
        const result = await useCase.execute(input);        
        if(result.failed) result.throwIfFailed()

        return result.value!;
    }

    async getMissionData(input: GetMissionDataInputDTO): Promise<GetMissionDataOutputDTO>{
        const useCase = new GetMissionData(
            this.repoEducation,
            this.repoProgress
        )

        const result = await useCase.execute(input)

        if(result.failed) result.throwIfFailed()

        return result.value
    }

    async completeMission(input: CompleteMissionInputDTO): Promise<CompleteMissionOutputDTO>{
        const useCase = new CompleteMission(
            this.repoEducation,
            this.repoProgress
        )

        const result = await useCase.execute(input)

        if(result.failed) result.throwIfFailed()

        return result.value
    }

    async browseTracks(input: BrowseTracksInputDTO): Promise<TrackCardDTO[]>{
        const useCase = new BrowseTracks(
            this.repoEducation,
            this.repoProgress,
            this.gatewayGamification
        )

        const result = await useCase.execute(input)

        if(result.failed) result.throwIfFailed()

        return result.value
    }         
}