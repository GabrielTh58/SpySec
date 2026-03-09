import { useState, useMemo, useEffect } from "react";

export type QuizStatus = 'INTRO' | 'PLAYING' | 'FEEDBACK' | 'SUMMARY';

export function useScenarioQuiz(data: any, value: Record<string, string>, onChange: (val: Record<string, string>) => void, isLocked?: boolean) {
    // Se a missão já estiver trancada (concluída), vai direto pro resumo
    const [status, setStatus] = useState<QuizStatus>(isLocked ? 'SUMMARY' : 'INTRO');
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Armazena as respostas localmente até o fim do cenário
    const [localAnswers, setLocalAnswers] = useState<Record<string, string>>(value || {});

    const currentQuestion = data.questions[currentIndex];
    const totalQuestions = data.questions.length;

    // Calcula a pontuação em tempo real
    const score = useMemo(() => {
        return data.questions.filter((q: any) => localAnswers[q.id] === q.correctOptionId).length;
    }, [localAnswers, data.questions]);

    const passed = score >= data.summary.passingScore;

    // Sincroniza caso o componente pai mande um valor novo
    useEffect(() => {
        if (value && Object.keys(value).length > 0 && status === 'INTRO') {
            setLocalAnswers(value);
        }
    }, [value]);

    // --- AÇÕES ---

    const handleStart = () => {
        setStatus('PLAYING');
    };

    const handleSelectOption = (optionId: string) => {
        if (status !== 'PLAYING' || isLocked) return;
        
        const newAnswers = { ...localAnswers, [currentQuestion.id]: optionId };
        setLocalAnswers(newAnswers);
        setStatus('FEEDBACK');
    };

    const handleNextStep = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(prev => prev + 1);
            setStatus('PLAYING');
        } else {
            setStatus('SUMMARY');
            onChange(localAnswers); 
        }
    };

    return {
        status,
        currentIndex,
        currentQuestion,
        totalQuestions,
        localAnswers,
        score,
        passed,
        actions: { handleStart, handleSelectOption, handleNextStep }
    };
}