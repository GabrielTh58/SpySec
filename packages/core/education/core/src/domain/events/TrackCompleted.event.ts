import { IDomainEvent } from "@spysec/shared";

interface TrackCompletedEventPayload {
    userId: string;
    trackId: string;
    trackSlug: string;
    occurredAt: Date;
}

export class TrackCompletedEvent implements IDomainEvent {
  public dateTimeOccurred: Date;
  
  public payload: TrackCompletedEventPayload 

  constructor(payload: TrackCompletedEventPayload) {
    this.dateTimeOccurred = new Date();
    this.payload = payload;
  }

  getAggregateId(): string {
    return this.payload.userId;
  }
}