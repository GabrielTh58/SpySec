'use client'
import { useEducation } from "@/data/hooks/useEducation";
import { useGamification } from "@/data/hooks/useGamification";
import { useState } from "react";

export default function MissionPage(props: any) {
    const [currentStep, setCurrentStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]); 
    const missionId = props.params.id

    const { completeMission } = useEducation();
    const { refreshProfile } = useGamification();
    

    const handleMissionFinish = async () => {
        const result = await completeMission(missionId);
        
        if (result) {
            // Se deu certo, atualiza o XP no Header (Gamification)
            // O EducationContext já atualizou o progresso interno dele automaticamente
            await refreshProfile(); 
            
            alert(`Missão cumprida! Ganhou ${result.xpEarned} XP`);
        }
    }

    return(
        <div className="relative flex-1 w-full min-h-screen mx-auto max-w-[1440px]  p-6 md:p-12 animate-fade-in">
            {/* Background Decorativo */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30  rounded-full filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/30 rounded-full filter blur-3xl opacity-20"></div>
            </div>

            <h2 className="font-orbitron text-2xl neon-text-glow text-center">Missão 01 - Introdução a Segurança</h2>

            <div className="flex items-center w-full">
                 {/*<Steps />*/}

                <div className="neon-border-cyan flex-1 w-64">
                    sda
                </div>
            </div>

        </div>
    )
}