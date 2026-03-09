import { useScenarioQuiz } from "@/data/hooks/useScenarioQuiz";
import { MapPin, Clock, Play, ChevronRight, CheckCircle2, AlertTriangle, ShieldAlert, Zap } from "lucide-react";
import { MascotBubble } from "../MascotBubble";

interface ScenarioQuizBlockProps {
    data: any; 
    value: Record<string, string>;
    onChange: (val: Record<string, string>) => void;
    isLocked?: boolean;
}

export function ScenarioQuizBlock({ data, value, onChange, isLocked }: ScenarioQuizBlockProps) {
    const { 
        status, currentIndex, currentQuestion, totalQuestions, 
        localAnswers, score, passed, actions 
    } = useScenarioQuiz(data, value, onChange, isLocked);

    // --- RENDER 1: TELA DE INTRODUÇÃO ---
    if (status === 'INTRO') {
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
                        {data.intro}
                    </p>

                    <button 
                        onClick={actions.handleStart}
                        className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all hover:scale-105 active:scale-95"
                    >
                        <Play fill="currentColor" size={18} />
                        Iniciar Simulação
                    </button>
                </div>

                <MascotBubble 
                    message={data.mascotIntro} 
                    variant="neutral" 
                    title="Briefing Inicial" 
                />
            </div>
        );
    }

    // --- RENDER 2: RESUMO FINAL (SUMMARY) ---
    if (status === 'SUMMARY') {
        let finalMessage = data.summary.resultMessages.needsWork;
        let variant: 'error' | 'success' | 'neutral' = 'error';
        
        if (score === totalQuestions) {
            finalMessage = data.summary.resultMessages.excellent;
            variant = 'success';
        } else if (passed) {
            finalMessage = data.summary.resultMessages.good;
            variant = 'success';
        }

        return (
            <div className="space-y-8 animate-fade-in w-full max-w-3xl mx-auto mt-4">
                <div className={`border rounded-2xl p-6 md:p-10 shadow-2xl bg-[#0F1423]
                    ${passed ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]'}`}
                >
                    <div className="text-center space-y-4 mb-8">
                        <h2 className="text-2xl font-orbitron font-bold text-white">
                            {data.summary.title}
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
                            {score === totalQuestions && data.summary.bonusXp && ` (+${data.summary.bonusXp} Bônus Perfeição)`}
                        </div>
                    )}
                </div>

                <MascotBubble 
                    message={data.summary.mascotMessage} 
                    variant={passed ? 'success' : 'neutral'} 
                    title="Avaliação Final" 
                />
            </div>
        );
    }

    // --- RENDER 3: PERGUNTAS E FEEDBACK (PLAYING & FEEDBACK) ---
    const isFeedback = status === 'FEEDBACK';
    const selectedOptionId = localAnswers[currentQuestion.id];
    const isCorrectAnswer = selectedOptionId === currentQuestion.correctOptionId;

    return (
        <div className="space-y-6 animate-fade-in w-full max-w-3xl mx-auto">
            
            {/* Header da Pergunta */}
            <div className="flex justify-between items-center mb-6">
                <span className="text-cyan-500 font-orbitron text-[10px] md:text-xs uppercase tracking-widest">
                    {data.scenarioName}
                </span>
                <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-mono border border-gray-700">
                    Situação {currentIndex + 1} de {totalQuestions}
                </span>
            </div>

            <div className="bg-[#0F1423] border border-gray-700 rounded-2xl overflow-hidden shadow-xl">
                
                {/* Metadados de Roleplay (Timestamp / Location) */}
                <div className="bg-gray-800/80 border-b border-gray-700 px-4 py-3 flex flex-wrap gap-4 text-xs text-gray-400 font-mono">
                    {currentQuestion.timestamp && (
                        <div className="flex items-center gap-1.5"><Clock size={14} className="text-cyan-500/70" /> {currentQuestion.timestamp}</div>
                    )}
                    {currentQuestion.location && (
                        <div className="flex items-center gap-1.5"><MapPin size={14} className="text-purple-400/70" /> {currentQuestion.location}</div>
                    )}
                </div>

                <div className="p-6 md:p-8 space-y-6">
                    {/* Contexto e Pergunta */}
                    <div className="space-y-4">
                        <p className="text-gray-300 leading-relaxed font-light">{currentQuestion.context}</p>
                        <h3 className="text-lg md:text-xl font-medium text-white">{currentQuestion.question}</h3>
                    </div>

                    {/* Opções */}
                    <div className="space-y-3 pt-4">
                        {currentQuestion.options.map((opt: any) => {
                            const isSelected = selectedOptionId === opt.id;
                            const isCorrect = opt.id === currentQuestion.correctOptionId;
                            
                            // Lógica de cores baseada no estado do jogo
                            let btnStyle = "bg-gray-900 border-gray-700 text-gray-300 hover:border-cyan-500/50 hover:bg-gray-800";
                            
                            if (isFeedback) {
                                if (isCorrect) btnStyle = "bg-green-950/40 border-green-500 text-green-300";
                                else if (isSelected && !isCorrect) btnStyle = "bg-red-950/40 border-red-500 text-red-300 opacity-80";
                                else btnStyle = "bg-gray-900 border-gray-800 text-gray-600 opacity-50 cursor-not-allowed"; // Opções não selecionadas esmaecem
                            } else if (isSelected) {
                                btnStyle = "bg-cyan-950 border-cyan-500 text-cyan-300";
                            }

                            return (
                                <button
                                    key={opt.id}
                                    onClick={() => actions.handleSelectOption(opt.id)}
                                    disabled={isFeedback || isLocked}
                                    className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${btnStyle}`}
                                >
                                    <span className="text-sm md:text-base pr-4">{opt.text}</span>
                                    
                                    {isFeedback && isSelected && isCorrect && <CheckCircle2 size={20} className="text-green-500 shrink-0" />}
                                    {isFeedback && isSelected && !isCorrect && <AlertTriangle size={20} className="text-red-500 shrink-0" />}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer com Feedback Condicional */}
                {isFeedback && (
                    <div className={`p-4 md:p-6 border-t animate-slide-up flex flex-col md:flex-row justify-between items-center gap-4
                        ${isCorrectAnswer ? 'bg-green-950/20 border-green-900/50' : 'bg-red-950/20 border-red-900/50'}`}>
                        
                        <div className="flex-1">
                            <span className={`text-xs uppercase tracking-widest font-bold mb-1 block ${isCorrectAnswer ? 'text-green-500' : 'text-red-500'}`}>
                                {isCorrectAnswer ? 'Decisão Correta' : 'Falha Crítica'}
                            </span>
                            <p className="text-sm text-gray-300">
                                {isCorrectAnswer ? currentQuestion.feedbackSuccess : currentQuestion.feedbackError}
                            </p>
                        </div>

                        <button 
                            onClick={actions.handleNextStep}
                            className="shrink-0 flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors w-full md:w-auto justify-center"
                        >
                            Avançar <ChevronRight size={16} />
                        </button>
                    </div>
                )}
            </div>

            {/* Mascote reage imediatamente à escolha (aparece apenas no estado de feedback) */}
            {isFeedback && currentQuestion.mascotMessage && (
                <MascotBubble 
                    message={currentQuestion.mascotMessage} 
                    variant={isCorrectAnswer ? 'success' : 'neutral'} 
                    title={isCorrectAnswer ? "Bom trabalho" : "Análise do Spy"}
                />
            )}
        </div>
    );
}