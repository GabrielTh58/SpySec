import { motion } from "framer-motion";
import { X } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface BadgeRevealModalProps {
    badge: {
        name: string;
        imageUrl: string;
        description: string;
    };
    onClose: () => void;
}

export function BadgeRevealModal({ badge, onClose }: BadgeRevealModalProps) {
    
    useEffect(() => {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFA500', '#FFFFFF']
        });
    }, []);

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div 
                initial={{ scale: 0.5, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="relative w-full max-w-lg bg-linear-to-b from-gray-900 to-black border border-yellow-500/30 rounded-2xl p-1 
                    shadow-[0_0_100px_rgba(234,179,8,0.2)]"
            >
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
                
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white z-20">
                    <X />
                </button>

                <div className="relative z-10 flex flex-col items-center text-center p-10">
                    
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-yellow-500 font-orbitron text-sm tracking-[0.3em] uppercase mb-8"
                    >
                        Nova Conquista Desbloqueada
                    </motion.div>

                    <div className="relative mb-8 group">
                        <div className="absolute inset-0 bg-yellow-500 blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
                        <motion.img 
                            src={badge.imageUrl} 
                            alt={badge.name}
                            initial={{ scale: 0, rotateY: 180 }}
                            animate={{ scale: 1, rotateY: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
                            className="relative w-48 h-48 object-contain drop-shadow-2xl"
                        />
                    </div>

                    <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-yellow-200 to-yellow-500 mb-4 font-orbitron"
                    >
                        {badge.name}
                    </motion.h2>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-gray-400 max-w-sm leading-relaxed"
                    >
                        {badge.description}
                    </motion.p>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        onClick={onClose}
                        className="mt-8 px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-full shadow-lg shadow-yellow-500/20
                            transition-all hover:scale-105 cursor-pointer"
                    >
                        RESGATAR RECOMPENSA
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
}