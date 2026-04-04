import { useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "@/components/ui/TypeWriter";
import { SpyComms } from "./SpyComms";

interface MascotBubbleProps {
    message: string;
    variant?: 'default' | 'success' | 'error' | 'comms'; 
    title?: string;
    isSpyAnalyzing?: boolean
}

export function MascotBubble({ message, variant = 'default', title, isSpyAnalyzing }: MascotBubbleProps) {
    const [isOpen, setIsOpen] = useState(false); 

    const isComms =  variant === 'comms'
    const isDefault = variant === 'default'
    const isSuccess = variant === 'success'
    const isError = variant === 'error'

    const styles = {
        default: { border: "from-indigo-500 via-purple-500 to-cyan-500", text: "text-indigo-300", arrow: "bg-indigo-500" },
        success: { border: "from-cyan-400 via-teal-400 to-emerald-400", text: "text-cyan-300", arrow: "bg-cyan-400" },
        error: { border: "from-pink-500 via-fuchsia-500 to-purple-600", text: "text-pink-300", arrow: "bg-pink-500" }
    };
    
    const currentStyle = styles[variant as keyof typeof styles] || styles.default;

    return isComms ?  (
        <SpyComms 
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            message={message}               
            isSpyAnalyzing={isSpyAnalyzing}
        />
    ):(
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mt-10 w-full">
            <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative shrink-0"
            >
                <div className={`w-20 h-20 rounded-full p-[2px] bg-linear-to-tr ${currentStyle.border}`}>
                    <div className="w-full h-full bg-gray-900 rounded-full overflow-hidden">
                        {isDefault ? (
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
                            ${isDefault && 'text-[10px] text-cyan-500 tracking-widest mb-1' }`}
                            
                        >
                            {title || (variant === 'success' ? 'Análise Correta' : isDefault ? "Spy" : 'Erro Detectado')}
                        </h4>
                    </div>
                    <div className="text-sm md:text-[15px] leading-relaxed text-gray-300 font-light">
                        {isSpyAnalyzing ? (
                                <div className="flex items-center gap-1 h-6">
                                    <span className="animate-bounce delay-75">•</span>
                                    <span className="animate-bounce delay-150">•</span>
                                    <span className="animate-bounce delay-300">•</span>
                                    <span className="ml-2 text-sm text-cyan-400 opacity-70">Decifrando você...</span>
                                </div>
                        ) : (
                            <>
                                {variant === 'default' ? <Typewriter text={message} speed={25} /> : message}
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

