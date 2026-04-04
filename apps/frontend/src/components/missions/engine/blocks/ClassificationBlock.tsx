import { useState } from "react";
import { Layers, Tag, RotateCcw, Box } from "lucide-react";
import { ClassificationData } from "@spysec/education";

interface ClassificationBlockProps {
    data: ClassificationData;
    value: Record<string, string>; 
    onChange: (val: Record<string, string>) => void;
    isLocked?: boolean;
}

export function ClassificationBlock({ data, value = {}, onChange, isLocked }: ClassificationBlockProps) {
    // Encontra o primeiro item que ainda não foi respondido
    const firstUnanswered = data.items.findIndex((item: any) => !value[item.id]);

    // Controla qual item estamos vendo. Se todos foram respondidos, vai para a tela de Resumo (index === length)
    const [currentIndex, setCurrentIndex] = useState(
        firstUnanswered >= 0 ? firstUnanswered : data.items.length
    );

    const isSummaryView = currentIndex >= data.items.length || isLocked;
    const currentItem = data.items[currentIndex];

    const handleCategorySelect = (categoryId: string) => {
        if (isLocked) return;

        // Atualiza a resposta
        const newAnswers: Record<string, string> = { ...value, [currentItem.id]: categoryId };
        onChange(newAnswers);

        // Avança para o próximo item não respondido (ou vai pro resumo)
        const nextUnanswered = data.items.findIndex((item: { id: string }) => !newAnswers[item.id]);
        setCurrentIndex(nextUnanswered >= 0 ? nextUnanswered : data.items.length);
    };

    if (isSummaryView) {
        return (
            <SummaryView 
                isLocked={isLocked}
                data={data}
                setCurrentIndex={setCurrentIndex}
                value={value}
                onChange={onChange}

            />
        );
    }

    return (
        <div className="space-y-6 animate-fade-in w-full">
            {/* Header com Progresso */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h3 className="text-lg md:text-xl font-medium text-white flex gap-3 font-orbitron items-center leading-snug">
                    <Box className="text-cyan-500 shrink-0" size={20} />
                    {data.question}
                </h3>

                <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-full border border-gray-700 shrink-0">
                    <span className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider">Progresso:</span>
                    <span className="text-sm font-bold text-cyan-400 font-mono">
                        {Object.keys(value).length} / {data.items.length}
                    </span>
                </div>
            </div>

            {/* O Cartão Atual */}
            <div className="flex flex-col items-center gap-8 py-4">

                {/* Cartão de Evidência */}
                <div className="w-full max-w-xl bg-gray-800/80 border-2 border-cyan-500/30 rounded-2xl p-8 text-center shadow-[0_0_30px_rgba(6,182,212,0.1)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                    <span className="text-[10px] text-cyan-500 uppercase tracking-widest font-mono mb-4 block">
                        Item para Classificar
                    </span>
                    <p className="text-lg md:text-2xl font-medium text-white leading-relaxed">
                        "{currentItem.text}"
                    </p>
                </div>

                {/* Opções (Categorias) */}
                <div className="w-full max-w-xl">
                    <p className="text-center text-[10px] text-gray-500 uppercase tracking-widest mb-3">
                        Selecione a categoria correspondente
                    </p>
                    <div className="flex flex-wrap justify-center items-stretch gap-4"> 
                        {data.categories.map((category: any) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategorySelect(category.id)}
                                className="
                                    flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-gray-700 bg-[#0F1423] text-gray-300
                                    hover:border-cyan-500 hover:bg-cyan-950/30 hover:text-white hover:scale-105
                                    transition-all duration-200 active:scale-95 cursor-pointer min-w-32
                                "
                            >
                                <Tag size={16} className="text-cyan-500/50" />
                                <span className="text-sm font-medium">{category.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

    
interface SummaryViewProps {
    data: any;
    isLocked?: boolean;
    setCurrentIndex: (idx: number) => void;
    value: Record<string, string>
    onChange: (val: Record<string, string>) => void;
}

function SummaryView(props: SummaryViewProps) {
    const {isLocked, data, setCurrentIndex, value, onChange} = props


    const handleEditItem = (itemId: string) => {
        if (isLocked) return;
        const index = data.items.findIndex((i: any) => i.id === itemId);
        setCurrentIndex(index);
    };

    return (
        <div className="space-y-6 animate-fade-in w-full">
            <div className="flex items-center justify-between">
                <h3 className="text-lg md:text-xl font-medium text-white flex gap-3 font-orbitron items-center">
                    <Layers className="text-cyan-500 shrink-0" size={20} />
                    Resumo da Classificação
                </h3>
                    {!isLocked && Object.keys(value).length > 0 && (
                    <button
                        onClick={() => { onChange({}); setCurrentIndex(0); }}
                        className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                    >
                        <RotateCcw size={12} /> Refazer
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.categories.map((category: any, index:number) => {
                    const itemsInCategory = data.items.filter((item: any) => value[item.id] === category.id);

                    return (

                        <div key={category.id} className="bg-[#0F1423] border border-gray-700 rounded-xl overflow-hidden flex flex-col h-full">
                            <div className="bg-gray-800 border-b border-gray-700 p-3 flex justify-between items-center">
                                <span className="font-medium text-sm text-gray-200">{category.name}</span>
                                <span className="text-[10px] bg-gray-900 px-2 py-0.5 rounded-full text-cyan-400 font-mono">
                                    {itemsInCategory.length}
                                </span>
                            </div>

                            <div className="p-3 flex-1 flex flex-col gap-2 bg-black/20">
                                {itemsInCategory.length === 0 ? (
                                    <div className="text-center text-gray-600 text-xs italic py-4">Vazio</div>
                                ) : (
                                    itemsInCategory.map((item: any) => (
                                        <div
                                            key={item.id}
                                            onClick={() => handleEditItem(item.id)}
                                            className={`
                                            text-xs p-2 rounded border border-gray-700 bg-[#0F1423] text-gray-300
                                            ${!isLocked && 'cursor-pointer hover:border-cyan-500 hover:text-cyan-300 transition-colors group'}
                                        `}
                                        >
                                            {item.text}
                                            {!isLocked && (
                                                <span className="hidden group-hover:inline ml-2 text-cyan-500 text-[10px] uppercase">
                                                    (Alterar)
                                                </span>
                                            )}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}