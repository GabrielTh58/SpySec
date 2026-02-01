import { Result, UseCase } from "@spysec/shared";
import { PlayerRepository } from "../provider";
import { LevelingService } from "../service/leveling.service";
import { AchievementContext, AchievementRule, ActionStatus } from "../policies/AchievementRule.interface";

export interface RegisterGameplayInputDTO {
    userId: string;
    action: ActionStatus;
    xpEarned: number; 
    timeSpent?: number; 
    payload: { 
        trackId?: string;
        trackSlug?: string
        isLastMission?: boolean
    }
}

export interface RegisterGameplayOutputDTO {
    leveledUp: boolean;
    newLevel?: number;
    badgesEarned: string[]; 
    totalXp: number;
}

export class RegisterGameplay implements UseCase<RegisterGameplayInputDTO, RegisterGameplayOutputDTO> {
    constructor(
        private readonly repoPlayer: PlayerRepository,
        private readonly levelingService: LevelingService,
        private readonly achievementRules: AchievementRule[] 
    ) {}

    async execute(input: RegisterGameplayInputDTO): Promise<Result<RegisterGameplayOutputDTO>> {
        let player = await this.repoPlayer.findByUserId(input.userId);
        if (!player) return Result.fail("PLAYER_NOT_FOUND");

        const badgesEarnedInThisSession: string[] = [];

        if (input.xpEarned > 0) {
            const xpRes = player.addXp(input.xpEarned);
            if (xpRes.succeeded) player = xpRes.value!;
        }
        
        player = player.registerActivity();

        if (input.timeSpent && input.timeSpent > 0) {
            player = player.addStudyTime(input.timeSpent);
        }

        if (input.action === ActionStatus.MISSION_COMPLETED) {
            player.incrementCompletedMissions(); 
       }

        const levelResult = await this.levelingService.processLevelUp(player);
        player = levelResult.updatedPlayer;

        const context: AchievementContext = {
            action: input.action,
            payload: {
                ...input.payload,
                xpEarned: input.xpEarned 
            }
        };

        for (const rule of this.achievementRules) {
            const badgeSlug = rule.evaluate(player, context);
            
            if (badgeSlug) {
                if (!player.hasBadge(badgeSlug)) {
                    player = player.awardBadge(badgeSlug);
                    badgesEarnedInThisSession.push(badgeSlug);
                }
            }
        }

        const saveResult = await Result.tryAsync(() => this.repoPlayer.save(player));   
        if (saveResult.failed) return Result.fail("ERROR_SAVE_DB");

        return Result.ok({
            leveledUp: levelResult.leveledUp,
            newLevel: player.currentLevel,
            badgesEarned: badgesEarnedInThisSession, 
            totalXp: player.currentXp
        });
    }
}