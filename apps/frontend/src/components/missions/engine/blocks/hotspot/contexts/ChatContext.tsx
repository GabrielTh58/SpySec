import { BodyNode } from "../HotspotBlock";

interface ChatContextProps{
    data: any
    renderNodes: (nodes?: BodyNode[]) => React.ReactNode;
}

export function ChatContext({data, renderNodes} : ChatContextProps) {
    const { body, context } = data;
    const { sender, platform } = context;

    const isWhatsapp = platform === 'whatsapp';
    return (
        <div className="relative w-full max-w-sm mx-auto bg-[#efeae2] border-8 border-gray-900 rounded-[2.5rem] overflow-hidden shadow-2xl 
            font-sans text-sm md:text-base h-[500px] flex flex-col"
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20"></div>

            <div className={`pt-8 pb-3 px-4 flex items-center gap-3 ${isWhatsapp ? 'bg-[#075e54]' : 'bg-[#1e96c8]'} text-white shadow-md z-10`}>
                <span className="text-xl shrink-0 cursor-not-allowed">‹</span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <span className="text-lg">👤</span>
                </div>
                <div className="flex flex-col flex-1 truncate">
                    <span className="font-medium truncate">{sender || "Desconhecido"}</span>
                    <span className="text-[10px] text-white/80">online</span>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto flex flex-col justify-end bg-gray-200">
                <div className={`max-w-[85%] p-3 mb-2 shadow-sm whitespace-pre-wrap leading-relaxed text-gray-800 relative
                    ${isWhatsapp ? 'bg-white rounded-xl rounded-tl-none' : 'bg-white rounded-2xl rounded-bl-none'}`}>
                    {renderNodes(body)}
                    <div className="text-[9px] text-gray-400 text-right mt-1">Agora</div>
                </div>
            </div>

            <div className="bg-[#f0f0f0] p-2 flex items-center gap-2">
                <div className="flex-1 bg-white rounded-full h-10 px-4 flex items-center text-gray-400 text-sm shadow-inner">
                    Mensagem...
                </div>
            </div>
        </div>
    );
};