import { MascotBubble } from "@/components/missions/mascot/MascotBubble";
import { NextStepButton } from "@/components/missions/NextStepButton";
import { ScenarioQuizData } from "@spysec/education";
import { ArrowRight, Zap } from "lucide-react";

interface ScenarioResultsProps{
    data: ScenarioQuizData;
    score: number
    passed: boolean;
    totalQuestions: number;
    onNext: () => void;
}

export function ScenarioResults({data, passed, score, totalQuestions, onNext}: ScenarioResultsProps){
    let finalMessage = data?.summary?.resultMessages?.needsWork || "Você precisa melhorar seu desempenho.";
    let variant: 'error' | 'success' | 'default' = 'error';
    
    if (score === totalQuestions) {
        finalMessage = data?.summary?.resultMessages?.excellent || "Desempenho impecável!";        
        variant = 'success';
    } else if (passed) {
        finalMessage = data?.summary?.resultMessages?.good || "Bom trabalho, mas pode melhorar.";
        variant = 'success';
    }

    const title = data?.summary?.title || "Resumo da Simulação";
    const mascotMsg = data?.summary?.mascotMessage || "Análise concluída.";

    return (
        <div className="space-y-8 animate-fade-in w-full max-w-3xl mx-auto mt-4">
            <div className={`border rounded-2xl p-6 md:p-10 shadow-2xl bg-[#0F1423]
                ${passed ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]'}`}
            >
                <div className="text-center space-y-4 mb-8">
                    <h2 className="text-2xl font-orbitron font-bold text-white">
                        {title}
                    </h2>
                    
                    <div className="flex justify-center items-center gap-6">
                        <div className="flex flex-col items-center">
                            <span className="text-gray-500 text-xs uppercase tracking-widest mb-1">Acertos</span>
                            <span className={`text-4xl font-mono font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>
                                {score}<span className="text-lg text-gray-600">/{totalQuestions}</span>
                            </span>
                        </div>
                        
                        <div className="h-12 w-px bg-gray-700"></div>
                        
                        <div className="flex flex-col items-center">
                            <span className="text-gray-500 text-xs uppercase tracking-widest mb-1">Status</span>
                            <span className={`text-lg uppercase tracking-wider font-bold ${passed ? 'text-green-400' : 'text-red-400'}`}>
                                {passed ? 'Aprovado' : 'Reprovado'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-black/30 rounded-xl p-5 mb-6 text-center text-gray-300 font-light leading-relaxed border border-gray-800">
                    {finalMessage}
                </div>

                {passed && (
                    <div className="flex items-center justify-center gap-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full font-mono text-sm w-fit mx-auto border border-green-500/20">
                        <Zap size={16} className="fill-green-400" />
                        +{data.summary.xpReward} XP Obtidos
                    </div>
                )}
            </div>

            <MascotBubble 
                message={mascotMsg} 
                variant={variant} 
                title="Avaliação Final" 
            />

            <div className="w-full flex justify-end mt-8">
                <NextStepButton
                    onClick={onNext}
                    className="flex items-center gap-2"
                >
                    Continuar Missão
                    <ArrowRight size={16} />
                </NextStepButton>
            </div>
        </div>
    );
}