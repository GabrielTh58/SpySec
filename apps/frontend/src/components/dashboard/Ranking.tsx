import { ChevronDown, ChevronUp } from "lucide-react";

interface RankingItemProps {
  rank: number;
  name: string;
  xp: string;
  change: 'up' | 'down' | 'none';
};

export function RankingItem(props: RankingItemProps) {
  const { rank, name, xp, change } = props
  const isTop3 = rank <= 3;
  const rankColors: Record<number, string> = {
    1: "text-yellow-400",
    2: "text-gray-300",
    3: "text-amber-600",
  };

  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded transition-colors">
      <div className="flex items-center gap-3">
        <span className={`font-orbitron font-bold w-6 ${rankColors[rank] || "text-gray-500"}`}>
          #{rank}
        </span>
        <div className="flex flex-col">
          <span className={`text-sm font-medium ${isTop3 ? 'text-white' : 'text-gray-400'}`}>{name}</span>
          <span className="text-[10px] text-gray-500">{xp} XP</span>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs">
        {change === 'up' ? <ChevronUp size={14} className="text-cyan-400" /> :
         change === 'down' ? <ChevronDown size={14} className="text-red-400" /> :
         <span className="text-gray-600">-</span>}
      </div>
    </div>
  );
}