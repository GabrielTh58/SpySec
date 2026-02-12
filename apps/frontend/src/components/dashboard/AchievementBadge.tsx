import { ReactNode } from "react";
import { DynamicIcon } from "../ui/DynamicIcon";
import { Lock } from "lucide-react";

interface AchievementBadgeProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  locked?: boolean;
};

export function AchievementBadge({ icon, title, subtitle, locked = false }: AchievementBadgeProps) {
  return (
    <div
      className={`
        group relative flex flex-col items-center text-center p-3 rounded-xl border transition-all duration-300
        min-h-[110px] justify-between
        ${locked 
          ? "bg-[#0F1423]/40 border-gray-800 border-dashed opacity-70 grayscale" 
          : "bg-linear-to-b from-cyan-950/30 to-[#0F1423]/80 border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:-translate-y-1"
        }
      `}
    >
      {/* Efeito de Fundo (Glow) apenas se desbloqueado */}
      {!locked && (
        <div className="absolute inset-0 bg-cyan-500/5 blur-xl rounded-xl opacity-0 group-hover:opacity-80 transition-opacity" />
      )}

      {/* Container do Ícone */}
      <div className="relative z-10 mb-2">
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center border
          ${locked 
            ? "bg-gray-900 border-gray-700 text-gray-600" 
            : "bg-cyan-900/20 border-cyan-500/50 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.2)] group-hover:scale-110 transition-transform duration-300"
          }
        `}>
          {locked ? (
            <Lock size={18} />
          ) : (
            <div className="text-2xl drop-shadow-[0_0_5px_currentColor]">
              {typeof icon === "string" ? <DynamicIcon name={icon} /> : icon}
            </div>
          )}
        </div>
      </div>

      {/* Textos */}
      <div className="relative z-10 w-full">
        <p className={`text-[10px] md:text-xs font-bold uppercase tracking-wider truncate w-full ${locked ? "text-gray-500" : "text-white group-hover:text-cyan-200"}`}>
          {title}
        </p>
        <p className={`text-[9px] mt-1 ${locked ? "text-gray-600" : "text-cyan-500/70"}`}>
          {subtitle}
        </p>
      </div>

      {/* Detalhe decorativo nos cantos se desbloqueado */}
      {!locked && (
        <>
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500 opacity-50 rounded-tl-lg" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500 opacity-50 rounded-br-lg" />
        </>
      )}
    </div>
  );
}