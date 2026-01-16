import { GetAllBadges, GetPlayerProfile, PlayerRepository, BadgeRepository, GetRanking, RankingDTO,BadgeDTO } from "@spysec/gamification";
import { PlayerProfileResponseDTO } from "../dto/PlayerProfile.dto";
import { RankingResponseDTO } from "../dto/RankingResponse.dto";

export class GamificationFacade {
    constructor(
        private readonly repoPlayer: PlayerRepository,  
        private readonly repoBadge: BadgeRepository,              
    ) {}

    async getPlayerProfile(userId: string): Promise<PlayerProfileResponseDTO> {
        const useCase = new GetPlayerProfile(this.repoPlayer)
        
        const result = await useCase.execute(userId);
        if (result.failed) result.throwIfFailed();

        const player = result.value!;
     
        return {
            userId: player.userId,
            nickname: player.nickname,
            type: player.type,
            level: player.currentLevel, 
            currentXp: player.currentXp,
            streak: player.streak,
            badges: player.badges
        };
    }   

    async getAllBadges(): Promise<BadgeDTO[]> {
        const useCase = new GetAllBadges(this.repoBadge);
        
        const result = await useCase.execute();
        if (result.failed) result.throwIfFailed();

        const badges = result.value!;

        return badges.map(b => ({
            id: b.id,
            slug: b.slug,
            name: b.name,
            description: b.description,
            iconUrl: b.iconUrl
        }));
    }   

    async getRanking(limit: number): Promise<RankingResponseDTO[]>{
        const useCase = new GetRanking(this.repoPlayer)

        const result = await useCase.execute(limit)
        if(result.failed) result.throwIfFailed()

        const ranking = result.value!

        return ranking.map((item: RankingDTO
            
        ) => ({
            nickname: item.nickname,
            currentLevel: item.currentLevel,
            currentXp: item.currentXp,
            streak: item.streak
        }));        
    }
}