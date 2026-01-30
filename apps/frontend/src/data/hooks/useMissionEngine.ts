// src/data/hooks/useMissionEngine.ts
import { useState, useEffect } from 'react';
import { MissionContent } from '@spysec/education';

interface MissionEngineProps {
  missionContentVO: MissionContent | null;
  onCompleteMission: (answers: Record<string, any>) => void;
}

export interface FeedbackState {
  type: 'success' | 'error';
  message: string;
  explanation?: string;
}

export function useMissionEngine({ missionContentVO, onCompleteMission }: MissionEngineProps) {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const [isBlockCompleted, setIsBlockCompleted] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  useEffect(() => {
    setCurrentBlockIndex(0);
    setAnswers({});
    setFeedback(null);
    setIsBlockCompleted(false);
  }, [missionContentVO]);

  if (!missionContentVO) {
    return {
      currentBlock: null,
      currentBlockIndex: 0,
      totalBlocks: 0,
      answers: {},
      feedback: null,
      isBlockCompleted: false,
      isFirstBlock: true,
      isLastBlock: true,
      actions: { setAnswer: () => { }, checkAnswer: () => { }, proceedToNext: () => { } }
    };
  }

  const blocks = missionContentVO.blocks;
  const currentBlock = blocks[currentBlockIndex];
  const isLastBlock = currentBlockIndex === blocks.length - 1;

  const setAnswer = (blockId: string, value: any) => {
    if (isBlockCompleted) return;

    setAnswers(prev => ({ ...prev, [blockId]: value }));

    if (feedback?.type === 'error') {
      setFeedback(null);
    }
  };

  const checkAnswer = () => {
    if (currentBlock.type === 'INFO') {
      proceedToNext();
      return;
    }

    const currentAnswerObj = { [currentBlock.id]: answers[currentBlock.id] };
    const validation = missionContentVO.validateUserAnswers(currentAnswerObj);

    if (validation.failedBlockIds.includes(currentBlock.id)) {
      const errorMsg = missionContentVO.getBlockErrorFeedback(currentBlock.id);

      setFeedback({
        type: 'error',
        message: errorMsg,
      });
      setIsBlockCompleted(false);
      return;
    }
    const blockData = currentBlock.data as any;

    setFeedback({
      type: 'success',
      message: blockData.feedbackSuccess || "Resposta correta!",
      explanation: blockData.explanation // AQUI ESTÁ: Salvamos a explicação para a UI mostrar
    });

    setIsBlockCompleted(true);
  };

  const proceedToNext = () => {
    setFeedback(null);
    setIsBlockCompleted(false);

    if (isLastBlock) {
      onCompleteMission(answers);
    } else {
      setCurrentBlockIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(prev => prev - 1);
      setFeedback(null);
      setIsBlockCompleted(false);
      setAnswers({})
    }
  };

  const jumpToBlock = (index: number) => {
    if (index >= 0 && index < blocks.length) {
        setCurrentBlockIndex(index);
        setFeedback(null);
        setIsBlockCompleted(false);
    }
  }

  return {
    currentBlock,
    currentBlockIndex,
    totalBlocks: blocks.length,
    answers,

    feedback,          // Contém message, type E explanation
    isBlockCompleted,  // Booleano para saber se mostramos o botão "Verificar" ou "Continuar"

    isFirstBlock: currentBlockIndex === 0,
    isLastBlock,

    actions: {
      setAnswer,
      checkAnswer,   // Conecte isso ao botão "Verificar Resposta"
      proceedToNext, // Conecte isso ao botão "Continuar / Próximo"
      handlePrev,
      jumpToBlock
    }
  };
}