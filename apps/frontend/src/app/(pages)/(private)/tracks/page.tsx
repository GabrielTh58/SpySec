'use client'
import { useMemo } from "react";
import { Loading } from "@/components/template/Loading";
import { StatsSummary } from "@/components/tracks/StatsSummary";
import { TrackCard } from "@/components/tracks/TrackCard";
import { useEducation } from "@/data/hooks/useEducation";

const CATEGORY_ORDER: Record<string, number> = {
  'MINDSET': 1,
  'DEVICES': 2,
  'CORPORATE': 3,
  'TRENDS': 4,
  'FINAL': 5
};

const DIFFICULTY_ORDER: Record<string, number> = {
  'BASIC': 1,
  'INTERMEDIATE': 2,
  'ADVANCED': 3
};

export default function Tracks() {
  const { tracks, isLoading } = useEducation();

  const sortedTracks = useMemo(() => {
    if (!tracks) return [];
    
    return [...tracks].sort((a, b) => {
      const catA = DIFFICULTY_ORDER[a.difficulty?.toUpperCase()] || 99;
      const catB = DIFFICULTY_ORDER[b.difficulty?.toUpperCase()] || 99;

      return catA - catB;
    });
  }, [tracks]);

  function getThemeColor(status: string): "green" | "cyan" | "gray" | "purple" {
    switch (status?.toUpperCase()) {
      case "COMPLETED": return "green";
      case "IN_PROGRESS": return "cyan"
      case "NOT_STARTED": return "purple";
      case "LOCKED":
      default: return "gray";
    }
  }

  if (isLoading) return <Loading />;

  return (
    <div className="cyber-grid-bg flex-1 w-full mx-auto p-6 md:p-12 animate-fade-in">
      
      <div className="mb-10 flex items-end justify-between border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-orbitron text-white mb-2 neon-text-glow">
            Trilhas de Conhecimento
          </h2>
          <p className="text-gray-400">Selecione uma especialização para iniciar seus aprendizados.</p>
        </div>
      </div>

      <div className="trail-card-container connected grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {sortedTracks.length === 0 && (
            <div className="col-span-full text-center py-20 text-gray-500">
                Nenhuma trilha encontrada. Conecte o cabo de rede, Agente.
            </div>
        )}
        
        {sortedTracks.map((track) => (
          <TrackCard
            key={track.id}
            id={track.id}
            title={track.title} 
            difficulty={track.difficulty} 
            progress={track.progressPercentage}
            status={track.status}
            iconUrl={track.iconUrl}
            themeColor={getThemeColor(track.status)}
          />
        ))}
      </div>

      <StatsSummary />
    </div>
  );
}