import { BookOpen, FileQuestion, MousePointerClick, Tags } from "lucide-react";

const steps: any = [
    { id: 1, title: 'Introdução', subtitle: 'Conceitos Básicos', icon: BookOpen },
    { id: 2, title: 'Tipos de Phishing', subtitle: 'Variações de Ataque', icon: Tags },
    { id: 3, title: 'Atividade Prática', subtitle: 'Análise de E-mail', icon: MousePointerClick },
    { id: 4, title: 'Quiz Final', subtitle: 'Validação', icon: FileQuestion },
];

export function Steps(){
    return(
        <div className="flex flex-col gap-1">
            <div className="flex md:flex-col md:w-1/4 lg:w-1/5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 md:pr-6 md:border-r md:border-cyan-500/20 gap-3 md:space-y-4 no-scrollbar">
                {steps.map((step:any) => (
                    <div key={step.id} className="stepper-item flex items-center gap-3 p-3 rounded-lg border-2 border-gray-700 w-40 md:w-full transition-all duration-300">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-current`}>
                            <step.icon className="w-4 h-4" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wider">Etapa {step.id}</p>
                            <h3 className="font-semibold text-sm text-gray-300">{step.title}</h3>
                        </div>
                    </div>
                ))}
          </div>          
        </div>
    )
}