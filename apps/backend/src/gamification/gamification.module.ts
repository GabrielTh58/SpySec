import { Module, OnModuleInit } from '@nestjs/common';
import { GamificationController } from './gamification.controller';
import { AchievementRule, BadgeRepository, CreatePlayer, CreatePlayerOnSignup, LevelingService, LevelRepository, PlayerRepository, RegisterGameplay } from '@spysec/gamification';
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
        repoBadge: BadgeRepository,
        repoLevel: LevelRepository,
        levelingService: LevelingService,
        achievementRules: AchievementRule[],
      ) => {
        return new GamificationFacade(repoPlayer, repoBadge, repoLevel, levelingService, achievementRules)
      },
      inject: [PlayerRepository, BadgeRepository, LevelRepository, LevelingService, ACHIEVEMENT_RULES_TOKEN]
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
  ],
  exports: [GamificationFacade, BadgeRepository]
})
export class GamificationModule implements OnModuleInit {
  constructor(
    private readonly signupSubscriber: CreatePlayerOnSignup,
  ) { }

  onModuleInit() {
    console.log('Gamification Module Initialized');
  }
}
