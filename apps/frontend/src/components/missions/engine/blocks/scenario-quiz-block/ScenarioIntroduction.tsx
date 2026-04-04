import { MascotBubble } from "@/components/missions/mascot/MascotBubble";
import { ActionsQuiz } from "@/data/hooks/useScenarioQuiz";
import { Play, ShieldAlert } from "lucide-react";
import { ScenarioQuizData } from "@spysec/education"; 

interface ScenarioIntroductionProps {
    data: ScenarioQuizData; 
    actions: ActionsQuiz;
}

export function ScenarioIntroduction({ data, actions }: ScenarioIntroductionProps) {
    const totalQuestions = data.questions?.length || 0;

    return (
        <div className="space-y-8 animate-fade-in w-full max-w-3xl mx-auto mt-4">
            <div className="bg-[#0F1423] border border-cyan-500/30 rounded-2xl p-6 md:p-10 shadow-[0_0_40px_rgba(6,182,212,0.1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>

                <h4 className="text-cyan-500 font-orbitron text-xs uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <ShieldAlert size={16} /> Simulação de Cenário
                </h4>

                <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                    {data.scenarioName}
                </h2>

                <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 font-light">
                    Você está prestes a entrar em um ambiente simulado com {totalQuestions} situações críticas. 
                    Analise o contexto de cada ameaça e tome a decisão mais segura para prosseguir.
                </p>

                <button
                    onClick={actions.handleStart}
                    className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold uppercase 
                        tracking-wider transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                    <Play fill="currentColor" size={18} />
                    Iniciar Simulação
                </button>
            </div>

            <MascotBubble
                message={`Atenção! Esta é uma simulação focada em "${data.scenarioName}". Suas escolhas aqui refletirão seu padrão de decisões no mundo real. Avance com cautela.`}
                variant="default"
            />
        </div>
    );
}