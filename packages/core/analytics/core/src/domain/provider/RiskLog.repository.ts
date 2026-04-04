import { RiskLog } from "../model/RiskLog.entity";

export abstract class RiskLogRepository {
    abstract save(log: RiskLog): Promise<void>;
    abstract findByUserId(userId: string): Promise<RiskLog[]>;
}   