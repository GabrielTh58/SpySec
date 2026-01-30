import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Info, BookOpen, Terminal, Sparkles, Brain } from "lucide-react";
import { MascotBubble } from "../MascotBubble";

interface InfoBlockData {
    title?: string;
    text: string;
    highlightBox?: string;
    deepDive?: string;
    mascotMessage?: string;
    image?: string; 
    imageCaption?: string;
}

interface InfoBlockProps {
    data: InfoBlockData;
}

export function InfoBlock({ data }: InfoBlockProps) {
    const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);

    return (
        <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
            
            {data.title && (
                <div className="flex items-center gap-4 mb-6 border-b border-cyan-500/30 pb-4">
                    <div className="bg-cyan-950/40 p-2 rounded-lg border border-cyan-500/20">
                        <BookOpen className="text-cyan-400 w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-orbitron text-transparent bg-clip-text bg-linear-to-r from-cyan-100 to-cyan-500 tracking-wide font-bold">
                        {data.title}
                    </h3>
                </div>
            )}

            <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line font-light tracking-wide">
                    {data.text}
                </p>
            </div>

            {data.image && (
                <div className="relative group rounded-xl overflow-hidden border border-gray-700 bg-black/40">
                    <div className="absolute inset-0 bg-[url('/scanline.png')] opacity-10 pointer-events-none z-10"></div>
                    <img 
                        src={data.image} 
                        alt={data.imageCaption || "Ilustração tática"} 
                        className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    {data.imageCaption && (
                        <div className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-sm p-2 text-center border-t border-gray-700">
                            <span className="text-xs text-gray-400 font-mono uppercase">{data.imageCaption}</span>
                        </div>
                    )}
                </div>
            )}

            {data.highlightBox && (
                <div className="relative group overflow-hidden rounded-xl border-l-4 border-l-cyan-500 bg-[#0a0f1e] border border-cyan-500/30 p-6">
                    <div className="flex gap-4 relative z-10">
                        <div className="shrink-0 mt-1">
                            <Terminal size={20} className="text-cyan-400" />
                        </div>
                        <div>                          
                            <p className="text-cyan-100/90 font-medium text-base italic leading-relaxed">
                                {data.highlightBox}
                            </p>
                        </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none"></div>
                </div>
            )}

            {data.deepDive && (
                <div className="border border-indigo-500/20 rounded-xl bg-indigo-950/5 overflow-hidden">
                    <button 
                        onClick={() => setIsDeepDiveOpen(!isDeepDiveOpen)}
                        className="w-full flex items-center justify-between p-4 hover:bg-indigo-950/20 transition-colors group cursor-pointer   "
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-indigo-500/10 p-2 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                                <Sparkles size={18} className="text-indigo-400" />
                            </div>
                            <div className="text-left">
                                <span className="block text-[10px] font-orbitron text-indigo-400/70 uppercase tracking-widest">
                                    Conteúdo Extra
                                </span>
                                <span className="text-indigo-100 font-bold group-hover:text-white transition-colors">
                                    Aprofundar Conhecimento
                                </span>
                            </div>
                        </div>
                        <motion.div
                            animate={{ rotate: isDeepDiveOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown className="text-indigo-400" />
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {isDeepDiveOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="p-6 pt-0 border-t border-indigo-500/20 bg-indigo-950/15">
                                    <div className="mt-4 prose prose-invert prose-sm text-indigo-100/80 leading-relaxed font-mono rounded-lg">
                                        {data.deepDive}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}