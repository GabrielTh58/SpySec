import { useEducation } from "@/data/hooks/useEducation"
import { useGamification } from "@/data/hooks/useGamification"

export function StatsSummary() {
  const { progress, tracks } = useEducation()
  const { profile } = useGamification()

  const completedTracks = progress?.completedTracksCount || 0;
  const totalTracks = progress?.totalTracksCount || 0;

  const completionPercentage = totalTracks > 0 
    ? Math.round((completedTracks / totalTracks) * 100) 
    : 0;

    console.log('completed', completedTracks);
    console.log('totalTracks', totalTracks);
    console.log('completion', completionPercentage);
    

  const nextTarget = tracks.find(t => t.status === 'LOCKED' || t.status === 'NOT_STARTED');
  
  const motivationText = nextTarget 
    ? <span> Mantenha o foco para desbloquear o módulo <span className="text-gray-200 font-medium">{nextTarget.title}</span>.</span>
    : <span>Parabéns! Você dominou todas as operações disponíveis.</span>;

  return(
    <div className="mt-12 mb-8 bg-linear-to-r from-gray-900/80 to-gray-900/50 border border-gray-800 rounded-2xl p-8 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h3 className="font-orbitron text-2xl mb-2 text-cyan-500">Resumo da Jornada</h3>
          <p className="text-gray-400 text-sm max-w-md">
            Você completou <span className="text-cyan-400 font-bold">{completionPercentage}%</span> das trilhas disponíveis.
            {motivationText}
          </p>

          <div className="w-full bg-gray-800 h-1.5 rounded-full mt-4 overflow-hidden max-w-xs">
             <div 
                className="h-full bg-cyan-500 shadow-[0_0_10px_cyan]" 
                style={{ width: `${completionPercentage}%`, transition: 'width 1s ease-out' }}
             />
          </div>
        </div>
        
        <div className="flex gap-12">
          <div className="text-center">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">XP Total</p>
            <p className="font-orbitron text-3xl text-transparent bg-clip-text bg-linear-to-b from-green-300 to-green-600 font-bold">
              {profile?.currentXp || 0}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Trilhas</p>
            <p className="font-orbitron text-3xl text-transparent bg-clip-text bg-linear-to-b from-yellow-300 to-yellow-600 font-bold">
              {completedTracks}/{totalTracks}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Conquistas</p>
            <p className="font-orbitron text-3xl text-transparent bg-clip-text bg-linear-to-b from-purple-300 to-purple-600 font-bold">
              {profile?.badges.length || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 