import { Info, ArrowRight, RotateCcw, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { MascotBubble } from "./engine/MascotBubble";

interface FeedbackDisplayProps {
    feedback: {
        type: 'success' | 'error';
        message: string;
        explanation?: string;
    };
    onContinue: () => void;
    onRetry: () => void;
    isLastBlock: boolean;
}

export function FeedbackDisplay({ feedback, onContinue, onRetry, isLastBlock }: FeedbackDisplayProps) {
    const isSuccess = feedback.type === 'success';

    return (
        <div className="mt-8 space-y-6 pb-6 animate-slide-up">
            <MascotBubble 
                message={feedback.message} 
                variant={feedback.type} 
            />

            {isSuccess && feedback.explanation && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-5 flex gap-4"
                >
                    <div className="shrink-0 mt-1">
                        <Info className="text-indigo-400 w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-indigo-400 font-orbitron text-xs uppercase tracking-widest">
                            Análise Tática
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed font-light">
                            {feedback.explanation}
                        </p>
                    </div>
                </motion.div>
            )}

            <div className="pt-4">
                <button 
                    onClick={isSuccess ? onContinue : onRetry}
                    className={`
                        w-full py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98]
                        cursor-pointer
                        ${isSuccess 
                            ? 'bg-linear-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white shadow-cyan-500/20' 
                            : 'bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700'}
                    `}
                >
                    {isSuccess 
                        ? (isLastBlock ? 'Finalizar Missão' : 'Próximo Protocolo') 
                        : 'Tentar Novamente'
                    }
                    {isSuccess 
                        ? (isLastBlock ? <Rocket size={18} /> : <ArrowRight size={18} />)
                        : <RotateCcw size={18} />
                    }
                </button>
            </div>
        </div>
    );
}