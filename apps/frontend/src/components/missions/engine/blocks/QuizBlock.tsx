import { HelpCircle } from "lucide-react";

interface QuizOption {
    id: string;
    text: string;
}

interface QuizBlockData {
    question: string;
    options: QuizOption[];
    mascotMessage?: string;
}

interface QuizBlockProps {
    data: QuizBlockData;
    value: string;
    onChange: (v: string) => void;
    isLocked: boolean;  
}

export function QuizBlock({ data, value, onChange, isLocked }: QuizBlockProps) {
    return (
        <div className="space-y-8">
            <h3 className="text-xl md:text-2xl font-medium text-white flex gap-3 leading-snug">
                <HelpCircle className="text-purple-400 shrink-0 mt-1 drop-shadow-[0_0_8px_rgba(192,132,252,0.5)]" />
                {data.question}
            </h3>

            <div className="space-y-3">
                {data.options.map((option) => {
                    const isSelected = value === option.id;

                    return (
                        <button
                            key={option.id}
                            onClick={() => onChange(option.id)}
                            disabled={isLocked}
                            className={`
                                w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-4 group relative overflow-hidden 
                                cursor-pointer
                                ${isSelected 
                                    ? 'bg-cyan-950/60 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.2)]' 
                                    : 'bg-gray-900/40 border-gray-800 hover:border-gray-600 hover:bg-gray-800/60'}
                            `}
                        >
                            <div className={`
                                w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors z-10
                                ${isSelected ? 'border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'border-gray-600 group-hover:border-gray-400'}
                            `}>
                                {isSelected && <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_5px_#22d3ee]" />}
                            </div>
                            
                            <span className={`text-base z-10 ${isSelected ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                {option.text}
                            </span>
                        </button>
                    )
                })}
            </div>
        </div>
    );
}