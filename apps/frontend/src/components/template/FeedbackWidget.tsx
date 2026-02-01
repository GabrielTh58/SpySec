'use client'
import { MessageSquareWarning, Send, X, Smile, Frown, Meh } from 'lucide-react';
import { useFeedbackWidget } from '@/data/hooks/useFeedbackWidget';

export function FeedbackWidget() {
    const { 
        isOpen, setIsOpen, 
        message, setMessage, 
        type, setType, 
        mood, setMood, 
        sending, submitFeedback 
    } = useFeedbackWidget();


    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className={`
                    fixed bottom-6 left-6 z-40 
                    p-3 rounded-full 
                    bg-black/40 border border-white/10 backdrop-blur-sm
                    text-gray-400 
                    hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-950/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]
                    transition-all duration-300 ease-out cursor-pointer group
                `}
                title="Reportar Feedback"
            >
                <MessageSquareWarning size={20} className="group-hover:scale-110 transition-transform" />
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/80 backdrop-blur-[2px] animate-in fade-in duration-200">
                    <div className="bg-gray-950 border border-gray-800 w-full max-w-md rounded-xl shadow-2xl relative overflow-hidden">
                        
                        <div className="bg-gray-900/50 p-4 border-b border-gray-800 flex justify-between items-center">
                            <h3 className="font-orbitron text-gray-200 text-sm flex items-center gap-2">
                                <MessageSquareWarning size={16} className="text-cyan-500"/>
                                Feedback
                            </h3>
                            <button 
                                onClick={() => setIsOpen(false)} 
                                className="text-gray-500 hover:text-white transition-colors cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>
                        
                        <form onSubmit={submitFeedback} className="p-5 flex flex-col gap-4">
                            
                            <div className="flex gap-2">
                                {['BUG', 'IDEIA', 'OUTRO'].map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        onClick={() => setType(t as any)}
                                        className={`flex-1 py-1.5 text-[10px] font-bold tracking-wider rounded border transition-all cursor-pointer ${
                                            type === t 
                                            ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' 
                                            : 'bg-gray-900 border-gray-800 text-gray-500 hover:border-gray-600'
                                        }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>

                            <textarea 
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                placeholder="Como podemos melhorar?"
                                className="w-full h-28 bg-black/20 border border-gray-800 rounded-lg p-3 text-sm text-gray-300 focus:border-cyan-500/50 focus:bg-gray-900/50 outline-none resize-none placeholder:text-gray-700 transition-all"
                                autoFocus
                            />

                            <div className="flex items-center justify-between pt-1">
                                <div className="flex gap-1">
                                    <button type="button" onClick={() => setMood('HAPPY')} className={`p-1.5 rounded hover:bg-gray-800 cursor-pointer transition ${mood === 'HAPPY' ? 'text-green-400' : 'text-gray-700'}`}><Smile size={18}/></button>
                                    <button type="button" onClick={() => setMood('NEUTRAL')} className={`p-1.5 rounded hover:bg-gray-800 cursor-pointer transition ${mood === 'NEUTRAL' ? 'text-yellow-400' : 'text-gray-700'}`}><Meh size={18}/></button>
                                    <button type="button" onClick={() => setMood('SAD')} className={`p-1.5 rounded hover:bg-gray-800 cursor-pointer transition ${mood === 'SAD' ? 'text-red-400' : 'text-gray-700'}`}><Frown size={18}/></button>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={sending || !message.trim()}
                                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-1.5 rounded-lg font-medium text-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {sending ? '...' : 'Enviar'}
                                    {!sending && <Send size={12} />}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}