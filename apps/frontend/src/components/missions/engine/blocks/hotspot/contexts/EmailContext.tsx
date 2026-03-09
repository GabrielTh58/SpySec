import { BodyNode } from "../HotspotBlock";

interface EmailContextProps{
    data: any
    renderNodes: (nodes?: BodyNode[]) => React.ReactNode;
}

export function EmailContext({data, renderNodes}: EmailContextProps) {
    const { body, context } = data
    const { sender, subject } = context

    return (
        <div className="relative w-full max-w-2xl mx-auto bg-[#0F1423] border border-gray-700 rounded-lg overflow-hidden shadow-2xl font-sans text-sm md:text-base">
            <div className="bg-gray-800 border-b border-gray-700 p-3 md:p-4 space-y-2 md:space-y-3">
                <div className="flex gap-2 items-center">
                    <span className="text-gray-400 w-16 text-right font-medium text-xs uppercase tracking-wide shrink-0">De:</span>
                    <span className="text-white font-mono bg-gray-900 px-2 py-0.5 rounded border border-gray-700 w-full truncate text-xs md:text-sm">
                        {renderNodes(sender)}
                    </span>
                </div>
                <div className="flex gap-2 items-center relative">
                    <span className="text-gray-400 w-16 text-right font-medium text-xs uppercase tracking-wide shrink-0">Para:</span>
                    <div className="flex-1 flex items-center justify-between bg-gray-900 border border-gray-700 rounded px-2 py-0.5 min-h-[28px]">
                        <span className="text-gray-500 text-xs md:text-sm truncate">voce@spysec.com</span>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <span className="text-gray-400 w-16 text-right font-medium text-xs uppercase tracking-wide shrink-0">Assunto:</span>
                    <span className="text-white font-bold truncate text-xs md:text-sm">{subject || "Sem assunto"}</span>
                </div>
            </div>
            <div className="p-4 md:p-6 text-gray-300 min-h-[200px] whitespace-pre-wrap leading-relaxed font-light font-sans">
                {renderNodes(body)}
            </div>
        </div>
    );
};