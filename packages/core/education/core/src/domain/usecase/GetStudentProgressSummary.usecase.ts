import { Result, UseCase } from "@spysec/shared";
import { EducationRepository, TrackProgressRepository } from "../provider";

export interface StudentProgressSummaryOutputDTO {
    globalProgressPercent: number;
    completedTracksCount: number;
    totalTracksCount: number;
    monthlyGrowth: number,
    nextMission: { 
        id: string;
        title: string;
        trackTitle: string;
        description: string;
        xpReward: number; 
    } | null;
}

export class GetStudentProgressSummary implements UseCase<string, StudentProgressSummaryOutputDTO> {
    constructor(
        private readonly repoEducation: EducationRepository,
        private readonly repoProgress: TrackProgressRepository
    ) {}

    async execute(userId: string): Promise<Result<StudentProgressSummaryOutputDTO>> {
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0)

        const dataOrError = await Result.tryAsync(() => 
            Promise.all([
                this.repoEducation.countTotalMissions(),
                this.repoProgress.countCompletedMissionsByUserId(userId),
                this.repoProgress.countCompletedMissionsSince(userId, startOfMonth),
                this.repoEducation.countTotalTracks(),
                this.repoProgress.countCompletedTracksByUserId(userId), 
                this.repoProgress.findNextMissionToPlay(userId)
            ])
        )       
        if (dataOrError.failed) return Result.fail(dataOrError.errors);

        const [totalMissionsCount, userCompletedCount, completedMissionsThisMonth, totalTracks, completedTracks, nextMissionData] = dataOrError.value!

        const safeTotalMissions = totalMissionsCount > 0 ? totalMissionsCount : 1;
        const progressPercent = Math.min(100, Math.round((userCompletedCount / safeTotalMissions) * 100));
        const monthlyGrowth = Math.min(100, Math.round((completedMissionsThisMonth / safeTotalMissions) * 100));

        return Result.ok({
            globalProgressPercent: progressPercent,
            totalTracksCount: totalTracks,
            completedTracksCount: completedTracks,  
            monthlyGrowth,
            nextMission: nextMissionData ? {
                id: nextMissionData.id.toString(),
                title: nextMissionData.title,
                trackTitle: nextMissionData.trackTitle,
                description: nextMissionData.description,
                xpReward: nextMissionData.xpReward
            } : null
        });
    }
}