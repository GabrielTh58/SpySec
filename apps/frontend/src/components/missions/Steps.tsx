import { Info, HelpCircle, Keyboard, MousePointerClick, BookOpen, Check } from "lucide-react";
import { MissionBlock } from "@spysec/education";
import useDimensions from "@/data/hooks/useDimensions";

interface StepsProps {
    blocks: MissionBlock[];
    currentIndex: number;
    failedBlockIds?: string[];
    onStepClick: (index: number) => void;
    isFinalMission?: boolean;
}

function getStepInfo(type: string) {
    switch (type) {
        case 'INFO': return { icon: BookOpen, label: 'Briefing' };
        case 'QUIZ': return { icon: HelpCircle, label: 'Desafio' };
        case 'INPUT': return { icon: Keyboard, label: 'Decodificar' };
        case 'MATCHING': return { icon: MousePointerClick, label: 'Conexão' };
        case 'HOTSPOT': return { icon: MousePointerClick, label: 'Investigação' };
        default: return { icon: Info, label: 'Etapa' };
    }
}

function getStepStyles(isActive: boolean, isFailed: boolean | undefined, isCompleted: boolean) {
    if (isActive) {
        return {
            stepClass: "step-active",
            iconBg: "bg-cyan-900",
            iconColor: "text-cyan-400"
        };
    }
    if (isFailed) {
        return {
            stepClass: "step-error",
            iconBg: "bg-red-900/50",
            iconColor: "text-red-400"
        };
    }
    if (isCompleted) {
        return {
            stepClass: "step-success",
            iconBg: "bg-green-900/50",
            iconColor: "text-green-400"
        };
    }
    return {
        stepClass: "step-locked",
        iconBg: "bg-gray-800",
        iconColor: "text-gray-500"
    };
}

export function Steps(props: StepsProps) {
    const { isFinalMission } = props;
    const { smOrLess } = useDimensions()

    if (isFinalMission) {
        return <FinalQuizSteps {...props} />;
    }

    return smOrLess ? <MobileSteps {...props} />: <DesktopSteps {...props} />
}

function DesktopSteps(props: StepsProps) {
    const { blocks, currentIndex, failedBlockIds, onStepClick } = props
    return (
        <div className="flex flex-col w-full lg:w-64 shrink-0">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-3 lg:gap-0 lg:space-y-3 no-scrollbar px-1">
                {blocks.map((block, index) => {
                    const isActive = index === currentIndex;
                    const isCompleted = index < currentIndex;
                    const isFailed = failedBlockIds?.includes(block.id);

                    const { icon: TypeIcon, label } = getStepInfo(block.type);
                    const DisplayIcon = (isCompleted && !isActive) ? Check : TypeIcon;

                    const styles = getStepStyles(isActive, isFailed, isCompleted);

                    return (
                        <button
                            key={block.id}
                            onClick={() => onStepClick(index)}
                            disabled={index > currentIndex}
                            className={`
                        step-card-base ${styles.stepClass} bg-[#0F1423]/80
                        ${index > currentIndex ? 'cursor-not-allowed' : 'cursor-pointer'}
                        min-w-[140px] lg:min-w-0 flex-1
                    `}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${styles.iconBg}`}>
                                <DisplayIcon className={`w-4 h-4 ${styles.iconColor}`} />
                            </div>

                            <div className="flex flex-col">
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-mono">
                                    Etapa 0{index + 1}
                                </p>
                                <h3 className={`text-sm`}>
                                    {label}
                                </h3>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

function MobileSteps(props: StepsProps) {
    const { blocks, currentIndex, failedBlockIds, onStepClick } = props

    return (
        <div className="flex flex-col w-full mb-8 lg:hidden animate-fade-in">

            <div className="flex flex-wrap justify-start gap-2 px-2">
                {blocks.map((block, index) => {
                    const isActive = index === currentIndex;
                    const isCompleted = index < currentIndex;
                    const isFailed = failedBlockIds?.includes(block.id);

                    let dotClass = "bg-gray-800 border-gray-700"; 

                    if (isActive) {
                        dotClass = "w-6 bg-cyan-500 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]";
                    } else if (isFailed) {
                        dotClass = "bg-red-500/80 border-red-500 hover:bg-red-500"; 
                    } else if (isCompleted) {
                        dotClass = "bg-green-500/50 border-green-500 hover:bg-green-500";
                    } else {
                        dotClass += " opacity-50";
                    }

                    return (
                        <button
                            key={block.id}
                            onClick={() => onStepClick(index)}
                            disabled={index > currentIndex}
                            className={`
                                h-2 rounded-full transition-all duration-300 border
                                ${isActive ? 'w-6' : 'w-2'} 
                                ${dotClass}
                            `}
                        />
                    );
                })}
            </div>
        </div>
    )
}


function FinalQuizSteps({ blocks, currentIndex, failedBlockIds, onStepClick }: StepsProps) {
    const currentBlock = blocks[currentIndex];
    const { icon: CurrentIcon, label } = getStepInfo(currentBlock?.type || '');

    return (
        <div className="flex flex-col w-full md:w-64 shrink-0 gap-6 animate-fade-in">

            <div className="bg-[#0F1423]/80 border border-gray-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-orbitron text-cyan-500 uppercase tracking-widest">
                        Questão {String(currentIndex + 1).padStart(2, '0')}
                    </span>
                    <CurrentIcon size={18} className="text-cyan-400" />
                </div>
                <div className="font-medium text-white text-lg leading-tight">
                    {label}
                </div>
                <div className="absolute bottom-0 left-0 h-1 bg-cyan-500/20 w-full">
                    <div
                        className="h-full bg-cyan-500 transition-all duration-500"
                        style={{ width: `${((currentIndex + 1) / blocks.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-wider px-1">
                    <span>Progresso</span>
                    <span>{Math.round(((currentIndex) / blocks.length) * 100)}%</span>
                </div>

                <div className="flex flex-wrap gap-3">
                    {blocks.map((block, index) => {
                        const isActive = index === currentIndex;
                        const isCompleted = index < currentIndex;
                        const isFailed = failedBlockIds?.includes(block.id);

                        let dotClass = "bg-gray-800 border-gray-700 hover:border-gray-500";

                        if (isActive) {
                            dotClass = "bg-cyan-500 border-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.6)] scale-125";
                        } else if (isFailed) {
                            dotClass = "bg-red-500 border-red-400 opacity-80";
                        } else if (isCompleted) {
                            dotClass = "bg-green-500 border-green-400 opacity-80";
                        }

                        return (
                            <button
                                key={block.id}
                                onClick={() => onStepClick(index)}
                                disabled={index > currentIndex}
                                title={`Ir para questão ${index + 1}`}
                                className={`
                                    w-3 h-3 rounded-full border transition-all duration-300
                                    ${dotClass}
                                    ${index > currentIndex ? 'cursor-not-allowed opacity-30' : 'cursor-pointer hover:scale-110'}
                                `}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}