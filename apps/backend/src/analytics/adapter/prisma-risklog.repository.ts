import { RiskLog, RiskLogRepository } from '@spysec/analytics';
import { PrismaService } from '../../db/prisma.service';
import { RiskLogMapper } from '../mapper/risklog.mapper';

export class PrismaRiskLogRepository implements RiskLogRepository {
    constructor(private readonly prisma: PrismaService) {}

    async save(log: RiskLog): Promise<void> {
        const data = RiskLogMapper.toPersistence(log);

        await this.prisma.risklog.create({
            data: {
                id: data.id,
                userId: data.userId,
                missionId: data.missionId,
                category: data.category,
                failedConcepts: data.failedConcepts, 
                occurredAt: data.occurredAt
            }
        })
    }

    async findByUserId(userId: string): Promise<RiskLog[]> {
        const rawLogs = await this.prisma.risklog.findMany({
            where: { userId },
            orderBy: { occurredAt: 'asc' }
        })

        return rawLogs.map(raw => RiskLogMapper.toDomain(raw))
    }
}