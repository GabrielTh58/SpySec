import { IDomainEvent } from "@spysec/shared";

interface MissionCompletedEventPayload {
    userId: string;
    missionId: string;
    xpEarned: number;
    trackId: string;
    missionCategory: string; 
    timeSpent: number
    isLastMission: boolean
}

export class MissionCompletedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  
  public payload: MissionCompletedEventPayload 

  constructor(payload: MissionCompletedEventPayload) {
    this.dateTimeOccurred = new Date();
    this.payload = payload;
  }

  getAggregateId(): string {
    return this.payload.userId; 
  }
}