'use client'
import { AchievementBadge } from "@/components/dashboard/AchievementBadge";
import { GlassCard } from "@/components/dashboard/GlassCard";
import { MissionPortal } from "@/components/dashboard/MissionPortal";
import { NeonButton } from "@/components/dashboard/NeonButton";
import { RankingItem } from "@/components/dashboard/Ranking";
import { Background } from "@/components/template/Background";
import { Activity, Award, ChartNoAxesColumnIncreasing, ChevronUp, Clock, Globe, Shield, Target, Terminal, Trophy, Zap } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
    const [missionStatus, setMissionStatus] = useState<'idle' | 'active'>('idle');
    
    const handleStart = () => {
        setMissionStatus('active');
        setTimeout(() => {
          alert("Sequência de inicialização completada! Carregando ambiente da missão...");
          setMissionStatus('idle');
        }, 1500);
    };

    return (
        <div className="flex-1 overflow-y-auto sm:p-8 scroll-smooth">
            <Background />
            <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1440px] mx-auto">

                {/* Card Principal - Próxima Missão 
                    <GlassCard className="md:col-span-2 lg:col-span-2 lg:row-span-3 flex flex-col justify-between border-l-4 border-l-cyan-500 neon-glow-cyan bg-linear-to-br from-cyan-900/10 to-transparent">
                    <div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-cyan-500/20 text-cyan-300 text-xs px-2 py-1 rounded border border-cyan-500/30">EM ANDAMENTO</span>
                            <Activity className="text-cyan-400" size={20} />
                        </div>
                        <h3 className="font-orbitron text-xl md:text-2xl text-white mb-2">SQL Injection Avançado</h3>
                        <p className="text-gray-400 text-sm mb-6">Identifique e mitigue vulnerabilidades em bancos de dados reais. Proteja os dados da corporação.</p>
                    </div>

                    <div>
                        <div className="flex justify-between text-xs text-gray-300 mb-2">
                            <span>Progresso do Módulo</span>
                            <span>75%</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2.5 mb-6">
                            <div className="bg-cyan-400 h-2.5 rounded-full shadow-[0_0_10px_#00ffff]" style={{ width: '75%' }}></div>
                        </div>
                        <NeonButton className="w-full flex items-center justify-center gap-2">
                            <Terminal size={18} />
                            Continuar Missão
                        </NeonButton>
                    </div>
                </GlassCard>
                */}
                
                    <MissionPortal 
                        title="Protocolo Fantasma"
                        subtitle="Infiltre-se na rede neural da corporação Nexus e extraia os códigos de segurança antes que o firewall detecte sua presença."
                        level={5}
                        xpReward={1250}
                        onEnter={handleStart}
                        className="md:col-span-2 lg:col-span-2 lg:row-span-2 "
                    />

                {/* Stat Card 1 - Progresso Geral */}
                <GlassCard className="flex flex-col justify-between" hoverEffect>
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-400 font-medium font-orbitron text-sm">Progresso</h3>
                        <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                            <ChartNoAxesColumnIncreasing  size={18} />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold font-orbitron text-cyan-400 mt-2 neon-text-cyan">68%</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                            <ChevronUp size={12} className="text-green-500" /> +12% este mês
                        </p>
                    </div>
                </GlassCard>

                {/* Stat Card 2 - Desafios */}
                <GlassCard className="flex flex-col justify-between" hoverEffect>
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-400 font-medium font-orbitron text-sm">Missões Concluídas</h3>
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                            <Shield size={18} />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold font-orbitron text-purple-400 mt-2 neon-text-magenta">42</p>
                        <p className="text-xs text-gray-500 mt-1">Missões Práticas</p>
                    </div>
                </GlassCard>

                {/* Stat Card 3 - Tempo */}
                <GlassCard className="flex flex-col justify-between" hoverEffect>
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-400 font-medium text-sm font-orbitron">Tempo de Estudo</h3>
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                            <Clock size={18} />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold font-orbitron text-white mt-2">
                            28<span className="text-xl text-gray-500">h</span> 15<span className="text-xl text-gray-500">m</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">Total na plataforma</p>
                    </div>
                </GlassCard>

                {/* Stat Card 4 - Streak */}
                <GlassCard className="flex flex-col justify-between" hoverEffect>
                    <div className="flex items-center justify-between">
                        <h3 className="text-gray-400 font-medium text-sm font-orbitron">Sequência</h3>
                        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                            <Zap size={18} />
                        </div>
                    </div>
                    <div>
                        <p className="text-3xl font-bold font-orbitron text-orange-400 mt-2">15</p>
                        <p className="text-xs text-gray-500 mt-1">Dias consecutivos</p>
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1440px] mx-auto mt-6">
                {/* Ranking Section (NOVO) */}
                <GlassCard className="md:col-span-2 lg:col-span-1 flex flex-col hover:translate-y-0 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-orbitron text-lg text-purple-400 flex items-center gap-2 neon-text-magenta">
                            <Trophy size={18} />
                            Top Hackers
                        </h3>
                    </div>

                    <div className="flex-1 space-y-1">
                        <RankingItem rank={1} name="Neo_Anderson" xp="15.4k" change="up" />
                        <RankingItem rank={2} name="Trinity_X" xp="14.9k" change="up" />
                        <RankingItem rank={3} name="Morpheus" xp="14.2k" change="down" />
                        <RankingItem rank={4} name="Cypher_01" xp="12.8k" change="up" />
                        <RankingItem rank={5} name="Link_Op" xp="11.5k" change="none" />
                    </div>

                    {/* Seu Rank */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="bg-cyan-500/10 rounded p-2 flex items-center justify-between border border-cyan-500/30">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-cyan-400 text-sm">#42</span>
                                <span className="text-xs font-semibold">Você</span>
                            </div>
                            <span className="text-xs text-cyan-300">1.25k XP</span>
                        </div>
                    </div>
                </GlassCard>

                {/* Achievements Section */}
                <GlassCard className="md:col-span-2 lg:col-span-2 hover:translate-y-0">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-orbitron text-lg text-white flex items-center gap-2">
                            <Award className="text-yellow-400" size={20} />
                            Últimas Conquistas
                        </h3>
                        <button className="text-xs text-cyan-400 hover:text-cyan-300">Ver todas</button>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        <AchievementBadge icon="🏅" title="Defensor Digital" subtitle="Primeira Missão" />
                        <AchievementBadge icon="🛡️" title="Firewall Humano" subtitle="Defesa Básica" />
                        <AchievementBadge icon="🔑" title="Crypto Master" subtitle="Criptografia 101" />
                        <AchievementBadge icon="🔬" title="Detetive de Logs" subtitle="Análise Forense" />
                        <AchievementBadge icon="🕵️" title="Invisible" subtitle="Stealth Mode" />
                        <AchievementBadge icon="🕸️" title="Net Walker" subtitle="Redes Avançadas" locked />
                    </div>
                </GlassCard>              
            </div>
        </div>
    )
}

