import { Flag } from "lucide-react";

export function StartPointMission() {
    return (
      <div className="flex flex-col items-center text-center z-10">
        <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-400 flex items-center justify-center">
          <Flag className="w-10 h-10 text-green-300" />
        </div>
        <span className="font-orbitron text-lg mt-3 text-green-400 tracking-wide">Início da Trilha</span>
      </div>
    );
}
  