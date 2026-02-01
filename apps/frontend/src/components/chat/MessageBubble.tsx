import { Message } from "@/model/Message"
import { ContentMD } from "../shared/ContentMD";
/*
import ConteudoMD from "../shared/ConteudoMD"
import Image from "next/image"

export interface BalaoMensagemProps {
	mensagem: Message
	omitAuthor?: boolean
}

export default function BalaoMensagem(props: BalaoMensagemProps) {
	return props.mensagem.side === "left" ? (
		<BalaoEsquerdo {...props} />
	) : (
		<BalaoDireito {...props} />
	)
}

function BalaoEsquerdo(props: BalaoMensagemProps) {
	return (
		<div className="flex gap-4">
			{!props.omitAuthor && (
				<Image src="/chat.svg" alt="Assistente" width={40} height={40} />
			)}
			<div className={`flex flex-col ${props.omitAuthor && "pl-16"}`}>
				{!props.omitAuthor && (
					<span className="text-xs text-zinc-600">{props.mensagem.author}</span>
				)}
				<div className="bg-black text-white px-7 py-4 sm:w-80 rounded-r-3xl rounded-bl-3xl">
					<ConteudoMD markdown={props.mensagem.text} />
				</div>
			</div>
		</div>
	)
}

function BalaoDireito(props: BalaoMensagemProps) {
	return (
		<div className={`flex flex-col items-end ${props.omitAuthor && "pr-2"}`}>
			{!props.omitAuthor && (
				<span className="text-xs text-zinc-600">{props.mensagem.author}</span>
			)}
			<div className="bg-blue-800 text-white px-7 py-4 sm:w-80 rounded-l-3xl rounded-br-3xl">
				<ConteudoMD markdown={props.mensagem.text} />
			</div>
		</div>
	)
}
*/  
interface MessageBubbleProps {
    message: Message
    omitAuthor?: boolean
}

export function MessageBubble({ message, omitAuthor }: MessageBubbleProps) {
    const isBot = message.side === "left";

    return (
        <div className={`flex w-full ${isBot ? "justify-start" : "justify-end"} mb-3 fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex max-w-[85%] ${isBot ? "flex-row" : "flex-row-reverse"} gap-2`}>                
                {!omitAuthor && (
                    <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-900/20 p-px border border-cyan-500/30 self-end mb-1">
                        <div className="w-full h-full rounded-full overflow-hidden">
                             {isBot ? (
                                <img src="/Mascot.png" alt="Bot" />
                             ) : (
                                <div className="w-full h-full bg-slate-700 flex items-center justify-center text-[8px] font-bold text-white">
                                    Você
                                </div>
                             )}
                        </div>
                    </div>
                )}
                {omitAuthor && <div className="w-8" />}

                <div className={`
                    relative px-4 py-3 text-xs leading-relaxed shadow-md
                    ${isBot 
                        ? "bg-slate-800 text-gray-100 rounded-2xl rounded-bl-none border border-white/5" 
                        : "bg-cyan-600 text-white rounded-2xl rounded-br-none shadow-[0_0_10px_rgba(8,145,178,0.3)]"
                    }
                `}>
                    <div className="whitespace-pre-wrap font-sans">
                        <ContentMD markdown={message.text} />
                    </div>
                </div>
            </div>
        </div>
    )
}