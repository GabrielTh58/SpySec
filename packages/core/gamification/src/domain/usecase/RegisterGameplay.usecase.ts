import { Result, UseCase } from "@spysec/shared";
import { PlayerRepository } from "../provider";
import { LevelingService } from "../service/leveling.service";
import { AchievementContext, AchievementRule, ActionStatus } from "../policies/AchievementRule.interface";

interface InputDTO {
    userId: string;
    action: ActionStatus;
    xpEarned: number; 
    payload: { 
        trackId?: string;
        trackSlug?: string
        missionCategory?: string[];
        isPerfectScore?: boolean;
        missionBlockCount?: number;
        isLastMission?: boolean
    }
}

interface OutputDTO {
    leveledUp: boolean;
    newLevel?: number;
    badgesEarned: string[]; 
    totalXp: number;
}

export class RegisterGameplay implements UseCase<InputDTO, OutputDTO> {
    constructor(
        private readonly repoPlayer: PlayerRepository,
        private readonly levelingService: LevelingService,
        private readonly achievementRules: AchievementRule[] 
    ) {}

    async execute(input: InputDTO): Promise<Result<OutputDTO>> {
        let player = await this.repoPlayer.findByUserId(input.userId);
        if (!player) return Result.fail("PLAYER_NOT_FOUND");

        const badgesEarnedInThisSession: string[] = [];

        // 2. Adiciona XP e Registra Atividade (Streak)
        if (input.xpEarned > 0) {
            const xpRes = player.addXp(input.xpEarned);
            if (xpRes.succeeded) player = xpRes.value!;
        }
        
        player = player.registerActivity();

        // 3. Processa Níveis (Loop do Service)
        // Service retorna { leveledUp: boolean, updatedPlayer: Player }
        const levelResult = await this.levelingService.processLevelUp(player);
        player = levelResult.updatedPlayer;

        // 4. Processa Regras (Badges) - Usando sua lógica de Rules!
        // Montamos o contexto conforme sua interface
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
            badgesEarned: badgesEarnedInThisSession, // O front vê: "Opa, array > 0? Mostra popup!"
            totalXp: player.currentXp
        });
    }
}