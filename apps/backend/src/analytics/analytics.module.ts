import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { PrismaRiskLogRepository } from './adapter/prisma-risklog.repository';
import { AwarenessAnalyzerService, RiskLogRepository } from '@spysec/analytics'
import { PrismaEducationRepository } from 'src/education/adapter/prisma-education.repository';
import { AiAnalyzerAdapter } from './adapter/ai-analyzer.adapter';
import { AnalyticsFacade } from '@spysec/analytics-adapter';
import { EducationModule } from 'src/education/education.module';
import { EducationRepository } from '@spysec/education';

@Module({
  imports: [EducationModule],
  controllers: [AnalyticsController],
  providers: [
    {
      provide: RiskLogRepository,
      useClass: PrismaRiskLogRepository
    },
    {
      provide: AwarenessAnalyzerService,
      useClass: AiAnalyzerAdapter
    },

    {
      provide: AnalyticsFacade,
      useFactory: (
        repoRisklog: RiskLogRepository,
        repoEducation: EducationRepository,
        analyzerService: AwarenessAnalyzerService
      ) => {
        return new AnalyticsFacade(repoRisklog, repoEducation, analyzerService)
      },
      inject: [RiskLogRepository, EducationRepository, AwarenessAnalyzerService]
    }
  ]
})
export class AnalyticsModule {}
