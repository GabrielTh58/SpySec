'use client'

import { use } from "react";
import { useEducation } from "@/data/hooks/useEducation";
import { Loading } from "@/components/template/Loading";
import { MissionSuccessModal } from "@/components/missions/MissionSuccessModal";
import { MissionWorkspace } from "@/components/missions/engine/MissionWorkspace";
import { BadgeRevealModal } from "@/components/badges/BadgeRevealModal";
import { useMission } from "@/data/hooks/useMission";

interface MissionPageProps {
    params: Promise<{ id: string }>
}

export default function MissionPage({ params }: MissionPageProps) {
    const { id } = use(params);
    const missionId = id;

    const { activeMission } = useEducation()
    const { 
        missionContentVO,
        handleMissionFinish, 
        handleCloseBadge,
        handleNextMission,
        handleBackToTrack,
        showSuccessModal,
        showBadgeModal,
        earnedBadge,
        xpEarnedResult,
        isLoading 
    } = useMission(missionId);


    if (isLoading || !missionContentVO) return <Loading />

    return (
        <>
            <MissionWorkspace
                missionContent={missionContentVO}
                title={activeMission?.title || "Missão"}
                order={activeMission?.order || 0}
                onFinish={handleMissionFinish}
            />

            {showBadgeModal && earnedBadge && (
                <BadgeRevealModal
                    badge={earnedBadge}
                    onClose={handleCloseBadge} 
                />
            )}

            {showSuccessModal && (
                <MissionSuccessModal
                    xpEarned={xpEarnedResult}
                    onNextMission={handleNextMission}
                    onBackToTrack={handleBackToTrack}
                    hasNextMission={!!activeMission?.nextMissionId}
                />
            )}
        </>
    );
}
