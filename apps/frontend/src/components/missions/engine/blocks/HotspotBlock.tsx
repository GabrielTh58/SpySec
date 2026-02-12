import { useState, useRef } from "react";
import { Scan, Mail, AlertTriangle, CheckCircle2, MousePointerClick } from "lucide-react";

interface HotspotBlockProps {
    data: any;
    value: string[];
    onChange: (val: string[]) => void;
    isLocked?: boolean; 
}

export function HotspotBlock({ data, isLocked, value = [], onChange }: HotspotBlockProps) {
    const imageRef = useRef<HTMLImageElement>(null);
    const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleImageClick = (e: React.MouseEvent) => {
        if (isLocked || !imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const scaleX = imageRef.current.naturalWidth / rect.width;
        const scaleY = imageRef.current.naturalHeight / rect.height;
        const realX = x * scaleX;
        const realY = y * scaleY;

        checkRegionHit(realX, realY, 'PIXEL');
    };

    const handleOverlayClick = (region: any) => {
        if(isLocked) return
        if (region.isCorrect) {
            if (!value.includes(region.id)) {
                onChange([...value, region.id]);
                setFeedbackMsg({ type: 'success', text: region.feedback });
            }
        } else {
            setFeedbackMsg({ type: 'error', text: region.feedbackError || "Área irrelevante." });
        }
    };

    const checkRegionHit = (x: number, y: number, mode: 'PIXEL' | 'PERCENT') => {
        const hitRegion = data.regions.find((region: any) => {
            const { x: rx, y: ry, w: rw, h: rh } = region.rect;
            return x >= rx && x <= rx + rw && y >= ry && y <= ry + rh;
        });

        if (hitRegion) {
            handleOverlayClick(hitRegion);
        } else {
            setFeedbackMsg({ type: 'error', text: "Nada suspeito aqui..." });
        }
    };

    const renderEmailContext = () => {
        const { sender, subject, body } = data.context;

        return (
            <div className="relative w-full max-w-2xl mx-auto bg-[#0F1423] border border-gray-700 rounded-lg overflow-hidden shadow-2xl
                font-sans text-sm md:text-base"
            >
                <div className="bg-gray-800 border-b border-gray-700 p-3 md:p-4 space-y-2 md:space-y-3">

                    <div className="flex gap-2 items-center">
                        <span className="text-gray-400 w-16 text-right font-medium text-xs uppercase tracking-wide">De:</span>
                        <span className="text-white font-mono bg-gray-900 px-2 py-0.5 rounded border border-gray-700 w-full truncate text-xs md:text-sm">
                            {sender}
                        </span>
                    </div>

                    <div className="flex gap-2 items-center relative">
                        <span className="text-gray-400 w-16 text-right font-medium text-xs uppercase tracking-wide">Para:</span>

                        <div className="flex-1 flex items-center justify-between bg-gray-900 border border-gray-700 rounded px-2 py-0.5 min-h-[28px]">
                            <span className="text-gray-500 text-xs md:text-sm truncate">
                                agente@spisec.com
                            </span>

                            <div className="flex gap-2 text-xs text-gray-500 font-medium select-none shrink-0 pr-1">
                                <span className="hover:text-gray-300">Cc</span>
                                <span className="hover:text-gray-300">Cco</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 items-center">
                        <span className="text-gray-400 w-16 text-right font-medium text-xs uppercase tracking-wide">Assunto:</span>
                        <span className="text-white font-bold truncate text-xs">{subject}</span>
                    </div>
                </div>

                <div className="p-4 md:p-6 font-sm text-gray-300 min-h-[200px] whitespace-pre-wrap leading-relaxed font-light font-sans">
                    {body}
                </div>

                {data.regions.map((region: any) => {
                    const found = value.includes(region.id);
                    return (
                        <div
                            key={region.id}
                            onClick={() => handleOverlayClick(region)}
                            className={`
                            absolute z-20 cursor-pointer transition-all duration-300
                            ${found
                                    ? 'bg-green-500/20 border-2 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                                    : 'hover:bg-white/5'
                                }
                        `}
                            style={{
                                left: `${region.rect.x}%`,
                                top: `${region.rect.y}%`,
                                width: `${region.rect.w}%`,
                                height: `${region.rect.h}%`
                            }}
                        >
                            {found && (
                                <div className="absolute -top-3 -right-3 bg-green-500 text-black rounded-full p-0.5 animate-bounce shadow-lg">
                                    <CheckCircle2 size={14} />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderImageContext = () => (
        <div className="relative inline-block overflow-hidden rounded-xl border-2 border-gray-700 group max-w-full">
            <img
                ref={imageRef}
                src={data.context.image}
                alt="Evidência"
                onClick={handleImageClick}
                className="max-w-full h-auto cursor-crosshair object-contain"
            />
            <div className="absolute top-0 left-0 w-full h-1 bg-cyan-400/50 shadow-[0_0_15px_#22d3ee] animate-[scan_3s_linear_infinite] pointer-events-none opacity-50"></div>
        </div>
    );

    return (    
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="md:text-xl font-medium text-white flex gap-3 font-orbitron">
                    {data.context.type === 'EMAIL'
                        ? <Mail className="text-cyan-500 shrink-0 mt-1" />
                        : <Scan className="text-green-500 shrink-0 mt-1" />
                    }
                    {data.context.type === 'EMAIL' ? 'Interceptação de E-mail' : 'Análise Forense'}
                </h3>

                <div className="flex-col items-center gap-2 px-3 py-1 bg-gray-800 rounded-full border border-gray-700">
                    <span className="text-xs text-gray-400 uppercase tracking-wider">Evidências:</span>
                    <span className="text-xs md:text-sm font-bold text-cyan-400 font-mono">
                        {value.length} / {data.regions.filter((r: any) => r.isCorrect).length}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-4 text-cyan-500/80 animate-pulse">
                <MousePointerClick size={16} />
                <span className="text-xs uppercase tracking-widest font-medium">
                    Clique na área suspeita ou correta
                </span>
            </div>

            <div className="flex justify-center p-2 md:p-6 bg-black/40 rounded-2xl border border-gray-800/50 backdrop-blur-sm">
                {data.context.type === 'EMAIL' ? renderEmailContext() : renderImageContext()}
            </div>

            {feedbackMsg && (
                <div className={`
                    flex items-center justify-center gap-2 p-3 rounded-lg text-sm font-medium animate-slide-up
                    ${feedbackMsg.type === 'success'
                        ? 'bg-green-950/50 text-green-300 border border-green-500/30'
                        : 'bg-red-950/50 text-red-300 border border-red-500/30'}
                `}>
                    {feedbackMsg.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                    {feedbackMsg.text}
                </div>
            )}
        </div>
    );
}