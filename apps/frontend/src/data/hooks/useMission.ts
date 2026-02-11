import { useEffect, useMemo, useState } from "react";
import { useStopwatch } from "./useStopWatch";
import { useEducation } from "./useEducation";
import { useGamification } from "./useGamification";
import { MissionContent } from "@spysec/education";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useMission(missionId: string) {
    const router = useRouter();

    const { seconds, stop, formatTime } = useStopwatch();

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
        stop();
        const result = await completeMission(missionId, answers, seconds);
        console.log(result);
        

        if (result && result.success) {
            await refreshProfile();
            setXpEarnedResult(result.xpEarned);

            if (result.newBadge) {
                setEarnedBadge(result.newBadge);
                setShowBadgeModal(true);
            } else {
                setShowSuccessModal(true);
            }
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

    return {
        missionContentVO,
        handleMissionFinish,
        handleCloseBadge,
        handleNextMission,
        handleBackToTrack,
        showSuccessModal,
        showBadgeModal,
        earnedBadge,
        xpEarnedResult,
        isLoading,
    }

}