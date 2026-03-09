import { AlertTriangle, Lock } from "lucide-react";
import { BodyNode } from "../HotspotBlock";

interface BrowserContextProps{
    data: any
    renderNodes: (nodes?: BodyNode[]) => React.ReactNode;
}

export function BrowserContext({data, renderNodes}: BrowserContextProps) {
    const { body, context } = data;
    const { addressBar, pageTitle, isHttps } = context;

    return (
        <div className="relative w-full max-w-3xl mx-auto bg-[#e5e7eb] border border-gray-600 rounded-xl overflow-hidden shadow-2xl font-sans text-sm text-gray-800">
            <div className="bg-[#d1d5db] px-4 pt-2 flex items-end gap-3">
                <div className="flex gap-1.5 pb-2.5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="bg-[#e5e7eb] px-4 py-1.5 rounded-t-lg text-xs font-medium text-gray-700 truncate max-w-[200px] flex-1">
                    {pageTitle || "Nova Guia"}
                </div>
            </div>
            
            <div className="bg-[#e5e7eb] border-b border-gray-300 p-2 flex items-center gap-2">
                <div className="flex gap-2 text-gray-500 px-2 shrink-0">
                    <span className="cursor-not-allowed font-bold">←</span>
                    <span className="cursor-not-allowed font-bold">→</span>
                    <span className="cursor-not-allowed font-bold">↻</span>
                </div>
                <div className="flex-1 bg-white rounded-full px-3 py-1 flex items-center gap-2 border border-transparent shadow-sm">
                    {isHttps ? (
                        <Lock size={12} className="text-gray-500 shrink-0" />
                    ) : (
                        <div className="flex items-center gap-1 text-red-500 shrink-0 bg-red-50 px-1.5 rounded">
                            <AlertTriangle size={12} />
                            <span className="text-[10px] font-bold">Não seguro</span>
                        </div>
                    )}
                    <span className="text-sm font-mono text-gray-700 w-full truncate flex items-center">
                        {renderNodes(addressBar)}
                    </span>
                </div>
            </div>

            <div className="p-6 md:p-8 min-h-[300px] whitespace-pre-wrap leading-relaxed bg-white">
                {renderNodes(body)}
            </div>
        </div>
    );
};