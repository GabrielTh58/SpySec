import { Track as PrismaTrack, Mission as PrismaMission } from "../../../generated/prisma/client"; 
import { 
    Track,      
    TrackDifficulty, 
    TrackVisibility 
} from "@spysec/education"; 
import { MissionMapper } from "./mission.mapper";

type PrismaTrackWithMissions = PrismaTrack & { missions?: PrismaMission[] };

export class TrackMapper {
    static toDomain(raw: PrismaTrackWithMissions): Track {
        const missions = raw.missions 
        ? raw.missions.map(MissionMapper.toDomain)
        : [];

        const trackOrError = Track.restore({
            id: raw.id,
            title: raw.title,
            slug: raw.slug,
            description: raw.description,
            iconUrl: raw.iconUrl,          
            difficulty: raw.difficulty as TrackDifficulty,
            targetProfile: raw.targetProfile as TrackVisibility,
            minLevel: raw.minLevel,
            prerequisiteTrackId: raw.prerequisiteTrackId ?? undefined,
            isActive: raw.isActive,
            missions: missions, 
            createdAt: raw.createdAt,
            updatedAt: raw.updatedAt,
        });

        if (trackOrError.failed) {
            throw new Error(`Mapper Error (Track): ${trackOrError.errors}`);
        }

        return trackOrError.value!;
    }

    static toPersistence(track: Track) {  
        return {
            id: track.id.toString(),
            title: track.title,
            slug: track.slug,
            description: track.description,
            iconUrl: track.iconUrl,
            difficulty: track.difficulty,
            targetProfile: track.targetProfile,
            minLevel: track.minLevel,
            prerequisiteTrackId: track.prerequisiteTrackId || null,
            isActive: track.isActive,
            createdAt: track.createdAt,
            updatedAt: track.updatedAt,
        };
    }
}