'use client'
import { createContext, useState, ReactNode, useEffect } from "react";
import { 
    TrackDTO, 
    GetTrackDetailsOutputDTO, 
    GetMissionDataOutputDTO, 
    CompleteMissionOutputDTO,
    BrowseTracksOutputDTO,
    StudentProgressSummaryOutputDTO
} from '@spysec/education';
import { useAPI } from "../hooks/useAPI";
import { MissionCompletionResponse } from "../types/MissionCompletionResponse.interface";

interface EducationContextProps {
    tracks: TrackDTO[];
    currentTrack: GetTrackDetailsOutputDTO | null;
    activeMission: GetMissionDataOutputDTO | null;
    isLoading: boolean;
    tracksSummary: { total: number; completed: number }; 
    progress: StudentProgressSummaryOutputDTO | null

    loadTracks: () => Promise<void>;
    clearActiveMission: () => void;
    getProgressSummary: () => Promise<void>;
    selectTrack: (trackId: string) => Promise<void>;
    fetchMissionData: (missionId: string) => Promise<void>
    completeMission: (missionId: string, answers: Record<string, any>, timeSpent: number) => Promise<MissionCompletionResponse | null>;
}

export const EducationContext = createContext<EducationContextProps>({} as any);

export function EducationProvider({ children }: { children: ReactNode }) {
    const { httpGet, httpPost } = useAPI();   
    
    const [tracks, setTracks] = useState<TrackDTO[]>([]);
    const [tracksSummary, setTracksSummary] = useState({ total: 0, completed: 0 });
    const [progress, setProgress] = useState<StudentProgressSummaryOutputDTO | null>(null)
    const [currentTrack, setCurrentTrack] = useState<GetTrackDetailsOutputDTO | null>(null);
    const [activeMission, setActiveMission] = useState<GetMissionDataOutputDTO | null>(null);  
    const [isLoading, setIsLoading] = useState(false);

    async function loadTracks() {
        setIsLoading(true);
        try {
            const data = await httpGet<BrowseTracksOutputDTO>('/education/tracks'); 
            setTracks(data.tracks || []);
            setTracksSummary({
                total: data.summary.totalTracks,
                completed: data.summary.completedTracks
            });
        } catch (error) {
            console.error("Erro ao buscar trilhas", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function selectTrack(trackId: string) {
        setIsLoading(true);
        try {
            const data = await httpGet<GetTrackDetailsOutputDTO>(`/education/tracks/${trackId}`);
            setCurrentTrack(data);
        } catch (error) {   
            console.error("Erro ao carregar trilha", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchMissionData(missionId: string) {
        if (activeMission?.id === missionId) return;

        setIsLoading(true); 
        try {
            const data = await httpGet<GetMissionDataOutputDTO>(`/education/missions/${missionId}`);
           setActiveMission(data)
        } catch (error) {
            console.error("Erro ao carregar missão", error);
            setActiveMission(null);
        } finally {
            setIsLoading(false);
        }
    }

    async function completeMission(missionId: string, answers: Record<string, any>, timeSpent: number) {
        setIsLoading(true); 
        try {
            const data = await httpPost<CompleteMissionOutputDTO>(
                `/education/missions/${missionId}/complete`, {
                    answers,
                    timeSpent
                }  
            );
            
            if (data && data.success) { 
                await getProgressSummary(); 
                await loadTracks(); 
            }
            return data;
        } catch (error) {
            console.error("Erro ao completar missão", error);
            return null;
        } finally {
            setIsLoading(false);
        }
    }

    async function getProgressSummary(){
        setIsLoading(true)
        try{
            const data = await httpGet<StudentProgressSummaryOutputDTO>('/education/summary')
            setProgress(data)
        }catch(e){
            console.error("Erro ao buscar progresso", e)
        }finally{
            setIsLoading(false)
        }
    }

    function clearActiveMission() {
        setActiveMission(null);
    }

    async function init() {
        setIsLoading(true);
        await Promise.all([
            loadTracks(), 
            getProgressSummary()            
        ]);
        setIsLoading(false);
    }

    useEffect(() => {     
        init();
    }, []);

    return (
        <EducationContext.Provider value={{ 
            tracks, 
            currentTrack, 
            activeMission,
            tracksSummary,  
            isLoading, 
            loadTracks, 
            selectTrack, 
            fetchMissionData,   
            getProgressSummary,
            completeMission,
            progress,
            clearActiveMission
        }}>
            {children}
        </EducationContext.Provider>
    );
}
