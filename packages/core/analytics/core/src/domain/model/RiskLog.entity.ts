import { Entity, EntityProps, Id, Result } from "@spysec/shared";
import { Validator } from "@spysec/utils";

export interface RiskLogProps extends EntityProps{
    userId: string
    missionId: string
    category: string
    failedConcepts: string[]
    occurredAt: Date
}

interface RestoreRiskLogProps extends EntityProps{
    id: string
    userId: string
    missionId: string
    category: string
    failedConcepts: string[]
    occurredAt: Date
}

export class RiskLog extends Entity<RiskLog, RiskLogProps> {
    constructor(props: RiskLogProps, id: Id) {
        super(id, props);
    }

    static create(props: Omit<RiskLogProps, 'id' | 'occurredAt'>): Result<RiskLog>{
        
        const errors = [
            Validator.notNullOrEmpty("USER_ID_AND_MISSION_ID_ARE_REQUIRED", props.userId),
            Validator.notNullOrEmpty("USER_ID_AND_MISSION_ID_ARE_REQUIRED", props.missionId),
        ]
        
        const validErrors = errors.filter((e): e is string => e !== null);
        if (validErrors.length > 0) {
            return Result.fail<RiskLog>(validErrors[0]!); 
        } 
        
        if (!props.failedConcepts || props.failedConcepts.length === 0) {
            return Result.fail("RISK_LOG_MUST_HAVE_FAILED_CONCEPTS");
        }
       

        return Result.ok(new RiskLog(
            {
                ...props,
                occurredAt: new Date()
            },
            Id.generate()
        ));
    }

    static restore(props: RestoreRiskLogProps): Result<RiskLog>{
        const id = Id.restore(props.id); 
        return Result.ok(new RiskLog({...props}, id))
    }

    get userId() { return this.props.userId; }
    get missionId() { return this.props.missionId; }
    get category() { return this.props.category; }
    get failedConcepts() { return this.props.failedConcepts; }
    get occurredAt() { return this.props.occurredAt; }
}