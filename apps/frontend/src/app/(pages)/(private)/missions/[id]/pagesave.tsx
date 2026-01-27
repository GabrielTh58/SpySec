'use client'
import { ArrowLeft, ArrowRight, BookOpen, Check, FileQuestion, MousePointerClick, Rocket, Tags } from "lucide-react"
import { useEffect, useState } from "react";

interface MissionPageProps {
  params: {
    id: string
  }
}

interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

export default function MissionPage({ params }: MissionPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { id } = params

  const steps: Step[] = [
    { id: 1, title: 'Introdução', subtitle: 'Conceitos Básicos', icon: BookOpen },
    { id: 2, title: 'Tipos de Phishing', subtitle: 'Variações de Ataque', icon: Tags },
    { id: 3, title: 'Atividade Prática', subtitle: 'Análise de E-mail', icon: MousePointerClick },
    { id: 4, title: 'Quiz Final', subtitle: 'Validação', icon: FileQuestion },
  ];

  // Função chamada quando uma etapa interativa é concluída
  const handleStepCompletion = (stepId: number) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
    }
  };

  // Efeito para marcar etapas "apenas leitura" como completas ao avançar
  useEffect(() => {
    if ((currentStep === 1 || currentStep === 2) && !completedSteps.includes(currentStep)) {
      handleStepCompletion(currentStep);
    }
  }, [currentStep]);

  const canAdvance = completedSteps.includes(currentStep);

  return (
    <div className="min-h-screen mx-auto relative bg-[#0a0a1a]">    
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-600 rounded-full filter blur-3xl opacity-20"></div>
      </div>

    <div className="pl-0 md:pl-20 pt-20 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="main-card w-full max-w-6xl mx-auto rounded-2xl p-4 md:p-8 flex flex-col md:flex-row gap-8 relative min-h-[70vh]">
          
          {/* Coluna da Esquerda: Navegação (Stepper)  */}
          <div className="flex md:flex-col md:w-1/4 lg:w-1/5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 md:pr-6 md:border-r md:border-cyan-500/20 gap-3 md:space-y-4 no-scrollbar">
            {steps.map((step) => (
              <StepIndicator
                key={step.id}
                step={step}
                currentStep={currentStep}
                completedSteps={completedSteps}
                onClick={() => setCurrentStep(step.id)}
              />
            ))}
          </div>

          {/* Coluna da Direita: Conteúdo */}
          <div className="flex-1 flex flex-col relative pb-20">
            {/* Renderização Condicional do Conteúdo   
            {currentStep === 1 && <ContentIntro />}
            {currentStep === 2 && <ContentTypes />}
            {currentStep === 3 && <ContentActivity onComplete={() => handleStepCompletion(3)} />}
            {currentStep === 4 && <ContentQuiz onComplete={() => handleStepCompletion(4)} />}
           

            {/* Barra de Navegação Inferior */}
            <div className="absolute bottom-0 left-0 w-full flex justify-between items-center pt-6 border-t border-gray-800 mt-auto">
              <button
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className={`btn-secondary font-bold py-2 px-6 rounded-lg flex items-center gap-2 ${currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ArrowLeft className="w-4 h-4" /> Anterior
              </button>
              
              {currentStep < 4 ? (
                <button
                  onClick={() => setCurrentStep(prev => Math.min(4, prev + 1))}
                  disabled={!canAdvance}
                  className={`btn-primary font-bold py-2 px-6 rounded-lg flex items-center gap-2 text-white ${!canAdvance ? 'opacity-50 cursor-not-allowed filter grayscale' : ''}`}
                >
                  Próximo <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  disabled={!completedSteps.includes(4)}
                  className={`btn-primary font-bold py-2 px-6 rounded-lg flex items-center gap-2 text-white ${!completedSteps.includes(4) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Concluir <Rocket className="w-4 h-4" />
                </button> 
              )}
            </div>
          </div>

        </div>
    </div>
    </div>
  )
}

const StepIndicator = ({ step, currentStep, completedSteps, onClick }: { 
  step: Step, 
  currentStep: number, 
  completedSteps: number[], 
  onClick: () => void 
}) => {
  const isCompleted = completedSteps.includes(step.id);
  const isActive = currentStep === step.id;
  const isDisabled = !isCompleted && step.id !== currentStep && !completedSteps.includes(step.id - 1) && step.id !== 1;

  let baseClass = "stepper-item flex items-center gap-3 p-3 rounded-lg border-2 border-gray-700 cursor-pointer flex-shrink-0 w-40 md:w-full transition-all duration-300";
  
  if (isCompleted) baseClass += " stepper-item-completed";
  else if (isActive) baseClass += " stepper-item-active";
  else if (isDisabled) baseClass += " stepper-item-disabled pointer-events-none";

  return (
    <div onClick={isDisabled ? undefined : onClick} className={baseClass}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'border-green-400 text-green-400' : 'border-current'}`}>
        {isCompleted ? <Check className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
      </div>
      <div>
        <p className="text-xs text-gray-400 uppercase tracking-wider">Etapa {step.id}</p>
        <h3 className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-300'}`}>{step.title}</h3>
      </div>
    </div>
  );
};