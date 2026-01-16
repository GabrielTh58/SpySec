  import { BadgeSlug } from "../../constants/Badge.constants";
  import { Player } from "../../model";
  import { AchievementRule } from "../AchievementRule.interface";

  export class RisingStarRule implements AchievementRule {
    evaluate(player: Player): string | null {
      if (player.currentLevel >= 5) {
        return BadgeSlug.RISING_STAR;
      }
      return null;
    }
  }