'use client'

import { useEffect, useState } from 'react';
import { useGamification } from '@/data/hooks/useGamification';
import { useSession } from '@/data/hooks/useSession';
import { OnboardingModal } from './OnBoardingModal';

export function OnboardingManager() {
    const { user, isNewUser, completeOnboarding } = useSession()
    const { profile, isLoading } = useGamification();
    
    const [hasCompleted, setHasCompleted] = useState(false);
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        if (hasCompleted || isLoading || !profile || !user) return;
        
        if (isNewUser) {
            setShouldShow(true);
        } else {
            setShouldShow(false);
        }
    }, [isNewUser, profile, user, isLoading, hasCompleted]);

    const handleFinish = () => {
        setHasCompleted(true); // Trava localmente
        setShouldShow(false);  // Esconde o modal
        completeOnboarding();  // Limpa flag no contexto
    };

    if (!shouldShow) return null;

    // Passamos o callback para o modal
    return <OnboardingModal onFinish={handleFinish} />;
}