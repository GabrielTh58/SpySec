import { Injectable } from "@nestjs/common";
import { GamificationGateway, PlayerStats } from "@spysec/education";
import { GamificationFacade } from "@spysec/gamification-adapter";

@Injectable()
export class PrismaGamificationGateway implements GamificationGateway {
    constructor(private readonly gamificationFacade: GamificationFacade){}       

    async getPlayerStats(userId: string): Promise<PlayerStats | null> {
        try{
            const profile = await this.gamificationFacade.getPlayerProfile(userId)

            return{
                level: profile.currentLevel,
                totalXp: profile.currentXp
            }
        }        
        catch(e:any ){
            return null
        }
    }
}