import { CreateMissionInputDTO, CreateMission } from "@spysec/education";
import { InMemoryEducationRepository } from "../repositories/InMemoryEducationGateway";
import { TrackBuilder } from "../builders/TrackBuilder"; 


describe("CreateMission UseCase", () => {    
    let eduRepo: InMemoryEducationRepository;
    let usecase: CreateMission;

    beforeEach(() => {
        eduRepo = new InMemoryEducationRepository();
        usecase = new CreateMission(eduRepo);
    });

    it('should create mission successfully and persist it', async () => {             
        const parentTrack = TrackBuilder.aTrack().build();
        await eduRepo.saveTrack(parentTrack);
        
        const input: CreateMissionInputDTO = {
            title: "New Mission",
            description: "Test Mission", 
            trackId: parentTrack.id.toString(), 
            order: 1,
            category: "GENERAL",
            xpReward: 100,        
            content: [
                { 
                    id: "block-1", 
                    type: "INFO", 
                    data: { 
                        text: "Texto de introdução da missão.",
                        title: "Bem-vindo"
                    }
                }              
            ]
        };             
        
        const result = await usecase.execute(input);

        expect(result.succeeded).toBe(true);
        expect(result.value?.title).toBe("New Mission"); 
        
       
        const missionInDb = await eduRepo.findMissionById(result.value!.id.toString());
        expect(missionInDb).not.toBeNull();
        expect(missionInDb?.title).toBe("New Mission");

        expect(missionInDb?.content?.blocks?.[0]?.type).toBe("INFO");
    });

    it('should fail if track does not exist', async () => {
        const input: CreateMissionInputDTO = {
            title: "Ghost Mission",
            description: "Desc", 
            trackId: "id-que-nao-existe", 
            order: 1,
            category: "GENERAL",
            xpReward: 100,
            content: [{ id: "b1", type: "INFO", data: { text: "abc" } }]
        };

        const result = await usecase.execute(input);
        
        expect(result.failed).toBe(true);
        expect(result.errors[0]?.type).toContain("TRACK_NOT_FOUND"); 
    });

      
    it('should fail validation when fields are invalid (negative XP)', async () => {
        const parentTrack = TrackBuilder.aTrack().build();
        await eduRepo.saveTrack(parentTrack);

        const invalidInput: CreateMissionInputDTO = {
            title: "Bad Mission",
            description: "Desc", 
            trackId: parentTrack.id.toString(),
            order: 1,
            category: "GENERAL",
            xpReward: -50, 
            content: [{ id: "b1", type: "INFO", data: { text: "ok" } }]
        };

        const result = await usecase.execute(invalidInput);
        
        expect(result.failed).toBe(true);   
        expect(result.errors[0]?.type).toContain("XP_REWARD_MUST_BE_POSITIVE"); 
    });

    
    it('should fail when content blocks are malformed', async () => {
        const parentTrack = TrackBuilder.aTrack().build();
        await eduRepo.saveTrack(parentTrack);

        const invalidContentInput: CreateMissionInputDTO = {
            title: "Quiz Mission",
            description: "Desc", 
            trackId: parentTrack.id.toString(),
            order: 1,
            category: "GENERAL",
            xpReward: 100,
            content: [
                { 
                    id: "b1", 
                    type: "QUIZ", 
                    // @ts-ignore: Forçando erro de tipagem para testar runtime
                    data: { 
                        question: "Pergunta sem opções?"                         
                    } 
                }
            ]
        };

        const result = await usecase.execute(invalidContentInput);
        
        expect(result.failed).toBe(true);     
        expect(result.errors[0]?.type).toMatch('QUIZ_MISSING_CORRECT_OPTION'); 
    });
});