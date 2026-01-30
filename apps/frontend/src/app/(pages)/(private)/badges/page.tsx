'use client'
import { useState, useMemo } from "react";
import { Award } from "lucide-react";
import { useGamification } from "@/data/hooks/useGamification";
import { Loading } from "@/components/template/Loading";
import { Rarity } from "@spysec/gamification";
import { BadgeCard } from "@/components/badges/BadgeCard";

export interface UI_Badge {
    id: string;
    title: string;
    description: string;
    iconUrl: string;
    rarity: Rarity;
    isUnlocked: boolean;
    totalRequired?: number;
}

export default function BadgesPage() {
    const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');
    const { profile, allBadges, isLoading } = useGamification();
    
    const processedBadges: UI_Badge[] = useMemo(() => {
        if (!allBadges) return [];

        const earnedIds = new Set(profile?.badges?.map((b: any) => b));
        
        return allBadges.map((badge: any) => {
            const isUnlocked = earnedIds.has(badge.slug);
            
            return {
                id: badge.id,
                title: badge.name,
                description: badge.description,
                iconUrl: badge.iconUrl,
                rarity: badge.rarity || Rarity.COMMON,
                isUnlocked: isUnlocked,
                totalRequired: 1
            };
        });
    }, [allBadges, profile]);

    const filteredBadges = processedBadges.filter(badge => {
        if (filter === 'unlocked') return badge.isUnlocked;
        if (filter === 'locked') return !badge.isUnlocked;
        return true;
    });


    const totalUnlocked = processedBadges.filter(b => b.isUnlocked).length;
    const totalBadges = processedBadges.length;
    const percentage = totalBadges > 0 ? Math.round((totalUnlocked / totalBadges) * 100) : 0;

    if (isLoading) return <Loading />;

    return (
        <div className="flex-1 w-full mx-auto p-4 sm:p-6 md:p-12 animate-fade-in min-h-screen">

            <div className="mb-8 md:mb-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-gray-800 pb-6 gap-6">
                    <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-orbitron text-white mb-3 neon-text-glow flex items-center gap-3">
                            <Award className="text-purple-500 shrink-0" size={32} />
                            Galeria de Conquistas
                        </h2>
                        <p className="text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed">
                            Colecione insígnias exclusivas completando missões e protegendo sua navegação.
                            Cada insígnia desbloqueada aumenta seu nível de autoridade.
                        </p>
                    </div>

                    <div className="bg-gray-900/50 border border-white/10 p-4 rounded-xl backdrop-blur-sm min-w-full sm:min-w-[240px] lg:min-w-[200px]">
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 font-bold">Total Desbloqueado</p>
                        <div className="flex items-end gap-2">
                            <span className="text-3xl font-orbitron text-white">{totalUnlocked}</span>
                            <span className="text-sm text-gray-500 mb-1">/ {totalBadges}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-800 rounded-full mt-2 overflow-hidden">
                            <div
                                className="h-full bg-purple-500 shadow-[0_0_10px_purple] transition-all duration-1000"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 mb-8 items-start sm:items-center justify-between">
                <div className="flex p-1 bg-gray-900/80 rounded-lg border border-white/5 w-full sm:w-auto overflow-x-auto no-scrollbar">
                    <FilterButton active={filter === 'all'} onClick={() => setFilter('all')} label="Todas" />
                    <FilterButton active={filter === 'unlocked'} onClick={() => setFilter('unlocked')} label="Obtidas" />
                    <FilterButton active={filter === 'locked'} onClick={() => setFilter('locked')} label="A Conquistar" />
                </div>

                <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-wider text-gray-500 font-bold">
                    <LegendItem color="bg-slate-400" label="Comum" />
                    <LegendItem color="bg-cyan-400" label="Rara" />
                    <LegendItem color="bg-purple-400" label="Épica" />
                    <LegendItem color="bg-yellow-400" label="Lendária" />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBadges.map((badge) => (
                    <BadgeCard key={badge.id} badge={badge} />
                ))}

                {filteredBadges.length === 0 && (
                    <div className="col-span-full py-20 text-center text-gray-500">
                        <p>Nenhuma conquista encontrada com este filtro.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

function FilterButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 sm:py-1.5 rounded-md text-xs font-bold transition-all whitespace-nowrap flex-1 sm:flex-none ${active
                    ? 'bg-white/10 text-white shadow-sm border border-white/5'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
        >
            {label}
        </button>
    )
}

function LegendItem({ color, label }: { color: string, label: string }) {
    return (
        <span className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${color} shadow-sm`}></span>
            {label}
        </span>
    )
}
