import { Injectable } from "@nestjs/common";
import { Badge, BadgeRepository } from "@spysec/gamification";
import { PrismaService } from "src/db/prisma.service";
import { BadgeMapper } from "../mappers/badges.mapper";

@Injectable()
export class PrismaBadgeRepository implements BadgeRepository {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Badge[]> {
        const rawBadges = await this.prisma.badge.findMany({
            orderBy: { name: 'asc' } 
        });

        return rawBadges.map(BadgeMapper.toDomain);
    }

    async findBySlug(slug: string): Promise<Badge | null> {
        const raw = await this.prisma.badge.findUnique({ where: { slug } });
        if (!raw) return null;
        return BadgeMapper.toDomain(raw);
    }

    async save(badge: Badge): Promise<void> {
        const data = BadgeMapper.toPersistence(badge);
        await this.prisma.badge.upsert({
            where: { slug: data.slug },
            update: data,
            create: data
        });
    }
}