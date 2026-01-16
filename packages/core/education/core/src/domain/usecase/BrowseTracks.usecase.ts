import { Result, UseCase } from "@spysec/shared";
import { EducationRepository } from "../provider/Education.repository";
import { ProfileType } from "@spysec/auth";
import { TrackDifficulty } from "../model/Track.entity";
import { GamificationGateway } from "../gateway/Gamification.gateway";
import { TrackProgressRepository } from "../provider/TrackProgress.repository";
import { TrackProgress } from "../model/TrackProgress.entity";

export interface BrowseTracksInputDTO {
  userId: string;
  userProfile: ProfileType;
}

export interface TrackCardDTO {
  id: string;
  title: string;
  slug: string;
  description: string;
  iconUrl: string;
  difficulty: TrackDifficulty;
  isLocked: boolean;
  lockReason?: "LEVEL" | "PREREQUISITE";
  progressPercentage: number;
  status: "LOCKED" | "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
}

export class BrowseTracks implements UseCase<BrowseTracksInputDTO, TrackCardDTO[]>{
  constructor(
    private readonly repoEducation: EducationRepository,
    private readonly repoProgress: TrackProgressRepository,
    private readonly gatewayGamification: GamificationGateway
  ) {}

  async execute(input: BrowseTracksInputDTO): Promise<Result<TrackCardDTO[]>> {
    const dataOrError = await Result.tryAsync(() =>
      Promise.all([
        this.repoEducation.findAllTracks(true), 
        this.gatewayGamification.getPlayerStats(input.userId),
        this.repoProgress.findAllProgressByUser(input.userId),
      ])
    );

    if (dataOrError.failed) return Result.fail(dataOrError.errors);

    const [allTracks, statsData, allProgresses] = dataOrError.value!;
    const userStats = statsData || { level: 1, totalXp: 0 };

    const progressMap = new Map(allProgresses.map((p: TrackProgress) => [p.trackId, p]));

    const visibleTracks = allTracks.filter((track) =>
      track.isVisibleTo(input.userProfile)
    );

    // Calcula uma vez os IDs das trilhas completadas (performance)
    const completedTrackIds = allProgresses
      .filter((p) => p.isCompleted)
      .map((p) => p.trackId);

    // Mapeia os dados (Tudo em memória, super rápido)
    const trackCards: TrackCardDTO[] = visibleTracks.map((track) => {
      const lockStatus = track.isLocked(completedTrackIds, userStats.level);
      const totalMissions = track.missions.length;
      const progressEntity = progressMap.get(track.id.toString());
      const completedCount = progressEntity ? progressEntity.lastCompletedOrder : 0;

      let percentage = 0;
      if (totalMissions > 0) {
        const safeCount = Math.min(completedCount, totalMissions);  
        percentage = Math.round((safeCount / totalMissions) * 100);
      }

      let status: TrackCardDTO["status"] = "NOT_STARTED";
      if (lockStatus.locked) status = "LOCKED";
      else if (percentage === 100) status = "COMPLETED";
      else if (percentage > 0) status = "IN_PROGRESS";

      return {
        id: track.id.toString(),
        title: track.title,
        slug: track.slug,
        description: track.description,
        iconUrl: track.iconUrl,
        difficulty: track.difficulty,
        isLocked: lockStatus.locked,
        lockReason: lockStatus.reason,
        progressPercentage: percentage,
        status: status,
      };
    });

    return Result.ok(trackCards);
  }
}
