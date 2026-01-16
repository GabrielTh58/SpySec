import { BadgeSlug } from "../../constants/Badge.constants";
import { Player } from "../../model";
import {  AchievementRule } from "../AchievementRule.interface";

export class SentinelRule implements AchievementRule {
  evaluate(player: Player): string | null {
    if (player.streak >= 3) {
      return BadgeSlug.WATCHFUL_SENTINEL;
    }
    return null;
  }
}