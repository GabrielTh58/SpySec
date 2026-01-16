import { Player } from "@spysec/gamification"; 
import { Player as PrismaPlayer } from "../../../generated/prisma/client";
import { ProfileType } from "@spysec/auth";

export class PlayerMapper {
  
  static toDomain(raw: PrismaPlayer): Player {
    const playerOrError = Player.restore({
      id: raw.id,
      userId: raw.userId,
      nickname: raw.nickname,
      type: raw.type as ProfileType,
      currentLevel: raw.currentLevel,
      currentXp: raw.currentXp,
      streak: raw.streak,
      maxStreak: raw.maxStreak,
      badges: raw.badges,
      playedCategories: raw.playedCategories,
      lastActivityDate: raw.lastActivityDate, 
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });

    if (playerOrError.failed) {
      throw new Error(`Failed to map Player from database: ${playerOrError.errors}`);
    }

    return playerOrError.value!;
  }

  static toPersistence(player: Player): any {
    return {
      id: player.id.toString(),
      userId: player.userId,
      nickname: player.nickname,
      type: player.type,
      currentLevel: player.currentLevel,
      currentXp: player.currentXp,
      streak: player.streak,
      maxStreak: player.maxStreak,
      badges: player.badges, 
      playedCategories: player.playedCategories,
      lastActivityDate: player.lastActivityDate ? player.lastActivityDate : null,
      updatedAt: new Date(), 
      createdAt: player.createdAt instanceof Date ? player.createdAt : new Date(player.createdAt)
    };
  }
}