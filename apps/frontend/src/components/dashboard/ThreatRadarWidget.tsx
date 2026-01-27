import { PhoneOff, MessageCircle, FileWarning, ShieldAlert, ArrowRight } from "lucide-react";

export function ThreatRadarWidget() {
    const threats = [
        { 
            level: "HIGH", 
            type: "FINANCEIRO",
            title: "Golpe da Falsa Central (0800)", 
            desc: "SMS falso informa compra aprovada e pede para ligar num 0800. O atendente é o golpista.",
            icon: PhoneOff,
            date: "Há 2 horas"
        },
        { 
            level: "MED", 
            type: "SOCIAL",
            title: "Golpe da 'Renda Extra' / Tarefa", 
            desc: "Ofertas no WhatsApp para ganhar dinheiro avaliando produtos. É esquema de pirâmide/roubo.",
            icon: MessageCircle,
            date: "Ontem"
        },
        { 
            level: "MED", 
            type: "CORPORATIVO",
            title: "Boletos Falsos em PDF (Malware)", 
            desc: "E-mails com assuntos urgentes (ex: 'Nota Fiscal em Atraso') contendo vírus.",
            icon: FileWarning,
            date: "2 dias atrás"
        },
    ];

    return (
        <div className="mt-6 h-full flex flex-col relative overflow-hidden rounded-xl border border-red-500/20 bg-linear-to-b from-red-950/10 
            to-transparent backdrop-blur-sm"
        >
             <div className="p-5 border-b border-red-500/10 flex items-center justify-between bg-red-500/5">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-red-500/20 rounded text-red-400">
                        <ShieldAlert size={18} />
                    </div>
                    <div>
                        <h4 className="text-red-100 font-orbitron text-sm font-bold tracking-wide">
                            Radar de Ameaças
                        </h4>
                        <p className="text-[10px] text-red-400/80 font-mono">
                            Monitoramento em Tempo Real
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-red-500/10 border border-red-500/20"> 
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <span className="text-[9px] text-red-400 font-bold tracking-wider">LIVE</span>
                </div>
            </div>

            {/* Lista de Ameaças */}
            <div className="p-4 space-y-3 flex-1">
                {threats.map((t, i) => (
                    <div key={i} className="group relative bg-black/40 hover:bg-red-500/5 border border-white/5 hover:border-red-500/30 rounded-lg p-3 transition-all duration-300">
                        <div className="flex gap-4">
                            {/* Ícone com Background Colorido */}
                            <div className={`mt-1 shrink-0 w-10 h-10 rounded-lg flex items-center justify-center border border-white/5 ${
                                t.level === 'HIGH' ? 'bg-red-500/10 text-red-400' : 
                                t.level === 'MED' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'
                            }`}>
                                <t.icon size={20} />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[9px] font-bold px-1.5 rounded-sm border ${
                                            t.level === 'HIGH' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
                                            t.level === 'MED' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                        }`}>
                                            {t.type}
                                        </span>
                                        <span className="text-[10px] text-gray-500">{t.date}</span>
                                    </div>
                                </div>
                                
                                <h5 className="text-sm text-gray-200 font-bold mb-1 group-hover:text-white transition-colors">
                                    {t.title}
                                </h5>
                                <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300">
                                    {t.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Rodapé do Card */}
            <div className="px-5 py-3 border-t border-white/5 bg-black/20 text-center">
                <button className="text-[10px] text-gray-400 hover:text-white flex items-center justify-center gap-1 mx-auto transition-colors uppercase tracking-wider">
                    Ver histórico de alertas <ArrowRight size={12}/>
                </button>
            </div>
        </div>
    )
}