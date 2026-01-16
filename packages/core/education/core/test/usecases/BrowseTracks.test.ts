import { MissionBuilder } from "../builders/MissionBuilder";
import { TrackBuilder } from "../builders/TrackBuilder";
import { InMemoryGamificationGateway } from "../repositories/InMemoryGamificationRepo";
import { InMemoryEducationRepository } from "../repositories/InMemoryEducationGateway";
import { InMemoryTrackProgressRepository } from "../repositories/InMemoryTrackProgressRepo";
import { BrowseTracks, TrackProgress, TrackVisibility } from "@spysec/education";
import { ProfileType } from "@spysec/auth";

describe("BrowseTracks UseCase", () => {
    let eduRepo: InMemoryEducationRepository;
    let progressRepo: InMemoryTrackProgressRepository; 
    let gameGateway: InMemoryGamificationGateway;
    let useCase: BrowseTracks;

    beforeEach(() => {
        eduRepo = new InMemoryEducationRepository();
        progressRepo = new InMemoryTrackProgressRepository();
        gameGateway = new InMemoryGamificationGateway();
        
        useCase = new BrowseTracks(eduRepo, progressRepo, gameGateway);
    });

    it("should only return tracks visible to the user profile", async () => {
        const personalTrack = TrackBuilder.aTrack().withTitle("Pessoal").forProfile(TrackVisibility.PERSONAL).build();
        const corpTrack = TrackBuilder.aTrack().withTitle("Corp").forProfile(TrackVisibility.CORPORATE).build();
        
        await eduRepo.saveTrack(personalTrack);
        await eduRepo.saveTrack(corpTrack);

        const result = await useCase.execute({ 
            userId: "user-1", 
            userProfile: ProfileType.PERSONAL 
        });

        expect(result.succeeded).toBe(true);
        const tracks = result.value!;
        expect(tracks).toHaveLength(1);
        expect(tracks[0]?.title).toBe("Pessoal");
    });

    it("should calculate progress percentage correctly based on lastCompletedOrder", async () => {
        const track = TrackBuilder.aTrack().withTitle("Trilha Java").build();
        await eduRepo.saveTrack(track);
        
        for (let i = 1; i <= 4; i++) {
            const m = MissionBuilder.aMission().inTrack(track.id.toString()).withOrder(i).build();
            await eduRepo.saveMission(m);
        }

        const progressResult = TrackProgress.start({
            userId: "user-1",
            trackId: track.id.toString()
        });
        
        if (progressResult.failed) throw new Error(progressResult.errors?.toString());
        const progress = progressResult.value!;

        const updatedProgress = progress.updateLastMission(2);
        
        await progressRepo.save(updatedProgress);

        const result = await useCase.execute({ userId: "user-1", userProfile: ProfileType.PERSONAL });

        const trackCard = result.value![0];
        
        expect(trackCard?.progressPercentage).toBe(50); 
        expect(trackCard?.status).toBe("IN_PROGRESS");
    });

    it("should mark status as COMPLETED when all missions are done", async () => {        
        const track = TrackBuilder.aTrack().forProfile(TrackVisibility.ALL).build();
        await eduRepo.saveTrack(track);
    
        const m1 = MissionBuilder.aMission().inTrack(track.id.toString()).withOrder(1).build();
        await eduRepo.saveMission(m1);

        const progress = TrackProgress.start({
            userId: "user-1",
            trackId: track.id.toString()
        }).value!;
        
        const updatedProgress = progress.updateLastMission(1);
        
        const completedResult = updatedProgress.complete(100);
        
        if (completedResult.failed) throw new Error(completedResult.errors?.toString());
        
        await progressRepo.save(completedResult.value!);
    
        const result = await useCase.execute({ userId: "user-1", userProfile: ProfileType.PERSONAL });

        const trackCard = result.value?.[0];

        expect(trackCard?.progressPercentage).toBe(100);
        expect(trackCard?.status).toBe("COMPLETED");
    });

    it("should lock track if prerequisite track is not completed", async () => {                
        const trackA = TrackBuilder.aTrack().withTitle("Básico").build();
        const trackB = TrackBuilder.aTrack()
            .withTitle("Advanced")
            .withPrerequisite(trackA.id.toString()) 
            .build();

        await eduRepo.saveTrack(trackA);
        await eduRepo.saveTrack(trackB);
        
        const result = await useCase.execute({ userId: "user-noob", userProfile: ProfileType.PERSONAL });
        const tracks = result.value!;
        
        const cardB = tracks.find(t => t.id === trackB.id.toString());

        expect(cardB?.isLocked).toBe(true);  
        expect(cardB?.status).toBe("LOCKED");       
        expect(cardB?.lockReason).toBe("PREREQUISITE"); 
    });

    it("should unlock track if prerequisite is met", async () => {
        const trackA = TrackBuilder.aTrack().build();
        const trackB = TrackBuilder.aTrack().withPrerequisite(trackA.id.toString()).build();
        await eduRepo.saveTrack(trackA);
        await eduRepo.saveTrack(trackB);

        const progressA = TrackProgress.start({
            userId: "user-pro",
            trackId: trackA.id.toString()
        }).value!;
        
        const completedProgressA = progressA.complete(500).value!;
        await progressRepo.save(completedProgressA);

        const result = await useCase.execute({ userId: "user-pro", userProfile: ProfileType.PERSONAL });
     
        const cardB = result.value!.find(t => t.id === trackB.id.toString());
        
        expect(cardB?.isLocked).toBe(false); 
        expect(cardB?.status).toBe("NOT_STARTED");
    });

    it("should lock track if user level is insufficient", async () => {        
        const trackHighLevel = TrackBuilder.aTrack().withMinLevel(10).build();
        await eduRepo.saveTrack(trackHighLevel);

        gameGateway.setUserStats("user-lvl1", 0, 1);

        const result = await useCase.execute({ userId: "user-lvl1", userProfile: ProfileType.PERSONAL });
        
        const card = result.value![0];
        expect(card!.isLocked).toBe(true);
        expect(card!.lockReason).toContain("LEVEL");
    });
});