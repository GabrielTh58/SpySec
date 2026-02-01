import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/TypeWriter";
import { X } from "lucide-react";

interface MascotBubbleProps {
    message: string;
    variant?: 'neutral' | 'success' | 'error' | 'hint'; 
    title?: string;
}

export function MascotBubble({ message, variant = 'neutral', title }: MascotBubbleProps) {
    const [isOpen, setIsOpen] = useState(false); // Controle para o modo Hint
    const  mascotName = "Spy"

    if (variant === 'hint') {
        return (
            <div className="relative mt-4 z-10">
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        <motion.button
                            layoutId="mascot-container"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(true)}
                            className="flex items-center gap-3 bg-cyan-950/40 border border-cyan-500/30 rounded-full pr-4 pl-1 py-1 cursor-pointer hover:bg-cyan-900/40 transition-colors group"
                        >
                            <div className="w-12 h-12 rounded-full bg-cyan-900 overflow-hidden border border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                <img src="/Mascot-hint.png" alt="AI" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xs font-orbitron text-cyan-400 uppercase tracking-widest group-hover:text-cyan-300">
                                Dica Tática
                            </span>
                        </motion.button>
                    ) : (
                        <motion.div
                            layoutId="mascot-container"
                            className="bg-blue-950/30 border border-cyan-500/30 rounded-xl p-4 max-w-lg relative backdrop-blur-sm"
                        >
                            <button 
                                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                                className="absolute top-2 right-2 text-cyan-500/50 hover:text-cyan-400"
                            >
                                <X size={14} />
                            </button>
                            
                            <div className="flex gap-4">
                                <div className="shrink-0 w-12 h-12 rounded-full bg-cyan-900 border border-cyan-500/30 overflow-hidden">
                                     <img src="/Mascot-hint.png" alt="AI" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-orbitron text-cyan-500 uppercase tracking-widest mb-1">
                                        {mascotName}
                                    </h4>
                                    <p className="text-sm text-cyan-100/90 font-light leading-snug italic">
                                        "{message}"
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    const styles = {
        neutral: { border: "from-indigo-500 via-purple-500 to-cyan-500", text: "text-indigo-300", arrow: "bg-indigo-500" },
        success: { border: "from-cyan-400 via-teal-400 to-emerald-400", text: "text-cyan-300", arrow: "bg-cyan-400" },
        error: { border: "from-pink-500 via-fuchsia-500 to-purple-600", text: "text-pink-300", arrow: "bg-pink-500" }
    };
    
    const currentStyle = styles[variant as keyof typeof styles] || styles.neutral;
    const isNeutral = variant === 'neutral'
    const isSuccess = variant === 'success'
    const isError = variant === 'error'
    return (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mt-10 w-full">
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative shrink-0"
            >
                <div className={`w-20 h-20 rounded-full p-[2px] bg-linear-to-tr ${currentStyle.border}`}>
                    <div className="w-full h-full bg-gray-900 rounded-full overflow-hidden">
                        {isNeutral ? (
                            <img src="/Mascot.png" alt="AI" className="w-full h-full object-cover animate-float" /> 
                        ) : isSuccess ? (
                            <img src="/Mascot-success.png" alt="AI" className="w-full h-full object-cover" /> 
                        ) : isError ? (
                            <img src="/Mascot-erro.jpeg" alt="AI" className="w-full h-full object-cover" /> 
                        ): ''
                        }
                    </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`relative flex-1 rounded-2xl p-px bg-linear-to-r ${currentStyle.border}`}
            >
                <div className={`absolute top-6 -left-1.5 w-3 h-3 rotate-45 ${currentStyle.arrow}`}></div>
                
                <div className="bg-[#0F1423]/95 backdrop-blur-xl rounded-xl p-6 h-full">
                    <div className="flex items-center gap-2 mb-2">
                         <h4 className={`text-xs font-bold uppercase tracking-[0.2em] font-orbitron ${currentStyle.text} 
                            ${isNeutral && 'text-[10px] text-cyan-500 tracking-widest mb-1' }`}
                            
                        >
                            {title || (variant === 'success' ? 'Análise Correta' : isNeutral ? "Spy" : 'Erro Detectado')}
                        </h4>
                    </div>
                    <div className="text-sm md:text-[15px] leading-relaxed text-gray-300 font-light">
                         {variant === 'neutral' ? <Typewriter text={message} speed={25} /> : message}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}