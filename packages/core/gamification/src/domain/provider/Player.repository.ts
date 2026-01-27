import { Player } from "../model/Player.entity";

export interface IPlayerUpdateParams{
    nickname: string;
};

export abstract class PlayerRepository {
    abstract findByUserId(userId: string): Promise<Player | null>;
    abstract save(player: Player): Promise<void>;
    abstract existsByNickname(nickname: string): Promise<boolean>;
    abstract findTopPlayers(limit: number): Promise<Player[]>
    abstract getRankingPosition(userId: string, currentXp: number): Promise<number>
    abstract update(userId: string, newData: IPlayerUpdateParams): Promise<Player>;
}