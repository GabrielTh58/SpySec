import { MissionBlock } from "@spysec/education";
import { MascotBubble } from "./MascotBubble";
import { QuizBlock } from "./blocks/QuizBlock";
import { InputBlock } from "./blocks/InputBlock";
import { InfoBlock } from "./blocks/InfoBlock";
import { MatchingBlock } from "./blocks/MatchingBlock";
import { SortingBlock } from "./blocks/SortingBlock";
import { HotspotBlock } from "./blocks/HotspotBlock";
import { FeedbackDisplay } from "../FeedbackDisplay";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { NextStepButton } from "../NextStepButton";


interface BlockDispatcherProps {
    block: MissionBlock;
    value: any;
    isLastBlock: boolean;
    isFirstBlock: boolean;
    isBlockCompleted: boolean;
    feedback: { type: 'success' | 'error'; message: string; explanation?: string } | null;
    onChange: (val: any) => void;
    onCheck: () => void;
    onNext: () => void;
    onPrev: () => void
}

export function BlockDispatcher(props: BlockDispatcherProps) {
    const { block, value, isLastBlock, feedback, isBlockCompleted, onChange, onCheck, onNext, isFirstBlock, onPrev } = props;
    const isLocked = isBlockCompleted;

    const renderContent = () => {
        switch (block.type) {
            case 'INFO':
                return <InfoBlock data={block.data as any} />;

            case 'QUIZ':
                return <QuizBlock data={block.data as any} value={value} onChange={onChange} isLocked={isLocked} />

            case 'INPUT':
                return <InputBlock data={block.data as any} value={value} onChange={onChange} isLocked={isLocked} />

            case 'MATCHING':
                return <MatchingBlock data={block.data} value={value} onChange={onChange} isLocked={isLocked} />;

            case 'SORTING':
                return <SortingBlock data={block.data} value={value} onChange={onChange} isLocked={isLocked} />;

            case 'HOTSPOT':
                return <HotspotBlock data={block.data} value={value} onChange={onChange} isLocked={isLocked} />;

            default:
                return <div className="text-red-500 p-4 border border-red-500 rounded">Erro: Tipo de bloco desconhecido</div>;
        }
    };

    const hintMessage = (block.data as any).mascotMessage;
    const showhintMessage = !feedback && hintMessage && block.type !== 'INFO';
    const showCheckBtn = !feedback && block.type !== 'INFO';
    const isCheckDisabled = !value && block.type !== 'HOTSPOT';
    const isInfoBlock = block.type === 'INFO';

    return (
        <div className="w-full animate-fade-in flex flex-col h-full">
            <div className="flex-1">
                {renderContent()}
            </div>

            <div className="animate-fade-in mt-4    ">
                {showhintMessage && (
                    <div className="w-full flex justify-start pl-2">
                        <MascotBubble message={hintMessage} variant="hint" />
                    </div>
                )}

                <div className="mt-12 pt-6 border-t border-gray-800 flex justify-between items-center">
                    {showCheckBtn && (
                        <div className="w-full">
                            <div className="w-full mt-8 z-10 flex items-center justify-between">
                                <button
                                    onClick={onPrev}
                                    disabled={isFirstBlock}
                                    className="sm:px-6 py-3 text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium text-sm uppercase tracking-wide cursor-pointer"
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <ArrowLeft size={16} />
                                        <span>Voltar</span>
                                    </div>
                                </button>


                                <NextStepButton
                                    disabled={isCheckDisabled}
                                    onClick={onCheck}
                                >
                                    Verificar
                                </NextStepButton>
                            </div>

                        </div>

                    )}

                    {isInfoBlock && (
                        <div>
                            <div className="w-full flex justify-start pl-2">
                                <MascotBubble message={hintMessage} variant="neutral" />
                            </div>

                            <div className="w-full flex justify-end mt-10">
                                <NextStepButton
                                    onClick={onNext}
                                    className="flex items-center gap-2"
                                >
                                    Continuar
                                    <ArrowRight size={16} />
                                </NextStepButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {feedback && (
                <FeedbackDisplay
                    feedback={feedback}
                    onContinue={onNext}
                    onRetry={() => { }}
                    isLastBlock={isLastBlock}
                />
            )}
        </div>
    )

};

