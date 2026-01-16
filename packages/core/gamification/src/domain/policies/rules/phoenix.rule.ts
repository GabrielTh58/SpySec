
import { BadgeSlug } from "../../constants/Badge.constants";
import { Player } from "../../model";
import { AchievementContext, AchievementRule } from "../AchievementRule.interface";

export class PhoenixRule implements AchievementRule {
  evaluate(player: Player, context: AchievementContext): string | null {   
    if (player.streak === 1 && player.maxStreak >= 5) {
      return BadgeSlug.PHOENIX;
    }

    return null;
  }
}