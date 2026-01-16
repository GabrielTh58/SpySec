import { DomainEvents, Subscriber } from "@spysec/shared"; 
import { UserCreatedEvent } from "@spysec/auth"; 
import { CreatePlayer } from "../usecase/CreatePlayer.usecase";

export class CreatePlayerOnSignup implements Subscriber<UserCreatedEvent> {
  constructor(private useCase: CreatePlayer) {
    this.subscribe();
  }
  
  subscribe(): void {
    DomainEvents.register(this.handle.bind(this), UserCreatedEvent.name);
  }

  async handle(event: UserCreatedEvent): Promise<void> {
    const { userId, nickname, type } = event.payload;
    
    await this.useCase.execute({
      userId,
      nickname,
      type
    })
  }
}   