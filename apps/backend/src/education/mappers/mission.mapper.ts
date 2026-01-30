import { Mission as PrismaMission } from "../../../generated/prisma/client"; 
import { Mission, MissionBlock } from "@spysec/education";

export class MissionMapper {
    static toDomain(raw: PrismaMission): Mission {
        const missionOrError = Mission.restore({
            id: raw.id,
            trackId: raw.trackId,
            title: raw.title,
            slug: raw.slug,
            description: raw.description,
            iconUrl: raw.iconUrl,
            xpReward: raw.xpReward,
            order: raw.order,
            category: raw.category,            
            estimatedTime: raw.estimatedTime,
            content: raw.content as unknown as MissionBlock[],
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });

        if (missionOrError.failed) {
            throw new Error(`Mapper Error (Mission): ${missionOrError.errors}`);
        }

        return missionOrError.value!;
    }

    static toPersistence(mission: Mission) {
        return {
            id: mission.id.toString(),
            trackId: mission.trackId, 
            title: mission.title,
            slug: mission.slug,
            description: mission.description,
            iconUrl: mission.iconUrl,
            xpReward: mission.xpReward,
            order: mission.order,
            category: mission.category,     
            estimatedTime: mission.estimatedTime,
            content: mission.content as any, 
            createdAt: mission.createdAt,
            updatedAt: mission.updatedAt,
        };
    }
}