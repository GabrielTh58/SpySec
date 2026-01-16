import { GetMissionData, TrackProgress} from "@spysec/education";
import { MissionBuilder } from "../builders/MissionBuilder";
import { TrackBuilder } from "../builders/TrackBuilder";
import { InMemoryEducationRepository } from "../repositories/InMemoryEducationGateway";
import { InMemoryTrackProgressRepository } from "../repositories/InMemoryTrackProgressRepo";

describe("GetMissionData UseCase", () => {
    let eduRepo: InMemoryEducationRepository;
    let progressRepo: InMemoryTrackProgressRepository;
    let useCase: GetMissionData;
    
    let defaultTrackId: string;

    beforeEach(async () => {
        eduRepo = new InMemoryEducationRepository();
        progressRepo = new InMemoryTrackProgressRepository();
        useCase = new GetMissionData(eduRepo, progressRepo);

        const track = TrackBuilder.aTrack().withTitle("Trilha Teste").build();
        await eduRepo.saveTrack(track);
        defaultTrackId = track.id.toString();
    });

    async function simulateUserProgress(userId: string, completedOrder: number) {
        const startResult = TrackProgress.start({ userId, trackId: defaultTrackId });
        const progress = startResult.value!;
        const updated = progress.updateLastMission(completedOrder);
        await progressRepo.save(updated);
    }

    it("should return mission data successfully if mission is AVAILABLE (Mission 1)", async () => {
        const mission1 = MissionBuilder.aMission()
            .inTrack(defaultTrackId)
            .withOrder(1)
            .withContent([{ id: "txt-1", type: "INFO", data: { text: "Segredo" } }])
            .build();
        await eduRepo.saveMission(mission1);

        const result = await useCase.execute({
            userId: "user-new",
            missionId: mission1.id.toString()
        });

        expect(result.succeeded).toBe(true);
        expect(result.value).toBeDefined();
        expect(result.value!.title).toBe(mission1.title);
        expect(result.value!.blocks?.[0]?.id).toBe("txt-1");
    });

    it("should BLOCK access (return error) if mission is LOCKED (Mission 2 without doing Mission 1)", async () => {
        const mission2 = MissionBuilder.aMission()
            .inTrack(defaultTrackId)
            .withOrder(2)
            .build();
        await eduRepo.saveMission(mission2);

        const result = await useCase.execute({
            userId: "user-hacker",
            missionId: mission2.id.toString()
        });

        expect(result.failed).toBe(true);
        expect(result.errors[0]!.type).toBe("MISSION_LOCKED"); 
    });

    it("should ALLOW access to Mission 2 if Mission 1 is completed", async () => {
        const mission2 = MissionBuilder.aMission()
            .inTrack(defaultTrackId)
            .withOrder(2)
            .build();
        await eduRepo.saveMission(mission2);

        await simulateUserProgress("user-pro", 1);

        const result = await useCase.execute({
            userId: "user-pro",
            missionId: mission2.id.toString()
        });

        expect(result.succeeded).toBe(true);
        expect(result.value?.id).toBe(mission2.id.toString());
    });

    it("should return correct nextMissionId when available", async () => {
        const m1 = MissionBuilder.aMission().inTrack(defaultTrackId).withOrder(1).build();
        const m2 = MissionBuilder.aMission().inTrack(defaultTrackId).withOrder(2).build();
        
        await eduRepo.saveMission(m1);
        await eduRepo.saveMission(m2);

        const result = await useCase.execute({
            userId: "user-1",
            missionId: m1.id.toString()
        });

        expect(result.value?.nextMissionId).toBe(m2.id.toString());
    });

    it("should return null nextMissionId if it is the last mission", async () => {
        const m1 = MissionBuilder.aMission().inTrack(defaultTrackId).withOrder(1).build();
        await eduRepo.saveMission(m1);

        const result = await useCase.execute({
            userId: "user-1",
            missionId: m1.id.toString()
        });

        expect(result.value?.nextMissionId).toBeNull();
    });

    it("should fail if mission does not exist", async () => {
        const result = await useCase.execute({
            userId: "user-1",
            missionId: "ghost-id"
        });

        expect(result.failed).toBe(true);
        expect(result.errors[0]!.type).toBe("MISSION_NOT_FOUND");
    });
});