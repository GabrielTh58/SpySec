import { BadgeSlug } from "../../constants/Badge.constants";
import { Player } from "../../model";
import { AchievementContext, AchievementRule } from "../AchievementRule.interface";

export class CuriousExplorerRule implements AchievementRule {
  evaluate(player: Player, context: AchievementContext): string | null {
    if (context.action === 'AI_INTERACTION') {
       return BadgeSlug.CURIOUS_EXPLORER;
    }
    return null;
  }
}