import { BadgeSlug } from "../../constants/Badge.constants";
import { ProfileType } from "@spysec/auth"; 
import { Player } from "../../model"; 
import { AchievementContext, AchievementRule } from "../AchievementRule.interface";

export class PhishingDetectorRule implements AchievementRule {
  evaluate(player: Player, context: AchievementContext): string | null {
    if (context.action !== 'TRACK_COMPLETED') return null;
    
    const trackSlug = context.payload?.trackSlug; 

    if (trackSlug === 'phishing-detection' || trackSlug === 'identificacao-de-phishing') {
        return BadgeSlug.PHISHING_DETECTOR;
    }

    return null;
  }
}