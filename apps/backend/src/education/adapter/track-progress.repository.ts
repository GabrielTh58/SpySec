import { Injectable } from "@nestjs/common";
import { TrackProgress, TrackProgressRepository } from "@spysec/education";
import { PrismaService } from "src/db/prisma.service";
import { TrackProgressMapper } from "../mappers/track-progress.mapper";

@Injectable()
export class PrismaTrackProgressRepository implements TrackProgressRepository {
    constructor(private readonly prisma: PrismaService) {}
    
    async save(progress: TrackProgress): Promise<void> {
        const data = TrackProgressMapper.toPersistence(progress)

        await this.prisma.trackProgress.upsert({
            where: {
                userId_trackId: {
                    userId: data.userId,
                    trackId: data.trackId
                }
            },       
            update: {
                status: data.status,
                lastCompletedOrder: data.lastCompletedOrder,
                completedAt: data.completedAt,
                earnedXp: data. earnedXp
            },
            create: data
        },
    )
    }

    async findProgress(userId: string, trackId: string): Promise<TrackProgress | null> {
        const raw = await this.prisma.trackProgress.findUnique({
            where: {
                userId_trackId: {
                    userId,
                    trackId
                }
            }
        })

        if(!raw) return null
        return TrackProgressMapper.toDomain(raw)
    }

    async findAllProgressByUser(userId: string): Promise<TrackProgress[]> {
        const rawList = await this.prisma.trackProgress.findMany({
            where: { userId }
        })

        return rawList.map(TrackProgressMapper.toDomain)
    }
}