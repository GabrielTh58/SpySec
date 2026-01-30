'use client'

import { use, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEducation } from "@/data/hooks/useEducation";
import { useGamification } from "@/data/hooks/useGamification";
import { MissionContent } from "@spysec/education";
import { Loading } from "@/components/template/Loading";
import { MissionSuccessModal } from "@/components/missions/MissionSuccessModal";
import { MissionWorkspace } from "@/components/missions/engine/MissionWorkspace";
import { BadgeRevealModal } from "@/components/badges/BadgeRevealModal";

interface MissionPageProps {
    params: Promise<{ id: string }>
}

export default function MissionPage({ params }: MissionPageProps) {
    const { id } = use(params);
    const missionId = id;
    const router = useRouter();

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showBadgeModal, setShowBadgeModal] = useState<boolean>(false);
    const [earnedBadge, setEarnedBadge] = useState<any | null>(null);
    const [xpEarnedResult, setXpEarnedResult] = useState(0);

    const {
        activeMission,
        fetchMissionData,
        completeMission,
        isLoading
    } = useEducation();

    const { refreshProfile } = useGamification();

    useEffect(() => {
        if (!activeMission || activeMission.id !== missionId) {
            fetchMissionData(missionId);
        }
    }, [missionId, activeMission, fetchMissionData]);

    const missionContentVO = useMemo(() => {
        if (!activeMission || !activeMission.blocks) return null;

        const blocksData = Array.isArray(activeMission.blocks)
            ? activeMission.blocks
            : (activeMission.blocks as any).value || [];

        return MissionContent.restore(blocksData);
    }, [activeMission]);

    const handleMissionFinish = async (answers: Record<string, any>) => {
        const result = await completeMission(missionId, answers);

        if (result && result.success) {
            await refreshProfile();
            setXpEarnedResult(result.xpEarned);
            setShowSuccessModal(true)

            /*if (result.newBadge) {
                setEarnedBadge(result.newBadge);
                setShowBadgeModal(true);
            } else {
                setShowSuccessModal(true);
            }*/
        } else {
            toast.error("Erro ao validar missão. Verifique suas respostas.");
        }
    };

    const handleCloseBadge = () => {
        setShowBadgeModal(false);
        setTimeout(() => {
            setShowSuccessModal(true);
        }, 300);
    };

    const handleNextMission = () => {
        if (activeMission?.nextMissionId) {
            setShowSuccessModal(false);
            router.push(`/missions/${activeMission.nextMissionId}`);
        }
    };

    const handleBackToTrack = () => {
        router.push(`/tracks`)
    }

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
