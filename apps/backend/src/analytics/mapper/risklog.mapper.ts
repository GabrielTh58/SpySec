import { RiskLog } from '@spysec/analytics'
import { Risklog as PrismaRisklog} from '../../../generated/prisma/client';

export class RiskLogMapper {
    static toDomain(raw: PrismaRisklog): RiskLog {
        const riskLogOrError = RiskLog.restore({
            id: raw.id,
            userId: raw.userId,
            missionId: raw.missionId,
            category: raw.category,
            failedConcepts: raw.failedConcepts,
            occurredAt: raw.occurredAt
        });

        if (riskLogOrError.failed) {
            throw new Error(`Erro ao mapear RiskLog: ${riskLogOrError.errors}`);
        }

        return riskLogOrError.value!;
    }

    static toPersistence(riskLog: RiskLog): any {
        return {
            id: riskLog.id.toString(),
            userId: riskLog.userId,
            missionId: riskLog.missionId,
            category: riskLog.category,
            failedConcepts: riskLog.failedConcepts,
            occurredAt: riskLog.occurredAt,
        };
    }
}