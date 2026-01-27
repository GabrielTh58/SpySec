'use client'
import { useState, useEffect } from "react";
import { ChatWindow } from "../chat/ChatWindow";
import { ButtonChat } from "../chat/ButtonChat";

const TIPS = [
    "Vai pegar café? Bloqueie a tela (Win + L). Espiões amam telas abertas.",
    "Recebeu um e-mail urgente do 'CEO' pedindo pix? Desconfie. É golpe.",
    "Nunca conecte um pendrive achado no estacionamento. É uma armadilha clássica.",
    "Wi-Fi do aeroporto/café? Só use com a VPN da empresa ligada.",
    "Classifique seus arquivos. Nem tudo deve ser público na rede da empresa.",
    
    "Sua senha é '123456' ou sua data de aniversário? Mude agora.",
    "O banco NUNCA liga pedindo sua senha ou código do token.",
    "Passe o mouse sobre o link antes de clicar. O texto mente, a URL não.",
    "Ative a verificação em duas etapas (2FA) no WhatsApp e Instagram.",
    "Promoção boa demais para ser verdade no Instagram? Provavelmente é golpe.",
    "Atualizações do Windows/Celular corrigem falhas de segurança. Não adie.",
    "Compras online? Verifique se o site tem o cadeado (HTTPS) e reputação."
];

export function AiTutorWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentTip, setCurrentTip] = useState(TIPS[0]);
    const [showBubble, setShowBubble] = useState(true);

    useEffect(() => {
        if (isOpen) {
            setShowBubble(false);
            return;
        }

        const interval = setInterval(() => {
            const randomTip = TIPS[Math.floor(Math.random() * TIPS.length)];
            setCurrentTip(randomTip);
            setShowBubble(true);
            setTimeout(() => setShowBubble(false), 5000);
        }, 15000);

        return () => clearInterval(interval);
    }, [isOpen]);

    return (
        <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end gap-2 font-inter">
            {isOpen && <ChatWindow />}
            {!isOpen && (
                <div 
                    className={`transition-all duration-500 transform origin-bottom-right mb-2 mr-2
                        ${showBubble ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 pointer-events-none'}
                    `}
                >
                    <div className="bg-slate-900 border border-cyan-500/30 p-3 rounded-t-xl rounded-bl-xl rounded-br-none shadow-lg max-w-[200px] relative">
                        <p className="text-[10px] text-cyan-300 font-mono leading-tight">
                            <span className="text-purple-400 font-bold mr-1">{">"}</span>
                            {currentTip}
                        </p>
                        <div className="absolute -bottom-2 right-3 w-3 h-3 bg-slate-900 border-r border-b border-cyan-500/30 transform rotate-45"></div>
                    </div>
                </div>
            )}

            <ButtonChat 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                setShowBubble={setShowBubble} 
            />
        </div>
    )
}