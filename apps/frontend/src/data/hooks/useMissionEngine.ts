import { useState, useEffect, useRef } from 'react';
import { MissionContent } from '@spysec/education';
import { useAPI } from './useAPI';

interface MissionEngineProps {
  missionId: string
  missionContentVO: MissionContent | null;
  onFinishMission: (answers: Record<string, any>) => void;
}

export interface FeedbackState {
  type: 'success' | 'error';
  message: string;
  explanation?: string;
}

export interface AiAnalyzeResponse {
  mascotInsight: string | null;
  isAnalyzingInsight: boolean;
}

export function useMissionEngine({ missionContentVO, onFinishMission, missionId }: MissionEngineProps) {
  const { httpPost } = useAPI();

  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const [isBlockCompleted, setIsBlockCompleted] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const [mascotInsight, setMascotInsight] = useState<string | null>(null);
  const [isAnalyzingInsight, setIsAnalyzingInsight] = useState(false);
  const firstAttempts = useRef<Record<string, any>>({});

  useEffect(() => {
    setCurrentBlockIndex(0);
    setAnswers({});
    setFeedback(null);
    setIsBlockCompleted(false);
    setMascotInsight(null);
    firstAttempts.current = {}; 
    setIsAnalyzingInsight(false);
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
      aiInsightData: { mascotInsight: null, isAnalyzingInsight: false },
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
    if (currentBlock.type === 'INFO' || currentBlock.type === 'SUMMARY') {
      proceedToNext();
      return;
    }

    if (!(currentBlock.id in firstAttempts.current)) {
      firstAttempts.current[currentBlock.id] = answers[currentBlock.id];
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
      explanation: blockData.explanation 
    });

    setIsBlockCompleted(true);
  };

  const proceedToNext = () => {
    setFeedback(null);
    setIsBlockCompleted(false);

    if (isLastBlock) {
      onFinishMission(answers);
    } else {
      setCurrentBlockIndex(prev => {
        const nextIndex = prev + 1;
        const nextBlock = blocks[nextIndex];
        
        if (nextBlock && nextBlock.type === 'SUMMARY') {
          aiAnalyzeErrors();  
        }
        
        return nextIndex;
      });
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
 
  const aiAnalyzeErrors = () => {
      const payloadToAnalyze = { ...answers, ...firstAttempts.current };
      const validation = missionContentVO.validateUserAnswers(payloadToAnalyze);
      console.log('payload',payloadToAnalyze);

      
      if (validation.isValid) {
        setMascotInsight(null); 
        return;   
      } 

      setIsAnalyzingInsight(true);  

      httpPost<AiAnalyzeResponse>(`/analytics/missions/${missionId}/analyze`, { answers: payloadToAnalyze })
          .then((res:any) => {
            setMascotInsight(res.mascotInsight);
      })
      .catch ((error: any) => {
        console.error("Falha ao analisar IA:", error);
        setMascotInsight(null);
      })
      .finally( () => setIsAnalyzingInsight(false))
  }


  return {
    currentBlock,
    currentBlockIndex,
    totalBlocks: blocks.length,
    answers,

    feedback,          
    isBlockCompleted,  

    isFirstBlock: currentBlockIndex === 0,
    isLastBlock,
    aiInsightData: {
      mascotInsight,
      isAnalyzingInsight
    },

    actions: {
      setAnswer,
      checkAnswer,   
      proceedToNext, 
      handlePrev,
      jumpToBlock
    }
  };
}