'use client'
import { Award } from "lucide-react";
import { Drawer } from "../sidebar/Drawer";
import { useGamification } from "@/data/hooks/useGamification";
import { Loading } from "../template/Loading";
import { useSession } from "@/data/hooks/useSession";

export function Header(){
    const { profile, isLoading  } = useGamification()
    const { user } = useSession()

    if (isLoading && !profile) return <Loading />

    const currentLevel = profile?.currentLevel || 1;
    const currentXp = profile?.currentXp || 0;
    const nextLevelXp = profile?.nextLevelXp || 100; 
    const progressPercent = Math.min(100, Math.max(0, (currentXp / nextLevelXp) * 100));

    const displayInitials = profile?.nickname?.substring(0, 2).toUpperCase() || "AG";

    let agentTitle = 'Agente Júnior';
    if (currentLevel >= 5) agentTitle = 'Agente Sênior';
    if (currentLevel >= 10) agentTitle = 'Agente Especialista';

    return (
        <header className="w-full self-start flex items-center justify-between py-3 px-4 md:px-6 border-b border-b-cyan-500/20 ">
            <Drawer />
            
            <div className="flex flex-row-reverse items-center md:flex-row gap-2 lg:ml-0">
                <div className="rounded-full p-[2px] bg-gradient-border-cyan">
                    <div className="w-7 h-7 md:w-10 md:h-10 rounded-full overflow-hidden bg-black flex items-center justify-center">
                    {user?.imageURL ? (
                            <img
                                src={user.imageURL}
                                alt={`Avatar de ${profile?.nickname}`}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-900">
                                <span className="font-orbitron font-bold text-cyan-500 text-sm tracking-widest">
                                    {displayInitials}
                                </span>
                            </div>
                        )}                                 
                    </div>  
                </div>
                    <div className="hidden md:block">
                        <p className="font-inter font-semibold">
                            {profile?.nickname || 'Agente Desconhecido'}
                        </p>
                        <p className="font-orbitron font-medium text-cyan-500 text-xs">
                            {agentTitle}
                        </p>
                    </div>
                </div>

            <div className="hidden md:flex items-center gap-12">
                <div className="flex items-center gap-2">
                    <Award className="text-yellow-500" size={24}/>
                    <span className="font-orbitron">
                        {profile?.badges.length || 0}
                    </span>
                </div>

                <div className="w-38">
                    <div className="flex justify-between items-center font-orbitron mb-1">
                        <span className="text-[10px] text-cyan-500">Nível {currentLevel < 10 ? `0${currentLevel}` : currentLevel}</span>      
                        <span className="text-[8px] text-slate-400">{currentXp}/{nextLevelXp}</span>   
                    </div>
                    <div>                      
                        <div className="relative w-full bg-slate-600 h-[6px] rounded-full overflow-hidden border border-white/5">
                        <div 
                            className="absolute top-0 left-0 bg-cyan-500 h-full rounded-full shadow-[0_0_8px_cyan] transition-all duration-700 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        ></div>
                    </div>
                    </div>
                </div>  
            </div>
        </header>
    )
}