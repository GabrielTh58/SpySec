import { IDomainEvent } from "@spysec/shared";
import { ProfileType, User } from "../model/User.entity";

export class UserCreatedEvent implements IDomainEvent {
  dateTimeOccurred: Date;
  
  payload: {
    userId: string;
    nickname: string;
    type: ProfileType; 
  };

  constructor(user: User) {
    this.dateTimeOccurred = new Date();
    
    this.payload = {
      userId: user.id.toString(), 
      nickname: user.name.value,
      type: user.profileType
    };
  }

    getAggregateId(): string {
        return this.payload.userId;
    }
}