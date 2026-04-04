import { Typewriter } from "@/components/ui/TypeWriter";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquareWarning, X } from "lucide-react";

export interface SpyCommsProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    message: string;
    isSpyAnalyzing?: boolean
}

export function SpyComms(props: SpyCommsProps){
    const {isOpen, setIsOpen, message, isSpyAnalyzing }  = props
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
                        <MessageSquareWarning size={14} className="text-purple-400 group-hover:text-purple-300" />
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
                                {mascotName}:
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