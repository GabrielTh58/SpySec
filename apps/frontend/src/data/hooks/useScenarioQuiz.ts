import { useState, useMemo, useEffect } from "react";

export type QuizStatus = 'INTRO' | 'PLAYING' | 'FEEDBACK' | 'SUMMARY';

export interface ActionsQuiz {
    handleStart: () => void;
    handleSelectOption: (optionId: string) => void;
    handleNextStep: () => void;
}

export function useScenarioQuiz(data: any, value: Record<string, string>, onChange: (val: Record<string, string>) => void, isLocked?: boolean) {
    const [status, setStatus] = useState<QuizStatus>(isLocked ? 'SUMMARY' : 'INTRO');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [localAnswers, setLocalAnswers] = useState<Record<string, string>>(value || {});

    const questions = data?.questions || [];
    const totalQuestions = questions.length;
    const currentQuestion = questions[currentIndex];

    useEffect(() => {
        if (isLocked) setStatus('SUMMARY');
    }, [isLocked]);

    useEffect(() => {
        if (value && Object.keys(value).length > 0 && status === 'INTRO') {
            setLocalAnswers(value);
        }
    }, [value, status]);

    const score = useMemo(() => {
        return questions.filter((q: any) => localAnswers[q.id] === q.correctOptionId).length;
    }, [localAnswers, questions]);
    
    const passingScore = data?.summary?.passingScore ?? totalQuestions; 
    const passed = score >= passingScore;

    // --- ACTIONS ---

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
            // Só dispara o onChange global quando o usuário termina todas as perguntas do cenário!
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