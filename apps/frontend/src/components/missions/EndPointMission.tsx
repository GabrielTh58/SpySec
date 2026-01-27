import { Trophy } from "lucide-react";

export function EndPointMission() {
    return (
        <div className="flex flex-col items-center text-center filter grayscale opacity-60 z-10">
            <div className="w-20 h-20 rounded-full bg-gray-800/20 border-2 border-gray-600 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-gray-500" />
            </div>
            <span className="font-orbitron text-lg mt-3 text-gray-500 tracking-wide">Fim da Trilha</span>
        </div>
    );
}