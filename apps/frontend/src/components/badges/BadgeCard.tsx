import { UI_Badge } from "@/app/(pages)/(private)/badges/page";
import { Lock } from "lucide-react";

export function BadgeCard({ badge }: { badge: UI_Badge }) {
    const VARIANTS: Record<string, any> = {
        COMMON: {
            border: 'border-slate-500/50', 
            text: 'text-slate-300',
            bg: 'bg-slate-500/10',
            glow: 'shadow-[0_0_15px_rgba(148,163,184,0.15)]',
            hoverBorder: 'hover:border-slate-500/60',
            hoverText: 'group-hover:text-slate-300',
            hoverGlow: 'hover:shadow-[0_0_20px_rgba(148,163,184,0.2)]'
        },
        RARE: {
            border: 'border-cyan-500/50',
            text: 'text-cyan-400',
            bg: 'bg-cyan-500/10',
            glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]',
            hoverBorder: 'hover:border-cyan-500/60',
            hoverText: 'group-hover:text-cyan-400',
            hoverGlow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]'
        },
        EPIC: {
            border: 'border-purple-500/50',
            text: 'text-purple-400',
            bg: 'bg-purple-500/10',
            glow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]',
            hoverBorder: 'hover:border-purple-500/60',
            hoverText: 'group-hover:text-purple-400',
            hoverGlow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]'
        },
        LEGENDARY: {
            border: 'border-yellow-500/50',
            text: 'text-yellow-400',
            bg: 'bg-yellow-500/10',
            glow: 'shadow-[0_0_20px_rgba(234,179,8,0.25)]',
            hoverBorder: 'hover:border-yellow-500/60',
            hoverText: 'group-hover:text-yellow-400',
            hoverGlow: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]'
        }
    };

    const rarityKey = badge.rarity ? badge.rarity.toUpperCase() : 'COMMON';
    const variant = VARIANTS[rarityKey] || VARIANTS.COMMON;

    const containerClasses = badge.isUnlocked
        ? `border ${variant.border} bg-gray-900/60 backdrop-blur-md ${variant.glow}`
        : `border border border-gray-800 bg-slate-950/80 hover:bg-gray-900 transition-all duration-300 ${variant.hoverBorder} ${variant.hoverGlow}`;

    return (
        <div className={`
            relative group flex flex-col p-6 rounded-2xl 
            min-h-[260px] hover:-translate-y-1 transition-transform duration-300
            ${containerClasses}
        `}>
            {!badge.isUnlocked && (
                <div className="absolute top-4 right-4 text-gray-600 group-hover:text-gray-500 transition-colors z-10">
                    <Lock size={16} />
                </div>
            )}

            <div className={`
                w-20 h-20 rounded-full flex items-center justify-center mb-5 mx-auto relative
                transition-all duration-300
                ${badge.isUnlocked ? variant.bg : 'bg-gray-900 border border-gray-800'}
                ${badge.isUnlocked ? 'ring-1 ring-white/10' : ''}
            `}>
                <img 
                    src={badge.iconUrl} 
                    alt={badge.title} 
                    className={`w-12 h-12 object-contain drop-shadow-md transition-all duration-500
                        ${!badge.isUnlocked ? 'grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-80' : ''}
                    `} 
                />
            </div>

            <div className="text-center mb-3">
                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block transition-colors duration-300
                    ${badge.isUnlocked 
                        ? variant.text 
                        : `text-gray-600 ${variant.hoverText}` 
                    }`}>
                    {badge.rarity}
                </span>
                
                <h3 className={`font-orbitron text-lg font-bold leading-tight transition-colors duration-300
                    ${badge.isUnlocked ? 'text-white' : 'text-gray-500 group-hover:text-gray-200'}`}>
                    {badge.title}
                </h3>
            </div>

            <p className="text-xs text-gray-500 text-center leading-relaxed font-inter line-clamp-3">
                {badge.description}
            </p>

            {/* Efeito Glow Background (Apenas se desbloqueado, para não poluir o hover do bloqueado) */}
            {badge.isUnlocked && (
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-5 pointer-events-none ${variant.bg.replace('/10', '/30')} blur-xl transition-opacity duration-500`} />
            )}
        </div>
    )
}