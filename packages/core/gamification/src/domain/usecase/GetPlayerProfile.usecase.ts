import { Result, UseCase } from "@spysec/shared";
import { PlayerRepository } from "../provider";
import { ProfileType } from "@spysec/auth";

export interface PlayerProfileOutput {    
    playerId: string;    
    userId: string;
    nickname: string;
    type: ProfileType;
    currentLevel: number;
    currentXp: number;
    streak: number;
    badges: string[];     
}

export class GetPlayerProfile implements UseCase<string, PlayerProfileOutput>{
    constructor(
        private readonly repoPlayer: PlayerRepository
    ){}
    
    async execute(userId: string): Promise<Result<PlayerProfileOutput>> {
        const player = await this.repoPlayer.findByUserId(userId);
        if (!player) return Result.fail("PLAYER_NOT_FOUND");

        return Result.ok({
            playerId: player.id.toString(),  
            userId: player.userId,
            nickname: player.nickname,
            type: player.type,
            currentLevel: player.currentLevel,
            currentXp: player.currentXp,
            streak: player.streak,
            badges: player.badges
        })        
    }
}