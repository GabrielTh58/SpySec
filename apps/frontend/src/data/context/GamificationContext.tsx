'use client'
import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { useAPI } from "../hooks/useAPI";
import { BadgeDTO, PlayerProfileOutputDTO, RankingDTO } from "@spysec/gamification";
import { useSession } from "../hooks/useSession";
import { toast } from "sonner";

interface GamificationContextProps {
    profile: PlayerProfileOutputDTO | null;
    allBadges: BadgeDTO[];
    ranking: RankingDTO[];
    isLoading: boolean;

    refreshProfile: () => Promise<void>;
    getAllBadges: () => Promise<void>;
    getRanking: (limit?: number) => Promise<void>;
    submitSettingsUpdate: (data: UpdateSettingsData) => Promise<void>;
    updateLocalProfile: (data: Partial<PlayerProfileOutputDTO>) => void;
}

interface UpdateSettingsData {
    nickName: string;
}

export const GamificationContext = createContext<GamificationContextProps>({} as any);

export function GamificationProvider({ children }: { children: ReactNode }) {
    const { httpGet, httpPatch } = useAPI();
    const { token, loading: isSessionLoading } = useSession();

    const [profile, setProfile] = useState<PlayerProfileOutputDTO | null>(null);
    const [allBadges, setAllBadges] = useState<BadgeDTO[]>([])
    const [ranking, setRanking] = useState<RankingDTO[]>([])    
    const [isLoading, setIsLoading] = useState(true);

    const updateLocalProfile = useCallback((partialData: Partial<PlayerProfileOutputDTO>) => {
        setProfile((prev) => {
            if (!prev) return null;
            return { ...prev, ...partialData };
        });
    }, []);

    async function refreshProfile() {
        try {
            const data = await httpGet<PlayerProfileOutputDTO>('/gamification/profile');
            if (data) {
                setProfile(data);
            } else {
                console.warn("API retornou sucesso mas sem dados de perfil.");
            }
        } catch (error) {
            console.error("Erro ao atualizar gamification", error);
        }
    }

    async function getAllBadges() {
        try {
            const data = await httpGet<BadgeDTO[]>('/gamification/badges')
            if (data) setAllBadges(data)
        } catch (error) {
            console.error("Erro ao buscar Badges")
        }
    }

    async function getRanking(limit: number = 10) {
        try {
            const data = await httpGet<RankingDTO[]>(`/gamification/ranking`, { limit: limit });
            if (data) setRanking(data)
        } catch (error) {
            console.error('Erro ao buscar Ranking', error)
        }
    }

    async function loadInitialData() {
        if (!token) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);

        try {
            await Promise.allSettled([
                refreshProfile(),
                getRanking(10),
                getAllBadges()
            ]);
        } catch (error) {
            console.error("Erro fatal no loadInitialData:", error);
        } finally {
            setIsLoading(false);
        }
    }

    async function submitSettingsUpdate(data: UpdateSettingsData) {
        setIsLoading(true);
        try {
            console.log("Enviando dados:", data);

            const response = await httpPatch('/gamification/nickname', data);
            await loadInitialData();

            toast.success('Codinome atualizado com sucesso!');
        } catch (e: any) {
            console.error("Erro ao atualizar:", e);
            let errorMessage = 'Falha ao atualizar o Codinome. Tente novamente.';
            if (e?.response?.data?.message) {
                errorMessage = e.response.data.message;
            }
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }    
    }

    useEffect(() => {
        if (!isSessionLoading) {
            if (token) {
                loadInitialData();
            } else {
                setIsLoading(false);
            }
        }
    }, [token, isSessionLoading]);
    
    return (
        <GamificationContext.Provider value={{
            profile,
            allBadges,
            ranking,
            isLoading,
            refreshProfile,
            getAllBadges,
            getRanking,
            submitSettingsUpdate,
            updateLocalProfile
        }}>
            {children}
        </GamificationContext.Provider>
    )
}