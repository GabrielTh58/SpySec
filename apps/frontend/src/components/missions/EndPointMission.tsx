import { Trophy } from "lucide-react";

interface EndPointMissionProps {
    isCompleted: boolean;
}

export function EndPointMission({ isCompleted }: EndPointMissionProps) {
    return (
        <div className={`
            flex flex-col items-center text-center z-10 transition-all duration-700
            ${isCompleted ? 'filter-none scale-110' : 'filter grayscale opacity-50'}
        `}>
            <div className={`
                relative w-24 h-24 rounded-full border-2 flex items-center justify-center transition-all duration-500
                ${isCompleted 
                    ? 'bg-yellow-500/10 border-yellow-400 shadow-[0_0_50px_rgba(250,204,21,0.4)]' 
                    : 'bg-gray-800/20 border-gray-700'}
            `}>
                {isCompleted && (
                    <div className="absolute inset-0 rounded-full border border-yellow-400 animate-ping opacity-20"></div>
                )}

                <Trophy 
                    className={`w-10 h-10 transition-colors duration-500 ${isCompleted ? 'text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]' : 'text-gray-600'}`} 
                />
            </div>
            
            <span className={`
                font-orbitron text-lg mt-4 tracking-wide uppercase transition-colors duration-500
                ${isCompleted ? 'text-yellow-200 text-shadow-gold' : 'text-gray-600'}
            `}>
                {isCompleted ? 'Trilha Conquistada!' : 'Fim da Trilha'}
            </span>
        </div>
    );
}