import { GetAllBadges, GetPlayerProfile, PlayerRepository, BadgeRepository, GetRanking, RankingDTO,BadgeDTO, LevelRepository, PlayerProfileOutputDTO, UpdateProfileInputDTO, UpdateProfileOutputDTO, UpdateProfile } from "@spysec/gamification";
import { RankingResponseDTO } from "../dto/RankingResponse.dto";

export class GamificationFacade {
    constructor(
        private readonly repoPlayer: PlayerRepository,  
        private readonly repoBadge: BadgeRepository, 
        private readonly repoLevel: LevelRepository,                      
    ) {}

    async getPlayerProfile(userId: string): Promise<PlayerProfileOutputDTO> {
        const useCase = new GetPlayerProfile(this.repoPlayer, this.repoLevel)
        
        const result = await useCase.execute(userId);
        if (result.failed) result.throwIfFailed();

        const player = result.value!;
     
        return {
            userId: player.userId,
            nickname: player.nickname,
            type: player.type,
            currentLevel: player.currentLevel, 
            nextLevelXp: player.nextLevelXp,
            completedMissionsCount: player.completedMissionsCount,
            playerId: player.playerId,            
            currentXp: player.currentXp,
            rankingPosition: player.rankingPosition,
            streak: player.streak,
            totalStudySeconds: player.totalStudySeconds,
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
            rarity: b.rarity,
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

    async updateProfile(input: UpdateProfileInputDTO): Promise<UpdateProfileOutputDTO>{
        const useCase = new UpdateProfile(this.repoPlayer)

        const result = await useCase.execute(input)
        if(result.failed) result.throwIfFailed()

        const updatedProfile = result.value!

        return updatedProfile
    }
}