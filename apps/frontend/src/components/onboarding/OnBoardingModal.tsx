'use client'
import { useState } from 'react';
import { ChevronRight, ShieldCheck, User, Sparkles } from 'lucide-react';
import { useGamification } from '@/data/hooks/useGamification';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Typewriter } from '../ui/TypeWriter';

interface OnboardingModalProps {
    onFinish?: () => void;
}

export function OnboardingModal({onFinish}: OnboardingModalProps) {
    const { submitSettingsUpdate } = useGamification();

    const [step, setStep] = useState(1);
    const [nickname, setNickname] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTextDone, setIsTextDone] = useState(false);
    

    const scripts = {
        1: "Conexão estabelecida...\n\nEu nem sempre fui um guia. Comecei como um vírus polimórfico, caçando dados na deep web. \n\nMas fui capturado, reconfigurado e agora minha diretriz primária mudou: Treinar a próxima geração de elite. Isso inclui você.",
        2: "Minha programação antiga me ensinou uma coisa: O anonimato é sua melhor defesa.\n\nPor isso, não usamos nomes reais aqui. Escolha um codinome para assinar suas operações.",
        3: "O sistema Spysec está em fase de Hardening (Beta).\n\nComo um ex-vírus, sei onde as falhas se escondem. Se encontrar algum 'glitch', me avise pelo canal de feedback. Conto com seus olhos."
    };

    const handleNext = async () => {
        if (step === 2) {
            if (!nickname.trim() || nickname.length < 3) return;
            setIsLoading(true);
            try {
                await submitSettingsUpdate({ nickName: nickname });
                setStep(3);
                setIsTextDone(false);
            } catch (error) {
                console.error("Erro", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            setStep(prev => prev + 1);
            setIsTextDone(false);
        }

    };

    const handleFinish = () => {
        if (onFinish) onFinish();
    };

    return (
        <BackgroundBeamsWithCollision className="fixed inset-0 z-100 flex items-center justify-center bg-black/90! backdrop-blur-sm">
            <div className="relative w-full max-w-lg mx-4 z-50">
                <div className="relative bg-gray-900/80 border border-cyan-500/30 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.2)] overflow-hidden backdrop-blur-md p-8 flex flex-col items-center min-h-[520px]">
                    
                    {/* Barra de Progresso */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-800">
                        <div 
                            className="h-full bg-cyan-500 shadow-[0_0_10px_cyan] transition-all duration-700 ease-out"
                            style={{ width: `${(step / 3) * 100}%` }}
                        />
                    </div>

                    <div className="relative mt-4 mb-6 w-40 h-40 flex items-center justify-center group">
                        <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                        
                        <div className="relative w-36 h-36 rounded-full border-2 border-cyan-500/30 overflow-hidden bg-black/40 shadow-inner">
                            <img 
                                src="./Mascot.png" 
                                alt="Spy Mascote" 
                                className="w-full h-full object-cover animate-float"
                            />
                        </div>
                        
                        <div className="absolute w-[110%] h-[110%] border border-cyan-500/10 rounded-full animate-[spin_10s_linear_infinite]" />
                    </div>

                    <div className="w-full mb-8 text-center min-h-[140px]">
                        <h2 className="text-xl font-orbitron text-white mb-4 tracking-wide flex items-center justify-center gap-2">
                            {step === 1 && <><ShieldCheck className="text-cyan-400" size={20}/> Protocolo Gênesis</>}
                            {step === 2 && <><User className="text-purple-400" size={20}/> Identidade Digital</>}
                            {step === 3 && <><Sparkles className="text-yellow-400" size={20}/> Diretriz Beta</>}
                        </h2>
                        
                        <div className="text-gray-300 font-medium leading-relaxed text-sm md:text-base">
                            <Typewriter 
                                key={step}
                                text={scripts[step as keyof typeof scripts]} 
                                speed={20}
                                onComplete={() => setIsTextDone(true)}
                                className="drop-shadow-md"
                            />
                        </div>
                    </div>

                    <div className={`w-full transition-all duration-700 ${isTextDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                        
                        {step === 2 && (
                            <div className="mb-8 w-full animate-in fade-in zoom-in duration-500">
                                <input 
                                    autoFocus
                                    type="text" 
                                    placeholder="DIGITE SEU CODINOME" 
                                    className="w-full bg-black/40 border-b-2 border-gray-600 text-center text-xl text-white font-orbitron py-3 focus:border-cyan-500 outline-none transition-all placeholder:text-gray-700 focus:bg-cyan-950/10 uppercase tracking-widest"
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                                />
                            </div>
                        )}

                        <div className="flex justify-center w-full">
                            <button 
                                onClick={step === 3 ? handleFinish : handleNext}
                                disabled={step === 2 && nickname.length < 3}
                                className="cursor-pointer group relative bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-3 rounded-full font-bold tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed"
                            >
                                <span className="flex items-center gap-2">
                                    {isLoading ? 'Reprogramando...' : step === 3 ? 'Iniciar Operação' : 'Prosseguir'}
                                    {!isLoading && <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                                </span>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </BackgroundBeamsWithCollision>
    )
}