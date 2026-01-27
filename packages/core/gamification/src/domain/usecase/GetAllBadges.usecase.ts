import { Result, UseCase } from "@spysec/shared";
import { BadgeRepository } from "../provider/Badge.repository";
import { Rarity } from "../model";

export interface BadgeDTO {
    id: string;
    slug: string;
    name: string;
    rarity: Rarity;
    description: string;
    iconUrl: string;
}

export class GetAllBadges implements UseCase<void, BadgeDTO[]> {
    constructor (
        private readonly repoBadge: BadgeRepository
    ){}

    async execute(): Promise<Result<BadgeDTO[]>>{
        const badges = await this.repoBadge.findAll();

        const badgeDTOs: BadgeDTO[] = badges.map(badge => ({
            id: badge.id.toString(),
            slug: badge.slug.value,
            name: badge.name,
            rarity: badge.rarity,
            description: badge.description,
            iconUrl: badge.iconUrl
        }));

        return Result.ok(badgeDTOs || []);
    }       
}