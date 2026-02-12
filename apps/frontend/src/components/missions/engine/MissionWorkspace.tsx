import { BlockDispatcher } from ".//BlockDispatcher";
import { useMissionEngine } from "@/data/hooks/useMissionEngine";
import { Steps } from "../Steps";

interface MissionWorkspaceProps {
    missionContent: any;
    title: string;
    order: number | string;
    onFinish: (answers: Record<string, any>) => void;
}

export function MissionWorkspace({ missionContent, title, order, onFinish }: MissionWorkspaceProps) {
    const {
        currentBlock,
        currentBlockIndex,
        answers,
        feedback,
        isBlockCompleted,
        isLastBlock,
        isFirstBlock,
        actions
    } = useMissionEngine({ 
        missionContentVO: missionContent, 
        onCompleteMission: onFinish 
    });

    if (!currentBlock) return null;

    return (
        <div className="relative flex-1 w-full min-h-screen mx-auto p-6 md:p-12 animate-fade-in text-white">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full filter blur-[100px] opacity-30"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-900/20 rounded-full filter blur-[100px] opacity-30"></div>
            </div>

            <div className="max-w-[1440px] mx-auto">
                <h2 className="font-orbitron text-2xl md:text-3xl text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-400 text-center mb-16 capitalize tracking-widest drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
                    Missão {order} • {title}
                </h2>

                <div className="flex flex-col lg:flex-row w-full items-start justify-center">
                    <div className="w-full lg:w-64 shrink-0">
                        <Steps
                            blocks={missionContent.blocks}
                            currentIndex={currentBlockIndex}
                            onStepClick={actions.jumpToBlock} 
                            isFinalMission={missionContent.blocks.length > 8}
                        />
                    </div>

                    <div className="flex-1 max-w-3xl md:max-w-5xl w-full">
                        <div className="bg-[#0F1423]/80 backdrop-blur-md border border-gray-800 rounded-b-2xl rounded-r-2xl p-3 md:p-8 
                            shadow-[0_0_50px_rgba(6,182,212,0.05)] min-h-[500px] flex flex-col justify-between transition-all duration-300"
                        >
                            <BlockDispatcher
                                block={currentBlock}
                                value={answers[currentBlock.id]}
                                onChange={(val) => actions.setAnswer(currentBlock.id, val)}
                                isBlockCompleted={isBlockCompleted}
                                feedback={feedback}
                                isLastBlock={isLastBlock}   
                                isFirstBlock={isFirstBlock}
                                onCheck={actions.checkAnswer}
                                onNext={actions.proceedToNext}
                                onPrev={actions.handlePrev}
                            />                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}