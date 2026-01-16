import { Module } from '@nestjs/common';
import { EducationController } from './education.controller';
import { EducationFacade } from '@spysec/education-adapter';
import { EducationRepository, GamificationGateway, TrackProgressRepository } from '@spysec/education';
import { PrismaEducationRepository } from './adapter/prisma-education.repository';
import { PrismaTrackProgressRepository } from './adapter/track-progress.repository';
import { PrismaGamificationGateway } from './gateway/gamification.gateway';
import { GamificationModule } from 'src/gamification/gamification.module';

@Module({
  controllers: [EducationController],
  imports: [GamificationModule],
  providers: [
    {
      provide: EducationRepository,
      useClass: PrismaEducationRepository,
    },
    {
      provide: TrackProgressRepository,
      useClass: PrismaTrackProgressRepository,      
    },
    {
      provide: GamificationGateway,
      useClass: PrismaGamificationGateway
    },
    {
      provide: EducationFacade,
      useFactory: (
        repoEducation: EducationRepository,
        repoProgress: TrackProgressRepository,
        gatewayGamification: GamificationGateway   
      ) => {
        return new EducationFacade(repoEducation, repoProgress, gatewayGamification);
      },
      inject: [EducationRepository, TrackProgressRepository, GamificationGateway],
    },
  ],
})
export class EducationModule {}
