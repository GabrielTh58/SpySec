'use client'
import React, { useEffect, use } from "react"; // Adicionado 'use' para Next 15
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// Componentes Visuais
import { Connector } from "@/components/missions/Connector";
import { EndPointMission } from "@/components/missions/EndPointMission";
import { MissionCard } from "@/components/missions/MissionCard";
import { StartPointMission } from "@/components/missions/StartPointMission";

import { useEducation } from "@/data/hooks/useEducation";
import { Loading } from "@/components/template/Loading";

interface TrackDetailsPageProps {
    params: Promise<{ id: string }>
}

export default function TrackDetailsPage({ params }: TrackDetailsPageProps) {
    const { id: trackId } = use(params);
    
    const router = useRouter();
    
    const { currentTrack, isLoading, fetchMissionData, selectTrack } = useEducation();

    useEffect(() => {
      if (!currentTrack || currentTrack.track.id !== trackId) {
        selectTrack(trackId);
    }
    }, [trackId, currentTrack, selectTrack]);

    if (isLoading || !currentTrack || currentTrack.track.id !== trackId) return <Loading />

    const handlePlayMission = async (missionId: string) => {
        await fetchMissionData(missionId);
        router.push(`/missions/${missionId}`);
    };

    const missions = currentTrack.missions || []; 
    const isTrackCompleted = missions.length > 0 && missions.every(m => m.status === 'COMPLETED');

    return (
        <div className="custom-scrollbar flex-1 overflow-y-auto particles-background p-8 lg:p-12 scroll-smooth">
            <div className="flex flex-col items-center max-w-3xl mx-auto pb-20">
                
                <div className="mb-24 text-center animate-fade-in">
                    <h2 className="text-4xl font-orbitron neon-text-glow text-white">
                        {currentTrack.track.title}
                    </h2>
                    <p className="text-gray-400 mt-4 max-w-lg mx-auto text-lg leading-relaxed">
                        {currentTrack.track.description}
                    </p>
                </div>

                <StartPointMission />
                
                <Connector status="COMPLETED" />
                {currentTrack.missions.length === 0 ? (
                    <div className="p-8 border border-yellow-500/30 bg-yellow-500/10 rounded text-yellow-200 my-10">
                        ⚠️ Nenhuma missão cadastrada nesta trilha ainda.
                    </div>
                ) : (
                  currentTrack.missions.map((mission, index) => {
                    const nextConnectorStatus = mission.status === 'COMPLETED' ? 'AVAILABLE' : 'LOCKED';
                    
                    return (
                        <React.Fragment key={mission.id}>
                            <MissionCard 
                                mission={mission} 
                                onPlay={() => handlePlayMission(mission.id)} 
                            />

                            {index < currentTrack.missions.length - 1 ? (
                                <Connector status={nextConnectorStatus} />
                            ) : (
                                <Connector status={mission.status === 'COMPLETED' ? 'COMPLETED' : 'LOCKED'} />
                            )}
                        </React.Fragment>
                   )
                  })
                )}

                <EndPointMission isCompleted={isTrackCompleted} />
            </div>
        </div>
    );
}