import { useScenarioQuiz } from "@/data/hooks/useScenarioQuiz";
import { MapPin, Clock, ChevronRight } from "lucide-react";
import { MascotBubble } from "../../../mascot/MascotBubble";
import { ScenarioResults } from "./ScenarioResults";
import { Options } from "./Options";
import { ScenarioQuizData } from "@spysec/education";
import { ScenarioIntroduction } from "./ScenarioIntroduction";

interface ScenarioQuizBlockProps {
    data: ScenarioQuizData; 
    value: Record<string, string>;
    onChange: (val: Record<string, string>) => void;
    isLocked?: boolean;
    onNext: () => void;
}

export function ScenarioQuizBlock({ data, value, onChange, isLocked, onNext }: ScenarioQuizBlockProps) {
    const { 
        status, currentIndex, currentQuestion, totalQuestions, 
        localAnswers, score, passed, actions 
    } = useScenarioQuiz(data, value, onChange, isLocked);

    // --- RENDER 1: TELA DE INTRODUÇÃO ---
    if (status === 'INTRO') return <ScenarioIntroduction data={data} actions={actions}/>    

    // --- RENDER 2: RESUMO FINAL ---
    if (status === 'SUMMARY') {
        const handleFinishScenario = () => { 
            onChange(localAnswers); 
            onNext(); 
        };
        return (
            <ScenarioResults 
                data={data}
                score={score}
                passed={passed}
                totalQuestions={totalQuestions}
                onNext={handleFinishScenario} 
            />
        )
    }   

    // --- RENDER 3: PERGUNTAS E FEEDBACK (PLAYING & FEEDBACK) ---
    if (!currentQuestion) return null;  
    const isFeedback = status === 'FEEDBACK';
    const selectedOptionId = localAnswers[currentQuestion.id];
    const isCorrectAnswer = selectedOptionId === currentQuestion.correctOptionId;
    const hasMetadata = currentQuestion.timestamp || currentQuestion.location;

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
                
                {/* Metadados (Timestamp / Location) */}
                {hasMetadata && (
                    <div className="bg-gray-800/80 border-b border-gray-700 px-4 py-3 flex flex-wrap gap-4 text-xs text-gray-400 font-mono">
                        {currentQuestion.timestamp && (
                            <div className="flex items-center gap-1.5"><Clock size={14} className="text-cyan-500/70" /> {currentQuestion.timestamp}</div>
                        )}
                        {currentQuestion.location && (
                            <div className="flex items-center gap-1.5"><MapPin size={14} className="text-purple-400/70" /> {currentQuestion.location}</div>
                        )}
                    </div>
                )}

                <div className="p-6 md:p-8 space-y-6">
                    {/* Contexto e Pergunta */}
                    <div className="space-y-4">
                        <p className="text-gray-300 leading-relaxed font-light">{currentQuestion.context}</p>
                        <h3 className="text-lg md:text-xl font-medium text-white">{currentQuestion.question}</h3>
                    </div>

                    <Options 
                        currentQuestion={currentQuestion}
                        selectedOptionId={selectedOptionId}
                        actions={actions}
                        isFeedback={isFeedback}
                        isLocked={isLocked ?? false}
                    />
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

            {isFeedback && currentQuestion.mascotMessage && (
                <MascotBubble 
                    message={currentQuestion.mascotMessage} 
                    variant={isCorrectAnswer ? 'success' : 'error'} 
                    title={isCorrectAnswer ? "Bom trabalho" : "Análise do Spy"}
                />
            )}
        </div>
    );
}