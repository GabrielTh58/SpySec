import { GetTrackDetails, TrackProgress } from "@spysec/education";
import { MissionBuilder } from "../builders/MissionBuilder";
import { TrackBuilder } from "../builders/TrackBuilder";
import { InMemoryEducationRepository } from "../repositories/InMemoryEducationGateway";
import { InMemoryTrackProgressRepository } from "../repositories/InMemoryTrackProgressRepo";

describe("GetTrackDetails UseCase", () => {    
    let eduRepo: InMemoryEducationRepository;
    let progressRepo: InMemoryTrackProgressRepository;
    let useCase: GetTrackDetails;
        
    let defaultTrackId: string;

    beforeEach(async () => {        
        eduRepo = new InMemoryEducationRepository();
        progressRepo = new InMemoryTrackProgressRepository();
        useCase = new GetTrackDetails(eduRepo, progressRepo);

        const track = TrackBuilder.aTrack().withTitle("Trilha Padrão").build();
        await eduRepo.saveTrack(track);
        defaultTrackId = track.id.toString();
    });

    async function createStandardMissions() {
        const m1 = MissionBuilder.aMission().inTrack(defaultTrackId).withOrder(1).build();
        const m2 = MissionBuilder.aMission().inTrack(defaultTrackId).withOrder(2).build();
        const m3 = MissionBuilder.aMission().inTrack(defaultTrackId).withOrder(3).build();
        
        await Promise.all([
            eduRepo.saveMission(m1),
            eduRepo.saveMission(m2),
            eduRepo.saveMission(m3)
        ]);
    }

    async function simulateUserProgress(userId: string, completedOrder: number) {
        const startResult = TrackProgress.start({ userId, trackId: defaultTrackId });
        const progress = startResult.value!;
        
        const updated = progress.updateLastMission(completedOrder);
        
        await progressRepo.save(updated);
    }

    it("should return correct status (Completed/Available/Locked)", async () => {        
        await createStandardMissions();
                
        await simulateUserProgress("user-1", 1);
        
        const result = await useCase.execute({ trackId: defaultTrackId, userId: "user-1" });

        const missions = result.value!.missions;
        
        missions.sort((a, b) => a.order - b.order);

        expect(missions.find(m => m.order === 1)?.status).toBe("COMPLETED");
        expect(missions.find(m => m.order === 2)?.status).toBe("AVAILABLE");
        expect(missions.find(m => m.order === 3)?.status).toBe("LOCKED");
        
        expect(missions.find(m => m.order === 3)?.isLocked).toBe(true);
    });

    it("should lock mission 3 if user has only completed mission 1", async () => {
        await createStandardMissions();
        await simulateUserProgress("user-abc", 1);

        const result = await useCase.execute({ trackId: defaultTrackId, userId: "user-abc" });

        const m3 = result.value!.missions.find(m => m.order === 3);
        expect(m3?.status).toBe("LOCKED");
    });

    it("should return error if track does not exist", async () => {      
        const result = await useCase.execute({ trackId: "id-que-nao-existe", userId: "user-1" });

        expect(result.failed).toBe(true);

        const errorString = JSON.stringify(result.errors || result.errors);
        expect(errorString).toContain("TRACK_NOT_FOUND");
    });
});