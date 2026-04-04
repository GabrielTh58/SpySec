import { Result, UseCase } from "@spysec/shared";
import { AnalyzedErrorContext, AwarenessAnalyzerService } from "../provider/AwarenessAnalyzer.service";
import { RiskLogRepository } from "../provider/RiskLog.repository";
import { RiskLog } from "../model/RiskLog.entity";
import { EducationRepository } from "@spysec/education";

export interface GenerateMissionInsightInputDTO {
    userId: string;
    missionId: string;
    answers: Record<string, any>
}

export interface GenerateMissionInsightOutputDTO {
    mascotInsight: string | null;
}

export class GenerateMissionInsight implements UseCase<GenerateMissionInsightInputDTO, GenerateMissionInsightOutputDTO> {
    constructor(
        private readonly repoEeducation: EducationRepository,
        private readonly analyzerService: AwarenessAnalyzerService,
        private readonly repoRiskLog: RiskLogRepository
    ) { }

    async execute(input: GenerateMissionInsightInputDTO): Promise<Result<GenerateMissionInsightOutputDTO>> {
        const missionOrError = await Result.tryAsync(() => this.repoEeducation.findMissionById(input.missionId));
        if (missionOrError.failed || !missionOrError.value) {
            return Result.fail("MISSION_NOT_FOUND");
        }
        const mission = missionOrError.value;
        const contentVO = mission.content; // VO

        const validation = contentVO.validateUserAnswers(input.answers);

        if (validation.isValid) {
            return Result.ok({ mascotInsight: null });
        }

        const failedConceptsForDB: string[] = [];
        const errorsForAI: AnalyzedErrorContext[] = [];

        for (const blockId of validation.failedBlockIds) {
            const block = contentVO.findBlockById(blockId);
            if (!block) continue

            const errorFeedbackText = contentVO.getBlockErrorFeedback(blockId);
            const userAnswer = input.answers[blockId];


            const errorExplanation = (errorFeedbackText && errorFeedbackText !== "INCORRECT_ANSWER")
                ? errorFeedbackText    
                : (block.data as any).question ?? "Block without feedback"
       

            failedConceptsForDB.push(errorExplanation);

            const questionText = (block.data as any).question ?? "Interactive Task";
            const userActionText = contentVO.getUserActionAsText(blockId, userAnswer)

            errorsForAI.push({
                context: questionText,
                selectedOptionText: userActionText,
                errorExplanation
            });
        }

        if (failedConceptsForDB.length > 0) {
            const riskLogResult = RiskLog.create({
                userId: input.userId,
                missionId: input.missionId,
                category: mission.category,
                failedConcepts: failedConceptsForDB
            });

            if (riskLogResult.succeeded) {
                const saveRiskLog = await Result.tryAsync(() => this.repoRiskLog.save(riskLogResult.value!));
                if (saveRiskLog.failed) console.error('Failed to save RiskLog, continuing without persistence')
            }
        }

        const insight = await this.analyzerService.generateSummaryInsight(mission.category, mission.title, errorsForAI);

        return Result.ok({
            mascotInsight: insight
        });
    }
}   