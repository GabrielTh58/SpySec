import { RiskLogRepository, AwarenessAnalyzerService, GenerateMissionInsight, GenerateMissionInsightInputDTO, GenerateMissionInsightOutputDTO } from "@spysec/analytics";
import { EducationRepository } from "@spysec/education";

export class AnalyticsFacade {
    constructor(
        private readonly repoRiskLog: RiskLogRepository,
        private readonly repoEducation: EducationRepository,
        private readonly analyzerService: AwarenessAnalyzerService
    ){}

    async generateMissionInsight(input: GenerateMissionInsightInputDTO): Promise<GenerateMissionInsightOutputDTO> {
        const useCase = new GenerateMissionInsight (this.repoEducation, this.analyzerService, this.repoRiskLog)

        const result = await useCase.execute(input)

        if (result.failed) result.throwIfFailed();

        return result.value!
    }


}