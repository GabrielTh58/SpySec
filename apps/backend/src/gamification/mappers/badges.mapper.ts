import { Badge, Rarity } from "@spysec/gamification";
import { Badge as PrismaBadge } from '../../../generated/prisma/client';

export class BadgeMapper {
  
  static toDomain(raw: PrismaBadge): Badge {
    const badgeOrError = Badge.restore({
      id: raw.id,
      name: raw.name,
      slug: raw.slug,
      description: raw.description,
      rarity: raw.rarity as Rarity,
      iconUrl: raw.iconUrl ?? '',
      condition: raw.condition ?? undefined,
    });

    if (badgeOrError.failed) {
      throw new Error(`Failed to map Badge from database: ${badgeOrError.errors}`);
    }

    return badgeOrError.value!;
  }

  static toPersistence(badge: Badge): any {
    return {
    id: badge.id.toString(),
    name: badge.name,
    slug: badge.slug.toString(),
    description: badge.description,
    rarity: badge.rarity,
    iconUrl: badge.iconUrl,
    condition: badge.condition,
    };
  }
}   