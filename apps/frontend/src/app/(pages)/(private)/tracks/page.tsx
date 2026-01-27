'use client'
import { Loading } from "@/components/template/Loading";
import { StatsSummary } from "@/components/tracks/StatsSummary";
import { TrackCard } from "@/components/tracks/TrackCard";
import { useEducation } from "@/data/hooks/useEducation";

export default function Tracks(){
    const { tracks, isLoading } = useEducation()

    if (isLoading) return <Loading />

    function getThemeColor(status: string): "green" | "cyan" | "yellow" | "gray" | "purple" {
      switch (status.toUpperCase()) {
        case "COMPLETED":
          return "green";
        case "IN_PROGRESS":
        case "ACTIVE":
          return "cyan";
        case "NOT_STARTED":
          return "purple";
        case "LOCKED":
        default:
          return "gray";
      }
    }

    return(
        <div className="cyber-grid-bg flex-1 w-full mx-auto p-6 md:p-12 animate-fade-in">
        
        <div className="mb-10 flex items-end justify-between border-b border-gray-800 pb-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-orbitron text-white mb-2 neon-text-glow">
              Trilhas de Conhecimento
            </h2>
            <p className="text-gray-400">Selecione uma especialização para iniciar seus aprendizados.</p>
          </div>
          <div className="hidden md:block text-right"></div>
        </div>

        {/* Grid de Trilhas */}
        <div className="trail-card-container connected grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {tracks.length === 0 && (
                <div className="col-span-full text-center py-20 text-gray-500">
                    Nenhuma trilha encontrada. Conecte o cabo de rede, Agente.
                </div>
          )}
          {tracks.map((track) => (
            <TrackCard
              key={track.id}
              id={track.id}
              title={track.title}
              level={2}
              progress={track.progressPercentage}
              status={track.status}
              iconUrl={track.iconUrl}
              themeColor={getThemeColor(track.status)}
            />
          ))}
        </div>

        <StatsSummary />
      </div>
    )
}