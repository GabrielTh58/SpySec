import { CheckCircle2, Lock, Play } from "lucide-react";

interface MissionCardProps {
  mission: {
      id: string;
      title: string;
      iconUrl: string;
      xpReward: number;
      order: number;
      status: 'COMPLETED' | 'AVAILABLE' | 'LOCKED';
  };
  onPlay: () => void;
}


export function MissionCard({mission, onPlay}: MissionCardProps) {
  const { status, title, xpReward, iconUrl } = mission;  
    
    const visualConfig = {
      COMPLETED: {
        border: "border-green-400",
        glow: "neon-glow-green",
        iconColor: "text-green-400",
        textColor: "text-green-200",
        checkIcon: true,
        button: "bg-green-700/80 text-green-200 hover:bg-green-600",
        buttonText: "Revisar"
      },
      AVAILABLE: {
        border: "border-cyan-400",
        glow: "neon-glow-cyan",
        iconColor: "text-cyan-300",
        textColor: "text-cyan-200",
        checkIcon: false,
        button: "bg-cyan-500 text-white hover:bg-cyan-400",
        buttonText: "Continuar",
        scale: "transform scale-105"
      },
      LOCKED: {
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

    const handleClick = () => {
      if (status !== 'LOCKED') {
          onPlay();
      }
  };

    return (
      <div className={`mission-card-wrapper relative w-full max-w-2xl group ${status === 'AVAILABLE' ? 'transform scale-105' : ''}`}>
        {/* Balão de Dica
        {status === 'available' && tutorMessage && (  
          <div className="ai-tutor-bubble p-4 bg-gray-800 text-cyan-200 text-xs italic rounded-lg border border-gray-600 hidden lg:block shadow-xl z-20">
            <p>"{tutorMessage}"</p>
          </div>
        )}
        */}
        <div 
          onClick={handleClick}
          className={`
            relative w-full p-6 rounded-xl glass-effect border-2 flex items-center gap-6 transition-all duration-300
            ${config.border} ${config.glow} ${status === 'LOCKED' ? 'filter grayscale opacity-60' : 'cursor-pointer'}
          `}
        >
          {config.checkIcon && (  
             <div className="absolute -top-3 -right-3 bg-[#0a0e1a] rounded-full p-0.5 z-10">
                <CheckCircle2 className="w-8 h-8 text-green-500 fill-green-950" />
              </div>
          )}
          
          {status === 'LOCKED' && (
             <div className="absolute -top-3 -right-3 bg-[#0D0D1A] rounded-full p-1 border border-gray-700 z-10">
               <Lock className="w-4 h-4 text-gray-500" />
             </div>
          )}
        
          <div className={`
                p-4 rounded-xl flex items-center justify-center
                ${status === 'AVAILABLE' ? 'bg-cyan-950/50 border border-cyan-500/30 animate-pulse' : 'bg-gray-800/50 border border-gray-700/30'}
          `}>
            <img src={iconUrl} alt={title} className={`w-8 h-8 ${config.iconColor}`} />
          </div>
  
          <div className="flex-1">
            <h4 className={`font-orbitron text-xl ${status === 'AVAILABLE' ? 'text-glow-cyan' : 'text-white'}`}>
              {title}
            </h4>
            <p className={`text-sm font-orbitron font-medium mt-1 ${config.textColor}`}>+{xpReward} XP</p>
          </div>
  
          <button 
            disabled={status === 'LOCKED'}
            className={`font-bold py-2 px-6 rounded-lg transition-colors shadow-lg flex items-center gap-2 ${status !== 'LOCKED' && 'cursor-pointer'} text-sm ${config.button}`}
          >
            {config.buttonText}
            {status === 'AVAILABLE' && <Play size={14} fill="currentColor" />}
          </button>
        </div>
      </div>
    );
  }