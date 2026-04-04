import { ActionsQuiz } from "@/data/hooks/useScenarioQuiz";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface OptionsProps{
    actions: ActionsQuiz
    currentQuestion: any
    selectedOptionId: string
    isFeedback: boolean;
    isLocked: boolean;
}

export function Options({currentQuestion, isFeedback, selectedOptionId, actions, isLocked}: OptionsProps) {
    return (
        <div className="space-y-3 pt-4">
            {currentQuestion.options.map((opt: any) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrect = opt.id === currentQuestion.correctOptionId;

                let btnStyle = "bg-gray-900 border-gray-700 text-gray-300 hover:border-cyan-500/50 hover:bg-gray-800";

                if (isFeedback) {
                    if (isCorrect) btnStyle = "bg-green-950/40 border-green-500 text-green-300";
                    else if (isSelected && !isCorrect) btnStyle = "bg-red-950/40 border-red-500 text-red-300 opacity-80";
                    else btnStyle = "bg-gray-900 border-gray-800 text-gray-600 opacity-50 cursor-not-allowed"; 
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
    )
}