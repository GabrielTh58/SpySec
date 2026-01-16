import { Player } from "../model/Player";

export abstract class PlayerRepository {
    abstract findByUserId(userId: string): Promise<Player | null>;
    abstract save(player: Player): Promise<void>;
    abstract existsByNickname(nickname: string): Promise<boolean>;
    abstract findTopPlayers(limit: number): Promise<Player[]>
}