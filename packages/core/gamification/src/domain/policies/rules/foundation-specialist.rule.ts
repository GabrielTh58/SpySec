
import { BadgeSlug } from "../../constants/Badge.constants";
import { Player } from "../../model";
import { AchievementContext, AchievementRule } from "../AchievementRule.interface";

export class FoundationSpecialistRule implements AchievementRule {
  evaluate(player: Player, context: AchievementContext): string | null {
    if (context.action !== 'TRACK_COMPLETED') return null;

    if (context.payload?.trackSlug === 'fundamentos-da-seguranca') {
      return BadgeSlug.FOUNDATION_SPECIALIST;
    }
    return null;
  }
}