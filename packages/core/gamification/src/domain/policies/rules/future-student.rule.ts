import { BadgeSlug } from "../../constants/Badge.constants";
import { Player } from "../../model";
import { AchievementContext, AchievementRule } from "../AchievementRule.interface";

export class FutureStudentRule implements AchievementRule {
  evaluate(player: Player, context: AchievementContext): string | null {
    if (context.action !== 'TRACK_COMPLETED') return null;

    const trackSlug = context.payload?.trackSlug;

    if (trackSlug === 'ai-security' || trackSlug === 'inteligencia-artificial') {
      return BadgeSlug.FUTURE_STUDENT;
    }

    return null;
  }
}