import { Result, UseCase } from "@spysec/shared";
import { PlayerRepository } from "../provider";
import { Player } from "../model";

export interface RankingDTO{
    nickname: string;
    currentLevel: number;
    currentXp: number;
    streak: number;
    badges: string[]
}

export class GetRanking implements UseCase<number, RankingDTO[]>{
    constructor(
        private readonly repoPlayer: PlayerRepository
    ){} 

    async execute(limit: number): Promise<Result<RankingDTO[]>> {
        const players = await this.repoPlayer.findTopPlayers(limit)
        if (!players) {
            return Result.ok([]); 
        }

        return Result.ok(
            players.map((player: Player) => ({
                nickname: player.nickname,
                currentLevel: player.currentLevel,
                currentXp: player.currentXp,
                streak: player.streak,
                badges: player.badges
            }))
        )
    }
}       