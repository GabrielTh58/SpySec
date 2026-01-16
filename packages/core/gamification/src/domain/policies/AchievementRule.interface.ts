import { Player } from "../model";

export enum ActionStatus {
  MISSION_COMPLETED = "MISSION_COMPLETED",
  TRACK_COMPLETED = "TRACK_COMPLETED",
  AI_INTERACTION = "AI_INTERACTION",
  LOGIN = "LOGIN"
}

export interface AchievementContext {
  action: ActionStatus;  
  payload?: {
    trackSlug?: string;     
    missionCategory?: string[];          
    xpEarned?: number;
  };
}

export interface AchievementRule{
  evaluate(player: Player, context: AchievementContext): string | null;
}