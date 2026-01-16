import { Injectable } from "@nestjs/common";
import { EducationRepository, Track, Mission } from "@spysec/education";
import { PrismaService } from "src/db/prisma.service";
import { TrackMapper } from "../mappers/track.mapper";
import { MissionMapper } from "../mappers/mission.mapper";

@Injectable()
export class PrismaEducationRepository implements EducationRepository {
    constructor(private readonly prisma: PrismaService) {}

    // --- TRACKS ---
    async saveTrack(track: Track): Promise<void> {
        const data = TrackMapper.toPersistence(track);

        await this.prisma.track.upsert({
            where: { id: data.id },
            update: data,
            create: data,
        });
    }

    async findTrackById(id: string, includeMissions = false): Promise<Track | null> {
        const raw = await this.prisma.track.findUnique({ 
            where: { id },
            include: { 
                missions: includeMissions
            } 
        }); 
        
        if (!raw) return null;
        
        return TrackMapper.toDomain(raw);
    }

    async findAllTracks(includeMissions: boolean): Promise<Track[]> {
        const rawTracks = await this.prisma.track.findMany({
            where: { isActive: true }, 
            include: {
                missions: includeMissions
            }
        });
        return rawTracks.map(TrackMapper.toDomain);
    }

    async findTrackSlugById(id: string): Promise<string | null> {
        const raw = await this.prisma.track.findUnique({
            where: { id },
            select: { slug: true } 
        });
        return raw ? raw.slug : null;
    }

    // --- MISSIONS ---

    async saveMission(mission: Mission): Promise<void> {
        const data = MissionMapper.toPersistence(mission);

        await this.prisma.mission.upsert({
            where: { id: data.id },
            update: data,
            create: data,
        });
    }

    async findMissionById(id: string): Promise<Mission | null> {
        const raw = await this.prisma.mission.findUnique({ where: { id } });
        if (!raw) return null;
        return MissionMapper.toDomain(raw);
    }

    async findMissionsByTrackId(trackId: string): Promise<Mission[]> {
        const rawMissions = await this.prisma.mission.findMany({
            where: { trackId },
            orderBy: { order: 'asc' }
        });
        return rawMissions.map(MissionMapper.toDomain);
    }

    async findMissionByOrder(trackId: string, order: number): Promise<Mission | null> {
        const raw = await this.prisma.mission.findFirst({
            where: { trackId, order }
        });
        if (!raw) return null;
        return MissionMapper.toDomain(raw);
    }
}