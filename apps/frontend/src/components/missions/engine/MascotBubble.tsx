import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "@/components/ui/TypeWriter";
import { MessageSquareWarning, X } from "lucide-react";

interface MascotBubbleProps {
    message: string;
    variant?: 'neutral' | 'success' | 'error' | 'comms'; 
    title?: string;
}

export function MascotBubble({ message, variant = 'neutral', title }: MascotBubbleProps) {
    const [isOpen, setIsOpen] = useState(false); 
    const isComms =  variant === 'comms'

    const styles = {
        neutral: { border: "from-indigo-500 via-purple-500 to-cyan-500", text: "text-indigo-300", arrow: "bg-indigo-500" },
        success: { border: "from-cyan-400 via-teal-400 to-emerald-400", text: "text-cyan-300", arrow: "bg-cyan-400" },
        error: { border: "from-pink-500 via-fuchsia-500 to-purple-600", text: "text-pink-300", arrow: "bg-pink-500" }
    };
    
    const currentStyle = styles[variant as keyof typeof styles] || styles.neutral;
    const isNeutral = variant === 'neutral'
    const isSuccess = variant === 'success'
    const isError = variant === 'error'

    return isComms ?  (
        <SpyComms 
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                message={message}               
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

interface SpyCommsProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    message: string;
}

function SpyComms(props: SpyCommsProps){
    const {isOpen, setIsOpen, message} = props
    const mascotName = "Spy"

    return(
        <div className="relative mt-6 z-10 flex justify-end w-full">
        <AnimatePresence mode="wait">
            {!isOpen ? (
                <motion.button
                    layoutId="mascot-provocative-container" 
                    initial={{ scale: 0, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-3 bg-purple-950/40 border border-purple-500/30 rounded-full pr-4 cursor-pointer
                  hover:bg-purple-900/50 transition-colors group shadow-lg"
                >
                    <div className="w-10 h-10 rounded-full bg-purple-900/80 overflow-hidden border border-purple-500/50 
                        shadow-[0_0_10px_rgba(168,85,247,0.3)] shrink-0"
                    >
                        <img src="/Mascot-comms.png" alt="AI" className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <MessageSquareWarning    size={14} className="text-purple-400 group-hover:text-purple-300" />
                        <span className="text-[10px] md:text-xs font-orbitron text-purple-300 uppercase tracking-widest group-hover:text-purple-200">
                            {mascotName}
                        </span>
                    </div>
                </motion.button>
            ) : (
                <motion.div
                    layoutId="mascot-provocative-container"
                    className="bg-[#120f1a]/90 border border-purple-500/40 rounded-2xl rounded-tr-sm p-5 max-w-md relative backdrop-blur-md 
                        shadow-[0_10px_30px_rgba(168,85,247,0.1)]"
                >
                    <button 
                        onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                        className="absolute top-2 right-2 text-purple-500/50 hover:text-purple-400 transition-colors bg-purple-950/30 rounded-full p-1"
                    >
                        <X size={14} />
                    </button>
                    
                    <div className="flex gap-4">
                        <div className="shrink-0 w-12 h-12 rounded-full bg-purple-900 border border-purple-500/50 overflow-hidden 
                            shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                        >
                             <img src="/Mascot.png" alt="AI" className="w-full h-full object-cover" />
                        </div>
                        <div className="pt-1">
                            <h4 className="text-[10px] font-orbitron text-purple-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                                {mascotName} diz:
                            </h4>
                            <div className="text-sm md:text-[15px] text-gray-300 font-light leading-relaxed">
                                "<Typewriter text={message} speed={30} />"
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
    )
}