import { useThreatFeed } from "@/data/hooks/useThreatFeed";
import { ExternalLink, ShieldAlert, Radio } from "lucide-react";

export function ThreatFeedWidget() {
  const { news, isLoading, error } = useThreatFeed();

  // Função para definir cor baseada na severidade
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'border-red-500/50 text-red-400 bg-red-950/20';
      case 'MEDIUM': return 'border-yellow-500/50 text-yellow-400 bg-yellow-950/20';
      default: return 'border-cyan-500/50 text-cyan-400 bg-cyan-950/20';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0F1423]/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 relative overflow-hidden group">
       {/* Background Tech Effect */}
       <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-red-500/50 to-transparent animate-pulse"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="font-orbitron text-lg md:text-xl text-white flex items-center gap-3">
          <ShieldAlert className="text-red-500 animate-pulse" size={20} />
          Radar de ameaças
        </h3>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest border border-gray-700 px-2 py-1 rounded bg-black/40">
           <Radio size={12} className="text-green-500 animate-ping" />
           Live Feed
        </div>
      </div>

      {/* Lista de Notícias */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2 relative z-10 space-y-3">
        {isLoading ? (
          // Skeleton Loading
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-20 bg-gray-800/50 rounded-lg animate-pulse" />
          ))
        ) : error ? (
            <div className="text-red-400 text-center text-sm py-10">{error}</div>
        ) : (
          news.map((item) => (
            <a 
              key={item.id} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block group/item"
            >
              <div className={`
                p-3 rounded-xl border border-gray-800 bg-black/20 hover:bg-gray-800/40 
                transition-all duration-300 relative overflow-hidden
              `}>
                
                {/* Linha Lateral de Severidade */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${getSeverityColor(item.severity).split(' ')[0].replace('border', 'bg')}`}></div>

                <div className="flex justify-between items-start mb-1 pl-3">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getSeverityColor(item.severity)}`}>
                        {item.category}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">{item.date}</span>
                </div>

                <h4 className="text-sm font-medium text-gray-200 group-hover/item:text-white pl-3 leading-snug">
                    {item.title}
                </h4>

                <div className="flex justify-between items-center mt-2 pl-3">
                    <span className="text-[10px] text-gray-500 flex items-center gap-1">
                        Via {item.source}
                    </span>
                    <ExternalLink size={12} className="text-gray-600 group-hover/item:text-cyan-400 transition-colors" />
                </div>
              </div>
            </a>
          ))
        )}
      </div>
      
      {/* Footer Decorativo */}
      <div className="mt-4 pt-3 border-t border-gray-800/50 flex justify-between text-[10px] text-gray-600 font-mono">
        <span>SYNC: AUTO</span>
        <span>LATENCY: 24ms</span>
      </div>
    </div>
  );
}