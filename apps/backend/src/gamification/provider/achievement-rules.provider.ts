import { Provider } from '@nestjs/common';
import { 
  CorporateShieldRule, 
  CuriousExplorerRule, 
  DigitalRecruitRule, 
  FoundationSpecialistRule, 
  FutureStudentRule, 
  KeyGuardianRule, 
  PhishingDetectorRule, 
  PhoenixRule,
  RisingStarRule,
  SentinelRule,
} from '@spysec/gamification'; 

export const ACHIEVEMENT_RULES_TOKEN = 'ACHIEVEMENT_RULES';

export const AchievementRulesProvider: Provider = {
  provide: ACHIEVEMENT_RULES_TOKEN,
  useFactory: () => {
    return [
      new CorporateShieldRule(),
      new DigitalRecruitRule(),
      new PhoenixRule(),
      new KeyGuardianRule(),
      new CuriousExplorerRule(),
      new FoundationSpecialistRule(),
      new RisingStarRule(),
      new SentinelRule(),
      new PhishingDetectorRule(),
      new FutureStudentRule()
    ];
  },
};