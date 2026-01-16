export interface PlayerStats {
    totalXp: number;
    level: number;
}

export abstract class GamificationGateway {  
    abstract getPlayerStats(userId: string): Promise<PlayerStats | null>;
}   