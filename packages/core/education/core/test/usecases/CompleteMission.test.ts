import { CompleteMission, MissionCompletedEvent, TrackCompletedEvent, TrackProgress } from "@spysec/education"; 
import { MissionBuilder } from "../builders/MissionBuilder";
import { TrackBuilder } from "../builders/TrackBuilder";
import { InMemoryEducationRepository } from "../repositories/InMemoryEducationGateway";
import { InMemoryTrackProgressRepository } from "../repositories/InMemoryTrackProgressRepo";
import { DomainEvents } from "@spysec/shared"; 

describe("CompleteMission UseCase", () => {
    let eduRepo: InMemoryEducationRepository;
    let progressRepo: InMemoryTrackProgressRepository;
    let useCase: CompleteMission;

    let domainEventSpy: jest.SpyInstance;

    beforeEach(() => {
        eduRepo = new InMemoryEducationRepository();
        progressRepo = new InMemoryTrackProgressRepository();        
        useCase = new CompleteMission(eduRepo, progressRepo);

        domainEventSpy = jest.spyOn(DomainEvents, 'dispatch');
        domainEventSpy.mockImplementation(() => Promise.resolve()); 
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should complete mission successfully, award XP and dispatch MissionCompletedEvent", async () => {        
        const track = TrackBuilder.aTrack().build();
        await eduRepo.saveTrack(track);
        
        const mission1 = MissionBuilder.aMission()
            .inTrack(track.id.toString())
            .withOrder(1)
            .withXp(100)
            .build();
        const mission2 = MissionBuilder.aMission()
            .inTrack(track.id.toString())
            .withOrder(2)
            .build();

        await eduRepo.saveMission(mission1);
        await eduRepo.saveMission(mission2);

        const result = await useCase.execute({
            userId: "user-1",
            missionId: mission1.id.toString()
        });

        expect(result.succeeded).toBe(true);
        expect(result.value?.xpEarned).toBe(100); 
        expect(result.value?.nextMissionId).toBe(mission2.id.toString());
        expect(result.value?.isTrackFinished).toBe(false);

        const progress = await progressRepo.findProgress("user-1", track.id.toString());
        expect(progress).not.toBeNull();
        expect(progress?.lastCompletedOrder).toBe(1);

        expect(domainEventSpy).toHaveBeenCalledTimes(1);
        
        const eventDispatched = domainEventSpy.mock.calls[0][0];
        expect(eventDispatched).toBeInstanceOf(MissionCompletedEvent);
        expect(eventDispatched.payload.userId).toBe("user-1");
        expect(eventDispatched.payload.xpEarned).toBe(100);
    });

    it("should NOT award XP and NOT dispatch event if mission was already completed (Idempotency)", async () => {        
        const track = TrackBuilder.aTrack().build();
        await eduRepo.saveTrack(track);
        const mission = MissionBuilder.aMission()
            .inTrack(track.id.toString())
            .withOrder(1)
            .withXp(200)
            .build();
        await eduRepo.saveMission(mission);

        const startResult = TrackProgress.start({ userId: "user-veterano", trackId: track.id.toString() });
        const progress = startResult.value!.updateLastMission(1);
        await progressRepo.save(progress);

        const result = await useCase.execute({
            userId: "user-veterano",
            missionId: mission.id.toString()
        });

        expect(result.succeeded).toBe(true);
        expect(result.value?.xpEarned).toBe(0); 

        expect(domainEventSpy).not.toHaveBeenCalled(); 
    });

    it("should mark track as finished and dispatch TrackCompletedEvent for the last mission", async () => {
        const track = TrackBuilder.aTrack().withTitle("Trilha Final").build();
        await eduRepo.saveTrack(track);
        
        const mission = MissionBuilder.aMission().inTrack(track.id.toString()).withOrder(1).build();
        await eduRepo.saveMission(mission);

        // Executa
        const result = await useCase.execute({
            userId: "user-finisher",
            missionId: mission.id.toString()
        });

        expect(result.value?.isTrackFinished).toBe(true);
        expect(result.value?.nextMissionId).toBeNull();

        expect(domainEventSpy).toHaveBeenCalledTimes(2);

        const events = domainEventSpy.mock.calls.map(call => call[0]);
        const trackEvent = events.find(e => e instanceof TrackCompletedEvent);
        
        expect(trackEvent).toBeDefined();
        expect(trackEvent?.payload.trackSlug).toBe("slug-simulado"); 
    });

    it("should fail if mission does not exist", async () => {
        const result = await useCase.execute({
            userId: "user-1",
            missionId: "id-fantasma"
        });

        expect(result.failed).toBe(true);
        const errorString = JSON.stringify(result.errors || result.errors);
        expect(errorString).toContain("MISSION_NOT_FOUND");
    });
});