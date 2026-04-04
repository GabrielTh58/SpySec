import { ProgressStatus, TrackProgress } from "@spysec/education";
import { TrackProgress as PrismaProgress } from "../../../generated/prisma/client"; 

export class TrackProgressMapper{
    static toDomain(raw: PrismaProgress): TrackProgress{
        const trackProgressOrError = TrackProgress.restore({
            id: raw.id,
            userId: raw.userId,
            trackId: raw.trackId,
            status: raw.status as ProgressStatus,
            lastCompletedOrder: raw.lastCompletedOrder,
            startedAt: raw.startedAt,
            completedAt: raw.completedAt,
            earnedXp: raw.earnedXp     
        })

        if(trackProgressOrError.failed) {
            throw new Error(`Mapper Error (TrackProgress): ${trackProgressOrError.errors}`);
        }

        return trackProgressOrError.value!
    }

    static toPersistence(progress: TrackProgress) {
        return {
          id: progress.id.toString(),
          userId: progress.userId,
          trackId: progress.trackId,
          status: progress.status,
          lastCompletedOrder: progress.lastCompletedOrder,
          startedAt: progress.startedAt,
          completedAt: progress.completedAt,
          earnedXp: progress.earnedXp,
        };
      }
}