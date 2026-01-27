import { Mission } from "@/app/(pages)/(private)/Missions/page";
import { CheckCircle2, Lock } from "lucide-react";

interface MissionCardProps {
    mission: Mission;
  }
  

export function MissionCard({ mission }: MissionCardProps) {
    const { status, title, xp, icon: Icon, tutorMessage } = mission;
  
    // Configurações visuais baseadas no estado
    const visualConfig = {
      completed: {
        border: "border-yellow-400",
        glow: "neon-glow-gold",
        iconColor: "text-yellow-400",
        textColor: "text-yellow-200",
        checkIcon: true,
        button: "bg-gray-700 text-gray-300 hover:bg-gray-600",
        buttonText: "Revisar"
      },
      active: {
        border: "border-cyan-400",
        glow: "neon-glow-cyan",
        iconColor: "text-cyan-300",
        textColor: "text-cyan-200",
        checkIcon: false,
        button: "bg-cyan-500 text-white hover:bg-cyan-400",
        buttonText: "Continuar",
        scale: "transform scale-105"
      },
      locked: {
        border: "border-gray-700",
        glow: "",
        iconColor: "text-gray-500",
        textColor: "text-gray-400",
        checkIcon: false,
        button: "bg-gray-600 text-gray-400 cursor-not-allowed",
        buttonText: "Bloqueada",
        containerClass: "filter grayscale opacity-60"
      }
    };
  
    const config = visualConfig[status];

    return (
      <div className={`mission-card-wrapper relative w-full max-w-2xl group ${(status === 'active' && visualConfig.active.scale) ? visualConfig.active.scale : ''}`}>
        {/* Balão de Dica (Apenas se Ativa e tiver mensagem)
        {status === 'active' && tutorMessage && (
          <div className="ai-tutor-bubble p-4 bg-gray-800 text-cyan-200 text-xs italic rounded-lg border border-gray-600 hidden lg:block shadow-xl z-20">
            <p>"{tutorMessage}"</p>
          </div>
        )}
        */}
        <div className={`
          relative w-full p-6 rounded-xl glass-effect border-2 flex items-center gap-6 transition-all duration-300
          ${config.border} ${config.glow} ${status === 'locked' ? 'filter grayscale opacity-60' : ''}
        `}>
          {/* Ícone de Check para Concluídos */}
          {config.checkIcon && (
             <CheckCircle2 className="absolute -top-3 -right-3 w-8 h-8 text-yellow-300 bg-[#0d0d1a] rounded-full z-10" />
          )}
          
          {/* Ícone de Cadeado para Bloqueados */}
          {status === 'locked' && (
             <div className="absolute -top-3 -right-3 bg-[#0d0d1a] rounded-full p-1 border border-gray-700 z-10">
               <Lock className="w-5 h-5 text-gray-500" />
             </div>
          )}
  
          {/* Ícone Principal */}
          <div className={`p-3 rounded-lg bg-gray-800/50 ${status === 'active' ? 'animate-pulse' : ''}`}>
            <Icon className={`w-10 h-10 ${config.iconColor}`} />
          </div>
  
          <div className="flex-1">
            <h4 className={`font-orbitron text-xl ${status === 'active' ? 'text-glow-cyan' : 'text-white'}`}>
              {title}
            </h4>
            <p className={`text-sm font-medium mt-1 ${config.textColor}`}>+{xp} XP</p>
          </div>
  
          <button 
            disabled={status === 'locked'}
            className={`font-bold py-2 px-6 rounded-lg transition-colors shadow-lg ${config.button}`}
          >
            {config.buttonText}
          </button>
        </div>
      </div>
    );
  }