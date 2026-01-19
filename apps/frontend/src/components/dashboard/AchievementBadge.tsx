import { ReactNode } from "react";

interface AchievementBadgeProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  locked?: boolean;
};

export function AchievementBadge(props: AchievementBadgeProps) {
  const {icon,  title,  subtitle,  locked = false} = props

  return (
    <div
      className={`flex flex-col items-center text-center p-3 rounded-lg transition-colors ${
        locked ? "bg-black/20 opacity-50" : "bg-white/5 hover:bg-white/10 border border-cyan-500/20"
      }`}
    >
      <div className={`text-3xl mb-2 ${locked ? "filter grayscale" : ""}`}>
        {icon}
      </div>
      <p className="text-xs font-semibold text-gray-200">{title}</p>
      <p className="text-[10px] text-gray-400 mt-1">{subtitle}</p>
    </div>
  );
}
