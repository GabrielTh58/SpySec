export interface AnalyzedErrorContext {
    context: string;
    selectedOptionText: string;
    errorExplanation: string;
}

export abstract class AwarenessAnalyzerService {
    abstract generateSummaryInsight(
        missionCategory: string, 
        missionTitle: string, 
        errors: AnalyzedErrorContext[]
    ): Promise<string | null>;

    abstract generateRiskProfile(history: any[]): Promise<string>; 
}