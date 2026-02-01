import { Injectable } from "@nestjs/common";
import { NextMissionResult, TrackProgress, TrackProgressRepository } from "@spysec/education";
import { PrismaService } from "src/db/prisma.service";
import { TrackProgressMapper } from "../mappers/track-progress.mapper";

@Injectable()
export class PrismaTrackProgressRepository extends TrackProgressRepository {
    constructor(private readonly prisma: PrismaService) {
        super();
    }
    
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

    async countCompletedMissionsByUserId(userId: string): Promise<number> {
        const result = await this.prisma.trackProgress.aggregate({
            where: { userId },
            _sum: { lastCompletedOrder: true }
        });

        return result._sum.lastCompletedOrder ?? 0;
    }

    async countCompletedTracksByUserId(userId: string): Promise<number> {
        const count = await this.prisma.trackProgress.count({
            where: { 
                userId,
                status: 'COMPLETED' 
            } 
        });
        return count;
    }

    async findNextMissionToPlay(userId: string): Promise<NextMissionResult | null> {
        const progresses = await this.prisma.trackProgress.findMany({
            where: {
                userId,
                track: { isActive: true }
            },
            orderBy: { startedAt: "desc" },
            take: 5  
        });

        for (const progress of progresses) {
            const next = await this.prisma.mission.findFirst({
                where: {
                    trackId: progress.trackId,
                    order: { gt: progress.lastCompletedOrder },
                    track: { isActive: true }
                },
                select: { 
                    id: true,
                    title: true,
                    order: true,
                    xpReward: true,    
                    description: true,                
                    track: { select: { title: true } }
                },
                orderBy: { order: "asc" }
            });

            if (next) {
                return {
                    id: next.id,
                    title: next.title,
                    trackTitle: next.track.title,
                    order: next.order,
                    xpReward: next.xpReward,
                    description: next.description
                };
            }
        }

        const first = await this.prisma.mission.findFirst({
            where: { track: { isActive: true } },
            select: {
                id: true,
                title: true,
                order: true,
                xpReward: true,    
                description: true, 
                track: { select: { title: true } }
            },
            orderBy: { order: "asc" }
        });

        return first
            ? { id: first.id, title: first.title, trackTitle: first.track.title, order: first.order, xpReward: first.xpReward, description: first.description }
            : null;
    }

    async countCompletedMissionsSince(userId: string, date: Date): Promise<number> {

        const result = await this.prisma.trackProgress.aggregate({  

            where: {

                userId,

                completedAt: { gte: date }

            },

            _sum: { lastCompletedOrder: true }

        });

        return result._sum.lastCompletedOrder ?? 0;    

    }
}