import { DomainEvents, Subscriber } from "@spysec/shared";
import { TrackCompletedEvent } from "@spysec/education"; 
import { RegisterGameplay } from "../usecase";
import { ActionStatus } from "../policies";

export class AwardBadgesOnTrackComplete implements Subscriber<TrackCompletedEvent> {
    constructor(private readonly useCase: RegisterGameplay){
        this.subscribe()
    }

    subscribe(): void {
        DomainEvents.register(this.handle.bind(this), TrackCompletedEvent.name)
    }

    async handle(event: TrackCompletedEvent): Promise<void>{
        const { userId, trackSlug, trackId } = event.payload

        await this.useCase.execute({
            userId: userId,
            xpEarned: 0,
            action: ActionStatus.TRACK_COMPLETED,   
            payload: {
                trackId: trackId,
                trackSlug: trackSlug
            }
        })
    }
}