  import { DomainEvents, Subscriber } from "@spysec/shared"; 
  import { MissionCompletedEvent } from "@spysec/education"; 
  import { RegisterGameplay } from "../usecase/RegisterGameplay.usecase";
  import { ActionStatus } from "../policies/AchievementRule.interface";

  export class AddXpOnMissionComplete implements Subscriber<MissionCompletedEvent> {
    constructor(private readonly useCase: RegisterGameplay) {
      this.subscribe();
    }
    
    subscribe(): void {
      DomainEvents.register(this.handle.bind(this), MissionCompletedEvent.name);
    }

    async handle(event: MissionCompletedEvent): Promise<void> {
      const { userId, trackId, xpEarned, missionCategory, isLastMission, timeSpent } = event.payload;

      await this.useCase.execute({
          userId: userId,
          xpEarned: xpEarned,
          action: ActionStatus.MISSION_COMPLETED,
          timeSpent,
          payload: {
            trackId: trackId, 
            missionCategory: missionCategory ? [missionCategory] : [], 
            isLastMission
          }
        });
    }
  }     