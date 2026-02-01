import { Injectable } from '@nestjs/common';
import { EducationFacade } from '@spysec/education-adapter';
import { ActionStatus, BadgeRepository } from '@spysec/gamification';
import { GamificationFacade } from '@spysec/gamification-adapter';
import { Result, UseCase } from '@spysec/shared';

interface CompleteMissionFlowInputDTO {
    userId: string;
    missionId: string;
    answers: any;
    timeSpent: number;
}

export interface CompleteMissionFlowOutput {
    success: boolean;
    missionTitle: string;
    nextMissionId: string | null;
    feedback?: Record<string, string>;    
    xpEarned: number;
    timeSpent: number;
    leveledUp: boolean;
    newLevel?: number;
    newBadge?: {
        id: string;
        name: string;
        description: string;
        iconUrl: string;
        rarity: string;
    } | null;
}

@Injectable()
export class CompleteMissionFlow implements UseCase<CompleteMissionFlowInputDTO, CompleteMissionFlowOutput> {
    constructor(
        private readonly eduFacade: EducationFacade,
        private readonly gameFacade: GamificationFacade,
        private readonly repoBadge: BadgeRepository
    ) { }

    async execute(input: CompleteMissionFlowInputDTO): Promise<Result<CompleteMissionFlowOutput>> {
        const { userId, missionId, answers, timeSpent } = input

        const eduResult = await this.eduFacade.completeMission({ userId, missionId, answers });

        if (!eduResult.success) {
            return Result.ok({
                success: false,
                missionTitle: eduResult.missionTitle,
                nextMissionId: null,
                feedback: eduResult.feedback, 
                xpEarned: 0,
                timeSpent: 0,
                leveledUp: false,
                newBadge: null
            });
        }

        const timeToRegister = (timeSpent && timeSpent > 0) 
            ? timeSpent 
            : (eduResult.timeSpent || 0);

        const gameResult = await this.gameFacade.registerGameplay({
            userId: input.userId,
            action: ActionStatus.MISSION_COMPLETED,
            xpEarned: eduResult.xpEarned,
            timeSpent: timeToRegister,
            payload: {
                isLastMission: eduResult.isLastMission,
                trackId: eduResult.trackId,
                trackSlug: eduResult.trackSlug
            }
        });

        let newBadgeDetails: CompleteMissionFlowOutput['newBadge'] = null;;

        if (gameResult && gameResult.badgesEarned.length > 0) {
            const lastBadgeSlug = gameResult.badgesEarned[gameResult.badgesEarned.length - 1];
            const badgeEntity = await this.repoBadge.findBySlug(lastBadgeSlug);

            if (badgeEntity) {
                newBadgeDetails = {
                    id: badgeEntity.id.toString(),
                    name: badgeEntity.name,
                    description: badgeEntity.description,
                    iconUrl: badgeEntity.iconUrl,
                    rarity: badgeEntity.rarity
                };
            }
        }

        return Result.ok({
            success: true,
            missionTitle: eduResult.missionTitle,
            nextMissionId: eduResult.nextMissionId ?? null, 
            feedback: eduResult.feedback,
            xpEarned: eduResult.xpEarned,
            timeSpent: eduResult.timeSpent ?? 0,
            leveledUp: gameResult?.leveledUp || false,
            newLevel: gameResult?.newLevel,
            newBadge: newBadgeDetails
        });
    }
}