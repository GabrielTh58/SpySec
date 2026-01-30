'use client'
import { AchievementBadge } from "@/components/dashboard/AchievementBadge";
import { GlassCard } from "@/components/dashboard/GlassCard";
import { MissionPortal } from "@/components/dashboard/MissionPortal";
import { RankingItem } from "@/components/dashboard/RankingItem";
import { SecurityGoalsWidget } from "@/components/dashboard/SecurityGoalsWidget";
import { ThreatRadarWidget } from "@/components/dashboard/ThreatRadarWidget";
import { Background } from "@/components/template/Background";
import { Loading } from "@/components/template/Loading";
import { useEducation } from "@/data/hooks/useEducation";
import { useGamification } from "@/data/hooks/useGamification";
import { formatStudyTime } from "@/data/utils/formatDate";
import { Award, ChartNoAxesColumnIncreasing, ChevronUp, Clock, Lock, Shield, Trophy, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { profile, isLoading, ranking, allBadges } = useGamification()
    
    const { progress  } = useEducation()
    const studyTime = formatStudyTime(profile?.totalStudySeconds || 0);
    const router = useRouter()

    if (isLoading) return <Loading />

    const recentBadges = profile?.badges.slice(-5).reverse() || [];
    const hasActiveMission = !!progress?.nextMission;
    
    const portalData = hasActiveMission ? {
        title: progress?.nextMission?.title,
        subtitle: `Continuar Trilha: ${progress?.nextMission?.description}`,
        cta: "Continuar Missão",
        targetUrl: `/missions/${progress?.nextMission?.id}`
    } : {
        title: "Iniciar Nova Operação",
        subtitle: "Nenhuma missão ativa no momento. Escolha uma nova trilha para começar.",
        cta: "Explorar Trilhas",
        targetUrl: "/tracks"
    };

    const handlePortalEnter = () => {
        setTimeout(() => {
            router.push(portalData.targetUrl);
        }, 1000);
    };

    return (
        <div className="flex-1 overflow-y-auto sm:p-8 scroll-smooth">
            <Background />
            <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1440px] mx-auto">
                <MissionPortal
                    title={portalData.title}
                    subtitle={portalData.subtitle}
                    ctaText={portalData.cta}
                    xpReward={hasActiveMission ? progress.nextMission?.xpReward : 100}
                    onEnter={handlePortalEnter}
                    className="md:col-span-2 lg:col-span-2 lg:row-span-2"
                />

                <GlassCard className="flex flex-col justify-between" hoverEffect>
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-400 font-medium font-orbitron text-sm">Progresso</h3>
                        <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                            <ChartNoAxesColumnIncreasing size={18} />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold font-orbitron text-cyan-400 mt-2 neon-text-cyan">{progress?.globalProgressPercent}%</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <ChevronUp size={12} className="text-green-500" /> {progress?.monthlyGrowth}% este mês
                        </p>
                    </div>
                </GlassCard>

                <GlassCard className="flex flex-col justify-between" hoverEffect>
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-400 font-medium font-orbitron text-sm">Missões Concluídas</h3>
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                            <Shield size={18} />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold font-orbitron text-purple-400 mt-2 neon-text-magenta">{progress?.completedTracksCount}</p>
                        <p className="text-xs text-gray-500 mt-1">Missões Práticas</p>
                    </div>
                </GlassCard>

                <GlassCard className="flex flex-col justify-between" hoverEffect>
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-400 font-medium text-sm font-orbitron">Tempo de Estudo</h3>
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                            <Clock size={18} />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold font-orbitron text-white mt-2">
                            {studyTime.hours}<span className="text-xl text-gray-500">h</span>
                            {studyTime.minutes}<span className="text-xl text-gray-500">m</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Total na plataforma</p>
                    </div>
                </GlassCard>

                <GlassCard className="flex flex-col justify-between" hoverEffect>
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-400 font-medium text-sm font-orbitron">Sequência</h3>
                        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                            <Zap size={18} />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold font-orbitron text-orange-400 mt-2">{profile?.streak}</p>
                        <p className="text-xs text-gray-500 mt-1">Dias consecutivos</p>
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 col-span-1 md:col-span-2 max-w-[1440px] mx-auto lg:col-span-4 mt-7">
                <GlassCard className="md:col-span-1 flex flex-col border border-purple-500/20 h-full">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-orbitron text-lg text-purple-400 flex items-center gap-2 neon-text-magenta">
                            <Trophy size={18} />
                            Top Agentes
                        </h3>
                    </div>

                    <div className="flex-1 space-y-1 overflow-y-auto max-h-[260px] custom-scrollbar pr-1">
                        {ranking.map((player, index) => (
                            <RankingItem
                                key={player.nickname}
                                rank={index + 1}
                                name={player.nickname}
                                xp={player.currentXp}
                                change="none"
                            />
                        ))}
                    </div>

                    {!ranking.find(r => r.nickname === profile?.nickname) && (
                        <div className="mt-auto pt-4 border-t border-white/10">
                            <div className="bg-cyan-500/10 rounded p-2 flex items-center justify-between border border-cyan-500/30">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-cyan-400 text-sm">
                                        #{profile?.rankingPosition || '-'}
                                    </span>
                                    <span className="text-xs font-semibold">Você</span>
                                </div>
                                <span className="text-xs text-cyan-300">{profile?.currentXp} XP</span>
                            </div>
                        </div>
                    )}
                </GlassCard>

                <GlassCard className="md:col-span-2 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-orbitron text-lg text-white flex items-center gap-2">
                            <Award className="text-yellow-400" size={20} />
                            Central de Conquistas
                        </h3>
                        <Link
                            href='/badges'
                            className="text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors uppercase font-bold tracking-wider border border-cyan-500/30 px-2 py-1 rounded hover:bg-cyan-500/10"
                        >
                            Ver todas
                        </Link> 
                    </div>

                    <div className="flex-1 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-1 max-h-[300px]">
                        <div>
                            <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest mb-3 pl-1 border-l-2 border-cyan-500">
                                Adquiridas
                            </p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                {recentBadges.map((badgeSlug) => {
                                    const badgeDetails = allBadges.find(b => b.slug === badgeSlug);
                                    if (!badgeDetails) return null;
                                    return (
                                        <AchievementBadge
                                            key={badgeSlug}
                                            icon={badgeDetails.iconUrl} 
                                            title={badgeDetails.name}
                                            subtitle="Conquistado"
                                        />
                                    );
                                })}
                                {recentBadges.length === 0 && (
                                    <div className="col-span-full text-gray-600 text-xs italic py-2">
                                        Nenhuma conquista desbloqueada ainda.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3 pl-1 border-l-2 border-slate-600">
                                Próximos Alvos
                            </p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 opacity-60 hover:opacity-100 transition-opacity">
                                {allBadges
                                    .filter(badge => !profile?.badges.includes(badge.slug))
                                    .slice(0, 5) 
                                    .map((badge) => (
                                        <AchievementBadge
                                            key={badge.slug}
                                            icon={<Lock />}
                                            title={badge.name}
                                            subtitle="Bloqueado"
                                            locked={true} 
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </GlassCard>             
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 max-w-[1440px] mx-auto">    
                    <div className="md:col-span-1 min-h-[250px]">
                        <SecurityGoalsWidget />
                    </div>
                    <div className="md:col-span-2 min-h-[250px]">
                        <ThreatRadarWidget />
                    </div>                
            </div>  
        </div>
    )
}
