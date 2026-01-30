import { useState, useMemo } from "react";
import { ArrowRightLeft } from "lucide-react";

interface MatchingBlockProps {
    data: any;
    value: any; 
    onChange: (val: any) => void;
    isLocked: boolean;
}
    
const PAIR_COLORS = [
    { border: "border-cyan-500", bg: "bg-cyan-500/20", text: "text-cyan-200", indicator: "bg-cyan-500" },
    { border: "border-purple-500", bg: "bg-purple-500/20", text: "text-purple-200", indicator: "bg-purple-500" },
    { border: "border-orange-500", bg: "bg-orange-500/20", text: "text-orange-200", indicator: "bg-orange-500" },
    { border: "border-green-500", bg: "bg-green-500/20", text: "text-green-200", indicator: "bg-green-500" },
    { border: "border-pink-500", bg: "bg-pink-500/20", text: "text-pink-200", indicator: "bg-pink-500" },
];

export function MatchingBlock({ data, isLocked, value = {}, onChange }: MatchingBlockProps) {
    const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
    
    const rightColumnItems = useMemo(() => {
        return [...data.pairs].sort(() => Math.random() - 0.5);
    }, [data.pairs]);

    const getConnectionIndex = (leftId: string) => {
        return data.pairs.findIndex((p: any) => p.leftId === leftId);
    };

    const handleLeftClick = (id: string) => {
        if (isLocked) return;
        if (selectedLeft === id) {
            setSelectedLeft(null);
        } else {
            setSelectedLeft(id);
        }
    };

    const handleRightClick = (rightId: string) => {
        if (isLocked || !selectedLeft) return;

        if (value[selectedLeft] === rightId) {
            const newConnections = { ...value };
            delete newConnections[selectedLeft]; 
            onChange(newConnections);
            setSelectedLeft(null); 
            return;
        }

        const existingOwner = Object.keys(value).find(key => value[key] === rightId);
        
        let newConnections = { ...value };

        if (existingOwner) {
            delete newConnections[existingOwner];
        }
        newConnections[selectedLeft] = rightId;
        
        onChange(newConnections);
        setSelectedLeft(null);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            <h3 className="text-xl font-medium text-white flex gap-3 font-orbitron">
                <ArrowRightLeft className="text-cyan-500 shrink-0 mt-1" />
                {data.question}
            </h3>

            <div className="grid grid-cols-2 gap-4 md:gap-16 relative">
                
                <div className="space-y-4">
                    {data.pairs.map((pair: any, index: number) => {
                        const isSelected = selectedLeft === pair.leftId;
                        const connectedRightId = value[pair.leftId];
                        const isConnected = !!connectedRightId;
                        
                        const colorTheme = PAIR_COLORS[index % PAIR_COLORS.length];
                        
                        let cardStyle = "border-gray-700 bg-[#0F1423] text-gray-400 hover:border-gray-500 cursor-pointer"; 
                        let indicatorStyle = "border-gray-600 bg-transparent";

                        if (isSelected) {
                            cardStyle = "border-white bg-gray-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] scale-[1.02] z-10";
                            indicatorStyle = "border-white bg-white animate-pulse";
                        } else if (isConnected) {
                            cardStyle = `${colorTheme.border} ${colorTheme.bg} ${colorTheme.text}`;
                            indicatorStyle = `border-transparent ${colorTheme.indicator} shadow-[0_0_10px_currentColor]`;
                        }

                        return (
                            <button
                                key={pair.leftId}
                                onClick={() => handleLeftClick(pair.leftId)}
                                className={`
                                    w-full p-4 rounded-xl border-2 text-left text-sm md:text-base transition-all duration-200 relative group
                                    flex items-center justify-between
                                    ${cardStyle}
                                `}
                            >
                                <span className="font-mono z-10">{pair.leftText}</span>
                                
                                {isConnected && (
                                    <span className="absolute -left-3 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-gray-900 border border-gray-700 px-1.5 rounded text-gray-400 shadow-md">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                )}
                                <div className={`w-3 h-3 rounded-full border-2 ${indicatorStyle}`}></div>
                            </button>
                        );
                    })}
                </div>

                <div className="space-y-4">
                    {rightColumnItems.map((pair: any) => {
                        const connectedLeftId = Object.keys(value).find(key => value[key] === pair.rightId);
                        const isConnected = !!connectedLeftId;
                        
                        const leftIndex = connectedLeftId ? getConnectionIndex(connectedLeftId) : -1;
                        const colorTheme = leftIndex >= 0 ? PAIR_COLORS[leftIndex % PAIR_COLORS.length] : null;

                        const isLinkedToSelection = selectedLeft && value[selectedLeft] === pair.rightId;

                        let cardStyle = "border-gray-800 bg-[#0F1423]/50 text-gray-600 cursor-not-allowed"; 
                        let indicatorStyle = "border-gray-800 bg-transparent";

                        if (selectedLeft) {
                            if (isLinkedToSelection) {
                                cardStyle = "border-red-500/50 bg-red-900/10 text-red-200 hover:bg-red-900/20 cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.1)]";
                                indicatorStyle = "border-red-500 bg-red-500 animate-pulse";
                            } else {
                                cardStyle = "border-gray-600 bg-[#0F1423] text-gray-300 hover:border-white hover:text-white cursor-pointer border-dashed";
                            }
                            
                            if (isConnected && !isLinkedToSelection) {
                                cardStyle = "border-gray-700 bg-gray-900 text-gray-500 hover:border-orange-500/50 hover:text-orange-200 cursor-pointer";
                            }
                        } 
                        
                        if (isConnected && !selectedLeft) {
                            if (colorTheme) {
                                cardStyle = `${colorTheme.border} ${colorTheme.bg} ${colorTheme.text}`;
                                indicatorStyle = `border-transparent ${colorTheme.indicator} shadow-[0_0_10px_currentColor]`;
                            }
                        }

                        return (
                            <button
                                key={pair.rightId}
                                onClick={() => handleRightClick(pair.rightId)}
                                disabled={!selectedLeft && !isConnected} 
                                className={`
                                    w-full p-4 rounded-xl border-2 text-left text-sm md:text-base transition-all duration-200 relative group
                                    flex items-center gap-4 cursor-p
                                    ${cardStyle}
                                `}
                            >
                                {/* Ponto de Conexão */}
                                <div className={`w-3 h-3 rounded-full border-2 shrink-0 ${indicatorStyle}`}></div>

                                <span className="font-mono">{pair.rightText}</span>

                                {isConnected && leftIndex >= 0 && (
                                    <span className="absolute -right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold bg-gray-900 border border-gray-700 px-1.5 rounded text-gray-400 shadow-md">
                                        {String.fromCharCode(65 + leftIndex)}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}