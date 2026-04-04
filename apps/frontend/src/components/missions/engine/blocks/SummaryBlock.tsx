import { SummaryData } from "@spysec/education";
import { Trophy, Target, ArrowRight, Zap } from "lucide-react";

interface SummaryBlockProps {
    data: SummaryData; 
}

export function SummaryBlock({ data }: SummaryBlockProps) {
    return (
        <div className="space-y-6 animate-fade-in w-full max-w-3xl mx-auto mt-4">
            
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
                <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center border-2 border-cyan-500/30
                    shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                >
                    <Trophy className="text-cyan-400 w-10 h-10" />
                </div>
                <h2 className="text-2xl md:text-3xl font-orbitron font-bold text-white text-glow-cyan">
                    {data.title}
                </h2>
                {data.xpEarned && (
                    <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-1.5 rounded-full font-mono text-sm">
                        <Zap size={16} className="fill-green-400" />
                        +{data.xpEarned} XP Obtidos
                    </div>
                )}
            </div>

            <div className="bg-[#0F1423] border border-gray-700 rounded-2xl overflow-hidden shadow-2xl relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500"></div>
                
                <div className="p-6 md:p-8 space-y-8">
                    
                    <div>
                        <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-3 flex items-center gap-2">
                            Resumo da Operação
                        </h4>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                            {data.summary}
                        </p>
                    </div>

                    <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-xl p-5 relative overflow-hidden">
                        <Target className="absolute -right-4 -bottom-4 w-24 h-24 text-cyan-500/10 rotate-12" />
                        <h4 className="text-xs uppercase tracking-widest text-cyan-500 font-bold mb-2 relative z-10 flex items-center gap-2">
                            <Target size={14} /> Lição Principal
                        </h4>
                        <p className="text-cyan-100 font-medium text-sm md:text-base relative z-10">
                            {data.keyTakeaway}
                        </p>
                    </div>

                    {data.nextMissionTeaser && (
                        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                            <div>
                                <h4 className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">
                                    Próxima Etapa
                                </h4>
                                <p className="text-gray-400 text-sm italic">
                                    {data.nextMissionTeaser}
                                </p>
                            </div>
                            <div className="shrink-0 w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
                                <ArrowRight className="text-gray-400" size={18} />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}