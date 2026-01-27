import { Result, UseCase } from "@spysec/shared";
import { LevelRepository, PlayerRepository } from "../provider";
import { ProfileType } from "@spysec/auth";

export interface PlayerProfileOutputDTO {    
    playerId: string;    
    userId: string;
    nickname: string;
    type: ProfileType;
    currentLevel: number;
    currentXp: number;
    nextLevelXp: number
    rankingPosition: number;
    streak: number;
    completedMissionsCount: number;
    totalStudySeconds: number;
    badges: string[];     
}

export class GetPlayerProfile implements UseCase<string, PlayerProfileOutputDTO>{
    constructor(
        private readonly repoPlayer: PlayerRepository,
        private readonly repoLevel: LevelRepository 
    ){}
    
    async execute(userId: string): Promise<Result<PlayerProfileOutputDTO>> {
        const player = await this.repoPlayer.findByUserId(userId);
        if (!player) return Result.fail("PLAYER_NOT_FOUND");

        const dataOrError = await Result.tryAsync(() =>
            Promise.all([
                this.repoLevel.findByNumber(player.currentLevel + 1),
                this.repoPlayer.getRankingPosition(player.userId, player.currentXp)
            ])
        )
        if(dataOrError.failed) return Result.fail(dataOrError.errors);        

        const [nextLevelRule, rankingPos] = dataOrError.value!     

        const nextXp = nextLevelRule ? nextLevelRule.xpRequired : player.currentXp;

        return Result.ok({
            playerId: player.id.toString(),  
            userId: player.userId,
            nickname: player.nickname,
            type: player.type,
            currentLevel: player.currentLevel,
            currentXp: player.currentXp,
            nextLevelXp: nextXp,
            rankingPosition: rankingPos,
            streak: player.streak,
            completedMissionsCount: player.completedMissionsCount || 0,
            totalStudySeconds: player.totalStudySeconds,
            badges: player.badges,
        })        
    }
}