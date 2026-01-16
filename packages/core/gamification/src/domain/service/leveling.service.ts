import { Player } from "../model";
import { LevelRepository } from "../provider/Level.repository"; 

export class LevelingService {
  constructor(private levelRepo: LevelRepository) {}

  async processLevelUp(player: Player): Promise<{ leveledUp: boolean; updatedPlayer: Player }> {
    let leveledUpAtLeastOnce = false;
    let currentPlayerState = player;

    for (let i = 0; i < 10; i++) { 
        const nextLevelNumber = currentPlayerState.currentLevel + 1;
        const nextLevelRule = await this.levelRepo.findByNumber(nextLevelNumber);
        
        if (!nextLevelRule) break;

        if (currentPlayerState.currentXp >= nextLevelRule.xpRequired) {
            currentPlayerState = currentPlayerState.levelUp(); 
            leveledUpAtLeastOnce = true;
        } else {
            break;
        }
    }

    return { 
        leveledUp: leveledUpAtLeastOnce, 
        updatedPlayer: currentPlayerState 
    };
  }
}