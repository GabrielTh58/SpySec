import { BadgeSlug } from "../../constants/Badge.constants";
import { ProfileType } from "@spysec/auth"; 
import { Player } from "../../model"; 
import { AchievementContext, AchievementRule } from "../AchievementRule.interface";

export class CorporateShieldRule implements AchievementRule {
  evaluate(player: Player, context: AchievementContext): string | null {
    if (context.action !== 'TRACK_COMPLETED') return null;
    
    if (player.type !== ProfileType.CORPORATE) return null;
  
    const trackSlug = context.payload?.trackSlug; 

    if (trackSlug === 'seguranca-home-office' || trackSlug === 'lgpd-corporativo') {
      return BadgeSlug.CORPORATE_SHIELD;
    }

    return null;
  }
}