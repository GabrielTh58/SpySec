"use client"
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { MessageCircle, RefreshCcw, Send, Zap } from "lucide-react"
import { useChat } from "@/data/hooks/useChat"
import { MessageBubble } from "./MessageBubble"

export function ChatWindow() {
    const { messages, thinking, addMessage, clearMessages } = useChat()
    const [texto, setTexto] = useState("")
    const fimChatRef = useRef<HTMLDivElement>(null)

    function enviarMensagem() {
        if (!texto.trim()) return
        addMessage(texto)
        setTexto("")
    }

    // Auto-scroll
    useEffect(() => {
        fimChatRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, thinking])

    return (
        <div className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-slate-950 border border-cyan-500/30 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200 backdrop-blur-md">
            
            <div className="p-4 bg-slate-900/90 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 overflow-hidden border border-cyan-500/30">
                         <img src="/Mascote.png" className="w-full h-full" alt="Mascote" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white font-orbitron">Tutor SpyBot</h4>
                        <p className="text-[10px] text-cyan-400 flex items-center gap-1 animate-pulse">
                            <Zap size={10} className="fill-current" /> IA Online
                        </p>
                    </div>
                </div>
                <button 
                    onClick={clearMessages} 
                    className="text-gray-500 hover:text-white transition-colors p-1 hover:bg-white/5 rounded"
                    title="Reiniciar conversa"
                >
                    <RefreshCcw size={16} />
                </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-black/40">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50 gap-3">
                        <div className="p-4 bg-white/5 rounded-full">
                            <MessageCircle size={32} />
                        </div>
                        <p className="text-xs">Como posso ajudar na sua segurança?</p>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {messages.map((mensagem, i) => {
                            const mesmoAutor = i > 0 && messages[i - 1].author === mensagem.author
                            return (
                                <MessageBubble
                                    key={mensagem.id}
                                    message={mensagem}
                                    omitAuthor={mesmoAutor}
                                />
                            )
                        })}
                        
                        {thinking && (
                             <div className="flex items-center gap-2 mb-3 ml-2 fade-in">
                                <div className="w-6 h-6 rounded-full bg-cyan-500/10 p-1">
                                     <img src="https://api.dicebear.com/7.x/bottts/svg?seed=SpySec" className="w-full h-full" />
                                </div>
                                <div className="bg-slate-800 px-3 py-2 rounded-xl rounded-tl-none border border-white/10 flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-0"></span>
                                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-150"></span>
                                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-bounce delay-300"></span>
                                </div>
                            </div>
                        )}
                        <div ref={fimChatRef}></div>
                    </div>
                )}
            </div>

            <div className="p-3 border-t border-white/5 bg-slate-900">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={texto}
                        placeholder="Digite sua dúvida..."
                        className="w-full bg-black/50 border border-white/10 rounded-full pl-4 pr-10 py-2.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 transition-all disabled:opacity-50"
                        disabled={thinking}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setTexto(e.target.value)}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Enter") enviarMensagem()
                        }}
                    />
                    <button
                        className="absolute right-1.5 p-1.5 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={enviarMensagem}
                        disabled={!texto.trim() || thinking}
                    >
                        <Send size={14} />
                    </button>
                </div>
                <div className="text-[9px] text-center text-gray-600 mt-2 font-mono">
                    SpySec AI • Acesso Seguro v1.0
                </div>
            </div>
        </div>
    )
}