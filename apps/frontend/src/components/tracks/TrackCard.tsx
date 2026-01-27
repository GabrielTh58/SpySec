import { CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";

interface TrackCardProps {
  id: string;
  title: string;
  level: number;
  progress: number;
  status: string; 
  iconUrl: string
  themeColor: "green" | "cyan" | "yellow" | "purple" | "gray";
}

export function TrackCard(props: TrackCardProps) {
  const { id, title, level, progress, status, iconUrl, themeColor } = props

  const normalizedStatus = status.toUpperCase();
  const isLocked = normalizedStatus === 'LOCKED';
  const isCompleted = normalizedStatus === 'COMPLETED';
  const currentTheme = isLocked ? 'gray' : themeColor;

  const borderThemes = {
    yellow: "border-yellow-500/50 hover:border-yellow-400",
    cyan: "border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:border-cyan-400",
    green: "border-green-500/50 shadow-[0_0_8px_rgba(34,197,94,0.5)] hover:border-green-400",
    purple: "border-purple-500/50 hover:border-purple-400",
    gray: "border-gray-700 opacity-75 grayscale hover:opacity-100 hover:grayscale-0"
  };

  const iconThemes = {
    yellow: "bg-yellow-500/10 text-yellow-400 ring-yellow-500/30 group-hover:bg-yellow-500/20",
    cyan: "bg-cyan-500/10 text-cyan-400 ring-cyan-500/30 group-hover:bg-cyan-500/20",
    green: "bg-green-500/10 text-green-400 ring-green-500/30 group-hover:bg-green-500/20",
    purple: "bg-purple-500/10 text-purple-400 ring-purple-500/30 group-hover:bg-purple-500/20",
    gray: "bg-gray-500/10 text-gray-400 ring-gray-500/30"
  };

  const progressThemes = {
    yellow: "from-yellow-600 to-yellow-400",
    cyan: "from-cyan-600 to-cyan-400",
    green: "from-green-600 to-green-400",
    purple: "from-purple-600 to-purple-400",
    gray: "from-gray-700 to-gray-500"
  };

  const buttonThemes = {
    yellow: "bg-yellow-600 hover:bg-yellow-500 text-white shadow-lg shadow-yellow-500/20",
    cyan: "bg-cyan-600 hover:bg-cyan-500 text-white shadow-lg shadow-cyan-500/20",
    green: "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20",
    purple: "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-500/20",
    gray: "bg-gray-700 text-gray-500 cursor-not-allowed border-none shadow-none"
  };

  return (
    <div className={`
        relative group flex flex-col items-center text-center p-8 rounded-2xl
        bg-gray-900/60 backdrop-blur-md border-2 transition-all duration-300 transform hover:-translate-y-2
        min-h-[420px] justify-between 
        ${borderThemes[currentTheme]}`}
    >

      {/* Ícone de Status (Check ou Cadeado) */}
      {isCompleted && (
        <div className="absolute top-4 right-4 text-green-400  drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
          <CheckCircle2 size={32} />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 bg-gray-900/30 rounded-2xl z-10 flex flex-col items-center justify-center backdrop-blur-[2px]">
          <Lock size={48} className="text-gray-400 mb-4" />
          <span className="font-orbitron text-gray-300 tracking-widest uppercase">Bloqueado</span>
        </div>
      )}

      {/* Conteúdo Superior */}
      <div className="w-full flex flex-col items-center">
        <div className={`p-6 rounded-full mb-6 ring-1 transition-colors ${iconThemes[currentTheme]}`}>
          <img 
            src={iconUrl} 
            alt={title}
            className="w-12 h-12 object-contain"
          />
        </div>

        <h3 className="font-orbitron text-xl text-white mb-2 leading-tight min-h-[56px] flex items-center justify-center">
          {title}
        </h3>

        <DifficultyBadge levelNumber={level} />
      </div>

      {/* Conteúdo Inferior (Progresso e Ação) */}
      <div className="w-full">
        <div className="flex justify-between text-xs text-gray-400 mb-2 font-inter">
          <span>Progresso</span>
          <span>{progress}%</span>
        </div>

        {/* Barra de Progresso */}
        <div className="w-full bg-gray-800 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-1000 bg-linear-to-r ${progressThemes[currentTheme]}`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Botão de Ação */}
        <Link href={isLocked ? '#' : `/education/track/${id}`} className="w-full block">
          <button
            disabled={isLocked}
            className={`
                  w-full py-3 rounded-xl font-bold font-orbitron text-sm tracking-wide transition-all
                  ${isCompleted
                ? "bg-green-500/10 text-green-400 border border-green-500/50 hover:bg-green-500 hover:text-gray-900"
                : buttonThemes[currentTheme]
              }
                `}
          >
            {isCompleted ? "REVISAR MÓDULO" : isLocked ? "Bloqueado" : progress > 0 ? "CONTINUAR" : "INICIAR MISSÃO"}
          </button>
        </Link>
      </div>
    </div>
  );
};

function DifficultyBadge({ levelNumber }: { levelNumber: number }) {
  let label = "Iniciante";
  let style = "bg-green-500/20 text-green-400 border-green-500/30";

  if (levelNumber >= 3) {
    label = "Intermediário";
    style = "bg-orange-500/20 text-orange-400 border-orange-500/30";
  } else if (levelNumber >= 6) {
    label = "Avançado";
    style = "bg-red-500/20 text-red-400 border-red-500/30";
  } else {
    label = "Iniciante";
    style = "bg-green-500/20 text-green-400 border-green-500/30";
  }

  return (
    <span className={`px-3 py-1 rounded text-[10px] font-press-start-2p border uppercase tracking-wider mb-6 inline-block ${style}`}>
      {label}
    </span>
  );
}