import { Entity, EntityProps, Id, Result } from "@spysec/shared";
import { Validator } from "@spysec/utils";

export enum ProgressStatus {
  STARTED = "STARTED",
  COMPLETED = "COMPLETED"
}

export interface TrackProgressProps extends EntityProps {
  userId: string;    
  trackId: string;      
  status: ProgressStatus;
  lastCompletedOrder: number;
  startedAt: Date;
  completedAt?: Date | null;
  earnedXp: number;     
}

export interface StartTrackInputDTO {
  userId: string;
  trackId: string;
}

export interface RestoreProgressProps {
  id: string;
  userId: string;
  trackId: string;
  status: string;
  lastCompletedOrder: number;
  startedAt: Date | string;
  completedAt?: Date | string | null;
  earnedXp: number;
}

export class TrackProgress extends Entity<TrackProgress, TrackProgressProps> {
  private constructor(props: TrackProgressProps, id: Id) {
    super(id, props);
  }

  static start(props: StartTrackInputDTO): Result<TrackProgress> {
    const errors = [
      Validator.notNullOrEmpty("PROFILE_ID_REQUIRED", props.userId),
      Validator.notNullOrEmpty("TRACK_ID_REQUIRED", props.trackId),
    ];

    const validErrors = errors.filter((e): e is string => e !== null);
    if (validErrors.length > 0) return Result.fail<TrackProgress>(validErrors[0]!);

    return Result.ok(
      new TrackProgress(
        {
          userId: props.userId,
          trackId: props.trackId,
          status: ProgressStatus.STARTED,
          lastCompletedOrder: 0,
          startedAt: new Date(),  
          completedAt: null,
          earnedXp: 0,
        },
        Id.generate()
      )
    );
  }

  static restore(props: RestoreProgressProps): Result<TrackProgress> {
    return Result.ok(
      new TrackProgress(
        {
          ...props,
          status: props.status as ProgressStatus,
          lastCompletedOrder: Number(props.lastCompletedOrder) || 0,
          startedAt: new Date(props.startedAt),
          completedAt: props.completedAt ? new Date(props.completedAt) : null,
        },
        Id.restore(props.id)
      )
    );
  }

  private clone(changes: Partial<TrackProgressProps>): TrackProgress {
    return new TrackProgress(
      { ...this.props, ...changes }, 
      this.id as Id 
    );
  }
  
  complete(xpReward: number): Result<TrackProgress> {
    if (this.props.status === ProgressStatus.COMPLETED) {
      return Result.fail("TRACK_ALREADY_COMPLETED");
    }

    return Result.ok(
      this.clone({
        status: ProgressStatus.COMPLETED,
        completedAt: new Date(),
        earnedXp: (this.props.earnedXp || 0) + xpReward
      })
    );
  }

  updateLastMission(order: number): TrackProgress {
    const newOrder = Math.max(this.props.lastCompletedOrder, order);
    return this.clone({ lastCompletedOrder: newOrder });
}

  get userId() { return this.props.userId; }
  get trackId() { return this.props.trackId; }
  get status() { return this.props.status; }
  get isCompleted() { return this.props.status === ProgressStatus.COMPLETED; }
  get lastCompletedOrder() { return this.props.lastCompletedOrder; }
  get startedAt() { return this.props.startedAt; }
  get completedAt() { return this.props.completedAt; }
  get earnedXp() { return this.props.earnedXp; }
}