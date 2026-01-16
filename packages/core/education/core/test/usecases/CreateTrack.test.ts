import { CreateTrack, CreateTrackInputDTO, TrackDifficulty, TrackVisibility } from "@spysec/education";
import { InMemoryEducationRepository } from "../repositories/InMemoryEducationGateway"

describe("CreateTrack UseCase", () => {    
    let eduRepo: InMemoryEducationRepository;
    let usecase: CreateTrack;

    beforeEach(() => {
        eduRepo = new InMemoryEducationRepository();
        usecase = new CreateTrack(eduRepo);
    });

   
    it('should create track successfully and persist it', async () => {          
        const input: CreateTrackInputDTO = {
            title: "Trilha Nova",
            description: "Uma trilha de teste",
            iconUrl: "icon.png",
            difficulty: TrackDifficulty.BASIC,
            targetProfile: TrackVisibility.ALL,
            minLevel: 0
        };
            
        const result = await usecase.execute(input);
        
        expect(result.succeeded).toBe(true);
        expect(result.value?.title).toBe("Trilha Nova");
        
        const trackInDb = await eduRepo.findTrackById(result.value!.id.toString());
        expect(trackInDb).not.toBeNull();
        expect(trackInDb?.title).toBe("Trilha Nova");
    });
   
    it('should fail when creating track with invalid data (empty title)', async () => {
        const invalidInput: CreateTrackInputDTO = {
            title: "",
            description: "Desc",
            iconUrl: "icon.png",
            difficulty: TrackDifficulty.BASIC,
            targetProfile: TrackVisibility.ALL
        };

        const result = await usecase.execute(invalidInput);
        
        expect(result.failed).toBe(true);       
        expect(result.errors[0]?.type).toContain("TITLE_IS_REQUIRED");
    });

    it('should fail if database fails', async () => {
         jest.spyOn(eduRepo, 'saveTrack').mockRejectedValueOnce(new Error("DB Error"));

         const input: CreateTrackInputDTO = {
            title: "Teste DB",
            description: "Desc",
            iconUrl: "icon.png",
            difficulty: TrackDifficulty.BASIC,
            targetProfile: TrackVisibility.ALL
        };

        const result = await usecase.execute(input);
        
        expect(result.failed).toBe(true);
    });

    it('should fail when title is invalid for Slug generation (e.g. too short)', async () => {
        const inputWithBadTitle: CreateTrackInputDTO = {
            title: "Oi", 
            description: "Desc",
            iconUrl: "icon.png",
            difficulty: TrackDifficulty.BASIC,
            targetProfile: TrackVisibility.ALL
        };

        const result = await usecase.execute(inputWithBadTitle);
        
        expect(result.failed).toBe(true);
        expect(result.errors[0]?.type).toContain("SLUG_TOO_SHORT"); 
    });

    it('should fail when minLevel is negative', async () => {
        const inputNegativeLevel: CreateTrackInputDTO = {
            title: "Trilha Hard",
            description: "Desc",
            iconUrl: "icon.png",
            difficulty: TrackDifficulty.BASIC,
            targetProfile: TrackVisibility.ALL,
            minLevel: -5 
        };

        const result = await usecase.execute(inputNegativeLevel);
        
        expect(result.failed).toBe(true);
        expect(result.errors[0]?.type).toContain("LEVEL_MUST_BE_POSITIVE");
    });

    it('should fail if description or iconUrl are missing', async () => {
         const inputMissingFields: CreateTrackInputDTO = {
            title: "Trilha Ok",
            description: "", 
            iconUrl: "", 
            difficulty: TrackDifficulty.BASIC,
            targetProfile: TrackVisibility.ALL
        };

        const result = await usecase.execute(inputMissingFields);

        expect(result.failed).toBe(true);        
        expect(result.errors[0]?.type).toMatch(/DESCRIPTION_IS_REQUIRED|ICON_URL_IS_REQUIRED/);
    });
});