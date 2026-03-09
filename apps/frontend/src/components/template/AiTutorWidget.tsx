'use client'
import { useState, useEffect } from "react";
import { ChatWindow } from "../chat/ChatWindow";
import { ButtonChat } from "../chat/ButtonChat";

const TIPS = [
    "Bloqueie a tela antes de sair da mesa. Segundos são suficientes para quem está olhando.",
    "E-mail perfeito, sem erros, pedindo ação urgente. Esse é exatamente o padrão moderno.",
    "O link diz 'empresa.com'. A URL diz 'empresa-security.co'. Só um deles é real.",
    "Verificação em duas etapas no WhatsApp leva 2 minutos. Clonar sua conta, menos.",
    "Pendrive achado é pendrive plantado. Sempre foi.",
    "Wi-Fi com senha não é rede privada para quem já está conectado nela.",
    "Urgência num e-mail existe para impedir que você pense. Funciona.",
    "Seu banco nunca precisa da sua senha para proteger sua conta.",
    "Atualização pendente é vulnerabilidade documentada. Quem adia, anuncia.",
    "Nome do gestor, projeto em andamento, sistema correto. LinkedIn entrega tudo isso de graça.",
    "Deletar o arquivo depois do upload não apaga nada do servidor.",
    "Ligação pedindo para não falar com mais ninguém antes de resolver. Esse é o sinal.",
    "Responder o e-mail suspeito pelo mesmo e-mail não é verificação.",
    "SMS de banco com link. O app do banco mostra o mesmo alerta sem o link.",
    "Dois fatores via SMS depende da operadora. App autenticador depende só de você.",
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
        }, 20000);

        return () => clearInterval(interval);
    }, [isOpen]);

    return (
        <div className="fixed bottom-6 right-6 z-9999 flex flex-col items-end gap-2 font-inter pointer-events-none">
            <div className="pointer-events-auto">
                {isOpen && <ChatWindow />}
            </div>

            {!isOpen && (
                <div 
                    className={`transition-all duration-500 transform origin-bottom-right mb-2 mr-2 pointer-events-auto hidden md:block
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

            <div className="pointer-events-auto">
                <ButtonChat 
                    isOpen={isOpen} 
                    setIsOpen={setIsOpen} 
                    setShowBubble={setShowBubble} 
                />
            </div>
        </div>
    )
}