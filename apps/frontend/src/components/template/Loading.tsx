'use client'
import { useState, useEffect } from 'react';

export function Loading() {
    const [progress, setProgress] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);

    const statusMessages = [
        "ESTABELECENDO CONEXÃO SEGURA...",
        "SINCRONIZANDO BIOMETRIA DO AGENTE...",
        "DESCRIPTOGRAFANDO PROTOCOLOS DE COMANDO...",
        "CARREGANDO MÓDULOS DE DEFESA...",
        "INICIALIZANDO INTERFACE DE MISSÃO..."
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 99) return 99; // Mantém em 99% até o Suspense desmontar o componente

                // A lógica de incremento simula um carregamento que desacelera (mais realista para fallbacks)
                const remaining = 100 - prev;
                const diff = Math.random() * (remaining * 0.1);
                return Math.min(prev + diff, 99);
            });
        }, 300);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {        
        const step = 100 / statusMessages.length;
        const nextIndex = Math.floor(progress / step);
        if (nextIndex < statusMessages.length && nextIndex !== statusIndex) {
            setStatusIndex(nextIndex);
        }
    }, [progress, statusIndex, statusMessages.length]);

    return (
        <div className="fixed inset-0 bg-[#050810] flex flex-col items-center justify-center z-100 overflow-hidden">     
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-900/40 via-transparent to-transparent"></div>
                <div className="absolute w-full h-px bg-cyan-500/20 top-1/4 animate-pulse"></div>
                <div className="absolute w-full h-px bg-magenta-500/20 top-3/4 animate-pulse delay-700"></div>
            </div>

            <div className="relative flex flex-col items-center">             
                <div className="relative mb-8">
                    <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-ping"></div>
                    <div className="relative w-24 h-24 border-2 border-cyan-400 rounded-full flex items-center justify-center bg-black/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.4)]">
                        <svg className="w-12 h-12 text-cyan-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                        </svg>
                    </div>

                    <div className="absolute inset-[-10px] border-t-2 border-b-2 border-cyan-500/30 rounded-full animate-spin"></div>
                    <div className="absolute inset-[-20px] border-l-2 border-r-2 border-magenta-500/20 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
                </div>

                
                <div className="text-center mb-6 h-16">
                    <h2 className="font-['Orbitron'] text-cyan-400 text-lg tracking-[0.2em] mb-2 drop-shadow-[0_0_5px_rgba(0,255,255,0.8)]">
                        AQUISITANDO DADOS
                    </h2>
                    <p className="text-gray-400 text-xs font-mono uppercase tracking-widest animate-pulse">
                        {statusMessages[statusIndex]}
                    </p>
                </div>

                <div className="w-64 sm:w-80 relative">
                    <div className="flex justify-between mb-2 px-1">
                        <span className="text-[10px] text-cyan-500/70 font-mono">LINK_STATUS: BUSY</span>
                        <span className="text-xs text-cyan-400 font-bold font-['Orbitron']">{Math.round(progress)}%</span>
                    </div>

                    <div className="h-2 w-full bg-black/40 border border-cyan-900/50 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                            className="h-full bg-linear-to-r from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.6)] transition-all duration-500 ease-out relative"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute right-0 top-0 h-full w-4 bg-white/40 blur-sm"></div>
                        </div>
                    </div>

                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-4 border-l border-cyan-500/50"></div>
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-2 h-4 border-r border-cyan-500/50"></div>
                </div>

                <div className="mt-12 flex items-center space-x-2 text-[10px] text-magenta-500/60 font-mono uppercase tracking-[0.3em]">
                    <span className="w-1 h-1 bg-magenta-500 rounded-full animate-ping"></span>
                    <span>Sincronizando com a Central de Comando</span>
                </div>
            </div>
        </div>
    );
};