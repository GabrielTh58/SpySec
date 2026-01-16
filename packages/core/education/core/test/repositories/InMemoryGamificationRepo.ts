import { GamificationGateway, PlayerStats } from "@spysec/education";

export class InMemoryGamificationGateway implements GamificationGateway {
    private userProfiles: Map<string, { currentXp: number, level: number }> = new Map();
  
    async getPlayerStats(userId: string): Promise<PlayerStats | null> {
        const stats = this.userProfiles.get(userId);
        if (!stats) return null;
        
        return {
            totalXp: stats.currentXp,
            level: stats.level
        };
    }

    // --- Helpers de Teste (Setup) ---
    setUserStats(userId: string, xp: number, level: number): void {
        this.userProfiles.set(userId, { currentXp: xp, level });
    }
}