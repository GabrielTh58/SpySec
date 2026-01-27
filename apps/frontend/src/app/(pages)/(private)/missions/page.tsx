import { Connector } from "@/components/missions/Connector";
import { EndPointMission } from "@/components/missions/EndPointMission";
import { MissionCard } from "@/components/missions/MissionCard";
import { StartPointMission } from "@/components/missions/StartPointMission";
import { ScanEye, Server, ShieldOff } from "lucide-react";
import React from "react";

export interface Mission {
    id: string;
    title: string;
    xp: number;
    status: 'completed' | 'active' | 'locked';
    icon: React.ElementType;
    tutorMessage?: string;
}

export default function Missions() {    
    const missions: Mission[] = [
      {
        id: 'm1',
        title: 'Configuração de Firewall',
        xp: 150,
        status: 'completed',
        icon: Server,
      },
      {
        id: 'm2',
        title: 'Análise de Logs',
        xp: 250,
        status: 'active',
        icon: ScanEye,
        tutorMessage: 'Os logs são o histórico da rede. Encontre a anomalia, agente!'
      },
      {
        id: 'm3',
        title: 'Resposta a Incidentes',
        xp: 400,
        status: 'locked',
        icon: ShieldOff,
      }
    ];
  
    return (
          <div className="custom-scrollbar flex-1 overflow-y-auto particles-background p-8 lg:p-12 scroll-smooth">
            <div className="flex flex-col items-center max-w-3xl mx-auto pb-20">
              
              <StartPointMission />
              <Connector status="completed" />
  
              {missions.map((mission, index) => (
                <React.Fragment key={mission.id}>
                  <MissionCard mission={mission} />
                  
                  {index < missions.length - 1 ? (
                     <Connector status={mission.status === 'completed' ? 'active' : 'locked'} />
                  ) : (
                     <Connector status="locked" /> 
                  )}
                </React.Fragment>
              ))}
  
              <EndPointMission />  
            </div>
          </div>
    );
}

  

