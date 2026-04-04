import { Level } from '@spysec/gamification';
import { Level as PrismaLevel } from '../../../generated/prisma/client';

export class LevelMapper {
  static toDomain(raw: PrismaLevel): Level {
    const levelOrError = Level.restore({
      id: raw.id,
      levelNumber: raw.levelNumber,
      xpRequired: raw.xpRequired,
      title: raw.title,
    });

    if (levelOrError.failed) {
      throw new Error(`Failed to map Level from database: ${levelOrError.errors}`);
    }

    return levelOrError.value!;
  }

  static toPersistence(level: Level) {
    return {
      id: level.id.toString(),
      levelNumber: level.levelNumber,
      xpRequired: level.xpRequired,
      title: level.title,
    };
  }
}