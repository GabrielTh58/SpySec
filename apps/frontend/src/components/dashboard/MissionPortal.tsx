'use client'

import { useState } from "react";
import { motion } from 'framer-motion';
import { ArrowRight, Star, Zap } from "lucide-react";

interface MissionPortalProps {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    estimatedTime?: number;
    xpReward?: number;
    onEnter?: () => void;   
    className?: string;
}

export function MissionPortal(props: MissionPortalProps) {
    const { title, subtitle, ctaText, estimatedTime = 3, xpReward, onEnter, className } = props

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`
                "relative w-full max-w-3xl overflow-hidden rounded-xl bg-[#08081a] neon-glow-cyan bg-linear-to-br from-cyan-900/10 to-transparent 
                border border-cyan-500/30 transition-all duration-500 ease-out shadow-[0_0_20px_-5px_rgba(8,145,178,0.3)],
                ${isHovered ? "shadow-[0_0_50px_-10px_rgba(6,182,212,0.5)] border-cyan-400/60 scale-[1.01]" : ""},
                ${className}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >

            <div className="relative z-10 flex flex-col md:flex-row items-center p-6 md:p-8 gap-8">

                <div className="relative flex items-center justify-center shrink-0 w-32 h-32 md:w-40 md:h-40">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30"
                    />

                    <motion.div
                        animate={{ rotate: -360, scale: isHovered ? 1.1 : 1 }}
                        transition={{ rotate: { duration: 8, repeat: Infinity, ease: "linear" }, scale: { duration: 0.3 } }}
                        className="absolute inset-2 rounded-full border-2 border-transparent border-t-cyan-400 border-l-cyan-400/50 opacity-80 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                    />
                    <motion.div
                        animate={{ rotate: 360, scale: isHovered ? 1.1 : 1 }}
                        transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, scale: { duration: 0.3 } }}
                        className="absolute inset-4 rounded-full border-2 border-transparent border-b-purple-500 border-r-purple-500/50 opacity-80"
                    />

                    <div className="absolute inset-0 m-auto w-20 h-20 rounded-full overflow-hidden">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.9, 0.6] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full h-full bg-linear-to-tr from-cyan-600 to-purple-600 blur-lg"
                        />
                    </div>

                    <div className="relative z-20 flex items-center justify-center w-16 h-16 rounded-full bg-[#0a0a1a] border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)] backdrop-blur-sm">
                        <Zap 
                            className={`w-8 h-8 text-cyan-400 fill-cyan-400/20 transition-all duration-300", 
                            ${isHovered ? "text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" : ""}`}
                        />
                    </div>

                    <motion.div
                        className="absolute -top-2 -right-2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]"
                        animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>

                <div className="flex-1 w-full text-center md:text-left space-y-3">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-mono uppercase tracking-wider">
                        <span className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800 text-cyan-300 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse font-orbitron" /> 
                            {estimatedTime} min 
                        </span>
                        <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800 text-purple-300 flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current font-orbitron" /> 
                            {xpReward} XP
                        </span>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wide font-orbitron drop-shadow-md group-hover:text-cyan-50">
                            {title}
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed font-inter">
                            {subtitle}
                        </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                        <motion.button
                            onClick={onEnter}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="relative group/btn w-full sm:w-auto overflow-hidden rounded px-8 py-3 bg-cyan-950 text-cyan-300 border border-cyan-500/50 font-bold uppercase tracking-wider text-sm transition-all hover:bg-cyan-600 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {ctaText} <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                            </span>

                            <motion.div
                                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.5 }}
                            />
                        </motion.button>

                        <span className="hidden sm:block text-slate-600 text-xs font-inter">
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}