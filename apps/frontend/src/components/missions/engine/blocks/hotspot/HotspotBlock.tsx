import { useState } from "react";
import { Mail, AlertTriangle, CheckCircle2, MousePointerClick, Globe, MessageCircle, Lock } from "lucide-react";
import { EmailContext } from "./contexts/EmailContext";
import { BrowserContext } from "./contexts/BrowserContext";
import { ChatContext } from "./contexts/ChatContext";
import { HotspotData } from "@spysec/education";

export type BodyNode = 
  | { type: 'text'; content: string }
  | { type: 'hotspot'; content: string; regionId: string };

interface HotspotBlockProps {
    data: HotspotData; 
    value: string[];
    onChange: (val: string[]) => void;
    isLocked?: boolean; 
}

const ContextRenderers = {
    EMAIL: EmailContext,
    BROWSER: BrowserContext,
    CHAT: ChatContext,
  };
  
export function HotspotBlock({ data, isLocked, value = [], onChange }: HotspotBlockProps) {
    const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // --- FUNÇÕES COMPARTILHADAS DE LÓGICA ---

    const handleHotspotClick = (regionId: string) => {
        if (isLocked) return;

        const region = data.regions.find((r: any) => r.id === regionId);

        if (region) {
            if (region.isCorrect) {
                if (!value.includes(regionId)) {
                    onChange([...value, regionId]);
                    setFeedbackMsg({ type: 'success', text: region.feedback });
                }
            } else {
                setFeedbackMsg({ type: 'error', text: region.feedback || data.feedbackError || "Área irrelevante." });
            }
        } else {
            setFeedbackMsg({ type: 'error', text: data.feedbackError || "Este trecho parece seguro." });
        }
    };

    // Renderiza a AST (BodyNode[]) de forma agnóstica para qualquer contexto
    const renderNodes = (nodes?: BodyNode[]) => {
        if (!nodes || !Array.isArray(nodes)) return null;

        return nodes.map((node, index) => {
            if (node.type === 'text') {
                return <span key={index}>{node.content}</span>;
            }

            if (node.type === 'hotspot') {
                const isSelected = value.includes(node.regionId);
                
                return (
                    <span
                        key={index}
                        onClick={() => handleHotspotClick(node.regionId)}
                        className={`
                            rounded inline transition-colors duration-200
                            ${isSelected 
                                ? "cursor-default bg-green-500/20 text-green-300 font-medium px-1 shadow-[0_0_10px_rgba(34,197,94,0.3)]" 
                                : "cursor-pointer hover:bg-white/10 px-1" 
                            }
                            ${isLocked && !isSelected ? "opacity-60 cursor-not-allowed" : ""}
                        `}
                    >
                        {node.content}
                    </span>
                );
            }
            return null;
        });
    };
    
    // --- FUNÇÕES DE INTERFACE (Ícones e Títulos Dinâmicos) ---

    const getIcon = () => {
        if (data.context.type === 'BROWSER') return <Globe className="text-cyan-500 shrink-0" size={20} />;
        if (data.context.type === 'CHAT') return <MessageCircle className="text-cyan-500 shrink-0" size={20} />;
        return <Mail className="text-cyan-500 shrink-0" size={20} />;
    };

    const getTitle = () => {
        if (data.context.type === 'BROWSER') return 'Inspeção de Página Web';
        if (data.context.type === 'CHAT') return 'Interceptação de Mensagem';
        return 'Análise de E-mail';
    };

    const Renderer = ContextRenderers[data.context.type as keyof typeof ContextRenderers];

    return (    
        <div className="space-y-6 animate-fade-in w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-lg md:text-xl font-medium text-white flex gap-3 font-orbitron items-center">
                    {getIcon()}
                    {getTitle()}
                </h3>

                <div className="flex items-center gap-3 px-3 py-1.5 bg-gray-800 rounded-full border border-gray-700">
                    <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">Ameaças:</span>
                    <span className="text-sm md:text-base font-bold text-cyan-400 font-mono">
                        {value.length} / {data.regions.filter((r: any) => r.isCorrect).length}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-4 text-cyan-500/80 animate-pulse">
                <MousePointerClick size={16} />
                <span className="text-[10px] md:text-xs uppercase tracking-widest font-medium text-center">
                    Toque nas áreas suspeitas para investigar
                </span>
            </div>

            <div className="flex justify-center p-2 md:p-6 bg-black/40 rounded-2xl border border-gray-800/50 backdrop-blur-sm">
                {Renderer ? (
                    <Renderer 
                        data={data} 
                        renderNodes={renderNodes} 
                    />
                ) : (
                    <div className="text-gray-400 italic">Contexto '{data.context.type}' não suportado para renderização.</div>
                )}
            </div>

            {feedbackMsg && (
                <div className={`
                    flex items-center justify-center gap-2 p-3 rounded-lg text-sm font-medium animate-slide-up
                    ${feedbackMsg.type === 'success'
                        ? 'bg-green-950/50 text-green-300 border border-green-500/30'
                        : 'bg-red-950/50 text-red-300 border border-red-500/30'}
                `}>
                    {feedbackMsg.type === 'success' ? <CheckCircle2 size={16} className="shrink-0" /> : <AlertTriangle size={16} className="shrink-0" />}
                    <span className="text-center">{feedbackMsg.text}</span>
                </div>
            )}
        </div>
    );
}