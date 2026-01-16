import { Module, OnModuleInit } from '@nestjs/common';
import { GamificationController } from './gamification.controller';
import { AchievementRule, AddXpOnMissionComplete, BadgeRepository, CreatePlayer, CreatePlayerOnSignup, LevelingService, LevelRepository, PlayerRepository, RegisterGameplay, AwardBadgesOnTrackComplete } from '@spysec/gamification';
import { PrismaPlayerRepository } from './adapter/prisma-player.repository';
import { PrismaLevelRepository } from './adapter/prisma-level.repository';
import { PrismaBadgeRepository } from './adapter/prisma-badge.repository';
import { GamificationFacade } from '@spysec/gamification-adapter';
import { AchievementRulesProvider, ACHIEVEMENT_RULES_TOKEN } from './provider/achievement-rules.provider';

@Module({
  controllers: [GamificationController],  
  providers: [
    AchievementRulesProvider,
    { provide: PlayerRepository, useClass: PrismaPlayerRepository },
    { provide: LevelRepository, useClass: PrismaLevelRepository },
    { provide: BadgeRepository, useClass: PrismaBadgeRepository },

    {
      provide: GamificationFacade,
      useFactory: (
        repoPlayer: PlayerRepository,
        repoBadge: BadgeRepository
      ) => {
        return new GamificationFacade(repoPlayer, repoBadge)
      },
      inject: [PlayerRepository, BadgeRepository]
    },

    // Domain Services & Use Cases 
    {
      provide: LevelingService,
      useFactory: (levelRepo: LevelRepository) => new LevelingService(levelRepo),
      inject: [LevelRepository],
    },
    {
      provide: CreatePlayer,
      useFactory: (repoPlayer: PlayerRepository) => new CreatePlayer(repoPlayer),
      inject: [PlayerRepository],
    },
    {
      provide: RegisterGameplay,
      useFactory: (
        repoPlayer: PlayerRepository, 
        levelingService: LevelingService,
        rules: AchievementRule[]
      ) => {
        return new RegisterGameplay(repoPlayer, levelingService, rules);
      },
      inject: [PlayerRepository, LevelingService, ACHIEVEMENT_RULES_TOKEN],
    },

    // SUBSCRIBERS 
    {
      provide: CreatePlayerOnSignup,
      useFactory: (useCase: CreatePlayer) => new CreatePlayerOnSignup(useCase),
      inject: [CreatePlayer],
    },
    {
      provide: AddXpOnMissionComplete,
      useFactory: (useCase: RegisterGameplay) => new AddXpOnMissionComplete(useCase),
      inject: [RegisterGameplay],
    },
    {
      provide: AwardBadgesOnTrackComplete,
      useFactory: (useCase: RegisterGameplay) => new AwardBadgesOnTrackComplete(useCase),
      inject: [RegisterGameplay],
  }
  ],
  exports: [GamificationFacade]
})
export class GamificationModule implements OnModuleInit{
  constructor(
    private readonly signupSubscriber: CreatePlayerOnSignup,
    private readonly missionSubscriber: AddXpOnMissionComplete
) {}

onModuleInit() {
    console.log('Gamification Module Initialized & Listening to Events');
}
}
