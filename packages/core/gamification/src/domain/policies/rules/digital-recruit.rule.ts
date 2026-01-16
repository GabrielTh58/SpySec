import { BadgeSlug } from "../../constants/Badge.constants";
import { Player } from "../../model";
import { AchievementContext, AchievementRule } from "../AchievementRule.interface";


export class DigitalRecruitRule implements AchievementRule {
  evaluate(player: Player, context: AchievementContext): string | null {
    if (context.action !== 'MISSION_COMPLETED') return null;

    if (player.currentXp > 0 && !player.hasBadge(BadgeSlug.DIGITAL_RECRUIT)) {
      return BadgeSlug.DIGITAL_RECRUIT;
    }

    return null;
  } 
}