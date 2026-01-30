import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Hexagon, Trophy, X } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface MissionSuccessModalProps {
    xpEarned: number;
    onNextMission: () => void;
    onBackToTrack: () => void;
    hasNextMission: boolean;
}

export function MissionSuccessModal({ xpEarned, onNextMission, onBackToTrack, hasNextMission }: MissionSuccessModalProps) {
    
    // Efeito de Confete (Mantido igual, pois funciona bem)
    useEffect(() => {
        const duration = 3000;
        const end = Date.now() + duration;
        const colors = ['#06b6d4', '#8b5cf6', '#d946ef']; // Cyan, Roxo, Pink Neon

        (function frame() {
            confetti({
                particleCount: 4,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: colors
            });
            confetti({
                particleCount: 4,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: colors
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }, []);

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop Escuro com Blur */}
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-[#050510]/95 backdrop-blur-md"
            />

            <motion.div 
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.6, bounce: 0.4 }}
                className="relative w-full max-w-md bg-[#0F1423] rounded-3xl overflow-hidden border border-cyan-500/30 shadow-[0_0_100px_-20px_rgba(6,182,212,0.3)]"
            >
                {/* --- HEADER VISUAL (Topo do Card) --- */}
                <div className="relative h-32 bg-linear-to-b from-cyan-900/20 to-[#0F1423] flex items-center justify-center overflow-hidden">
                    {/* Elementos Decorativos de Fundo */}
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20" />
                    <div className="absolute top-0 w-full h-px bg-linear-to-r from-transparent via-cyan-500/60 to-transparent" />
                    
                    {/* Círculo de Sucesso Animado */}
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="relative z-10"
                    >
                        <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-50 animate-pulse" />
                        <div className="relative w-24 h-24 rounded-full bg-linear-to-br from-[#0F1423] to-cyan-950 border-2 border-cyan-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                            <CheckCircle2 className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                        </div>
                    </motion.div>
                </div>

                {/* --- CONTEÚDO PRINCIPAL --- */}
                <div className="px-8 pb-8 pt-2 text-center space-y-6">
                    
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold font-orbitron text-white tracking-widest uppercase drop-shadow-lg">
                            Sucesso
                        </h2>
                        <p className="text-slate-400 text-sm font-light leading-relaxed">
                            Protocolo de segurança executado. <br/>
                            Você está um passo mais perto de se tornar um agente de elite.
                        </p>
                    </div>

                    {/* --- CARD DE XP (O Destaque) --- */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="relative group"
                    >
                        {/* Glow Hover Effect */}
                        <div className="absolute -inset-0.5 bg-linear-to-r from-yellow-600 to-orange-600 rounded-2xl opacity-30 blur group-hover:opacity-60 transition duration-500" />
                        
                        <div className="relative bg-[#1a1a2e] border border-yellow-500/20 rounded-xl p-5 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                                    <Trophy className="w-6 h-6 text-yellow-400" />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] text-yellow-500/80 uppercase tracking-widest font-bold">Recompensa</p>
                                    <p className="text-sm text-slate-300">Experiência obtida</p>
                                </div>
                            </div>
                            
                            <div className="text-3xl font-bold text-white font-orbitron tracking-wide drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">
                                +{xpEarned}
                            </div>
                        </div>
                    </motion.div>

                    <div className="space-y-3 pt-2">
                        {hasNextMission ? (
                            <button 
                                onClick={onNextMission}
                                className="group relative w-full overflow-hidden rounded-xl bg-cyan-600 p-4 transition-all cursor-pointer
                                    hover:bg-cyan-500 active:scale-[0.98]"
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                <div className="flex items-center justify-center gap-2 text-white font-bold uppercase tracking-wider text-sm">
                                    Próxima Missão 
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </button>
                        ) : (
                            <div className="w-full p-4 bg-green-950/30 border border-green-500/30 rounded-xl text-green-400 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                                <CheckCircle2 size={18} /> Trilha Finalizada
                            </div>
                        )}

                        <button 
                            onClick={onBackToTrack}
                            className="w-full p-4 text-slate-400 hover:text-white font-medium text-sm transition-colors flex items-center 
                                cursor-pointer justify-center gap-2 hover:bg-white/5 rounded-xl"
                        >
                            <Hexagon size={16} className="rotate-90" />
                            Voltar para a Trilha
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}