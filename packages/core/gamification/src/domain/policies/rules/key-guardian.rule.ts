
import { BadgeSlug } from "../../constants/Badge.constants";
import { Player } from "../../model";
import { AchievementContext, AchievementRule } from "../AchievementRule.interface";

export class KeyGuardianRule implements AchievementRule {
  evaluate(player: Player, context: AchievementContext): string | null {
    if (context.action !== 'MISSION_COMPLETED' || !context.payload) return null;

    const { missionCategory } = context.payload;

    if (missionCategory?.includes('PASSWORDS')) {
      return BadgeSlug.KEY_GUARDIAN;
    }

    return null;
  }
}