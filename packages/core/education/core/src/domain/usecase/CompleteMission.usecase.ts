import { DomainEvents, Result, UseCase } from "@spysec/shared";
import { EducationRepository } from "../provider/Education.repository";
import { TrackProgressRepository } from "../provider/TrackProgress.repository";
import { TrackProgress } from "../model/TrackProgress.entity";
import { MissionCompletedEvent } from "../events/MissionCompleted.event";
import { TrackCompletedEvent } from "../events/TrackCompleted.event";

export interface CompleteMissionInputDTO {
    userId: string;
    missionId: string;
    answers: Record<string, any>
}

export interface CompleteMissionOutputDTO {
    success: boolean;
    xpEarned: number;
    missionTitle: string;
    nextMissionId?: string | null;
    isTrackFinished: boolean;
    feedback?: Record<string, string>;
    trackId?: string;
    trackSlug?: string;
    timeSpent?: number;
    isLastMission?: boolean
}

export class CompleteMission implements UseCase<CompleteMissionInputDTO, CompleteMissionOutputDTO> {
    constructor(
        private readonly repoEducation: EducationRepository,
        private readonly repoProgress: TrackProgressRepository,
    ) { }

    async execute(input: CompleteMissionInputDTO): Promise<Result<CompleteMissionOutputDTO>> {
        const missionOrError = await Result.tryAsync(() =>
            this.repoEducation.findMissionById(input.missionId)
        );
        if (missionOrError.failed) return Result.fail(missionOrError.errors);

        const mission = missionOrError.value;
        if (!mission) return Result.fail("MISSION_NOT_FOUND");

        const validationResult = mission.content.validateUserAnswers(input.answers);
        if (!validationResult.isValid) {
            const feedbackMap: Record<string, string> = {};

            validationResult.failedBlockIds.forEach(blockId => {
                feedbackMap[blockId] = mission.content.getBlockErrorFeedback(blockId);
            });

            return Result.ok({
                success: false,
                xpEarned: 0,
                missionTitle: mission.title,
                isTrackFinished: false,
                feedback: feedbackMap,
                generalMessage: "Algumas respostas estão incorretas. Verifique os campos em vermelho."
            });
        }
        let progress = await this.repoProgress.findProgress(input.userId, mission.trackId);

        if (!progress) {
            const newProgressResult = TrackProgress.start({
                userId: input.userId,
                trackId: mission.trackId
            });
            if (newProgressResult.failed) return Result.fail(newProgressResult.errors);
            progress = newProgressResult.value!;
        }

        const expectedOrder = progress.lastCompletedOrder + 1;
        if (mission.order > expectedOrder) {
            return Result.fail(`MISSION_LOCKED`);
        }

        const isFirstCompletion = progress.lastCompletedOrder < mission.order;

        progress = progress.updateLastMission(mission.order);

        const nextMissionResult = await Result.tryAsync(() =>
            this.repoEducation.findMissionByOrder(mission.trackId, mission.order + 1)
        );

        const nextMission = nextMissionResult.succeeded ? nextMissionResult.value : null;
        const hasNextMission = !!nextMission;
        const isLastMission = !hasNextMission;

        if (isLastMission && !progress.isCompleted) {
            const completeResult = progress.complete(0);
            if (completeResult.succeeded) {
                progress = completeResult.value!;
            }
        }

        const saveResult = await Result.tryAsync(() => this.repoProgress.save(progress));
        if (saveResult.failed) return Result.fail("ERROR_SAVE_DB");

        const trackSlug = await this.repoEducation.findTrackSlugById(mission.trackId);
        if (isFirstCompletion) {
            DomainEvents.dispatch(new MissionCompletedEvent({
                userId: input.userId,
                missionId: input.missionId,
                xpEarned: mission.xpReward,
                trackId: mission.trackId,
                missionCategory: mission.category,
                timeSpent: mission.estimatedTime || 180,
                isLastMission: isLastMission
            }));

            if (isLastMission) {
                DomainEvents.dispatch(new TrackCompletedEvent({
                    userId: input.userId,
                    trackId: mission.trackId,
                    trackSlug: trackSlug || '',
                    occurredAt: new Date()
                }));
            }
        }

        return Result.ok({
            success: true,
            missionTitle: mission.title,
            nextMissionId: nextMission ? nextMission.id.toString() : null,
            xpEarned: isFirstCompletion ? mission.xpReward : 0,
            isTrackFinished: isLastMission,
            trackId: mission.trackId,
            trackSlug: trackSlug || undefined,
            timeSpent: mission.estimatedTime,
            isLastMission
        });
    }
}