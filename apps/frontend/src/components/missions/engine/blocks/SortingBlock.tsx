import { Reorder } from "framer-motion";
import { useEffect, useState } from "react";
import { GripVertical, ListOrdered } from "lucide-react";
import { MascotBubble } from "../MascotBubble";

interface SortingBlockProps {
    data: any;
    value: string[];
    onChange: (val: string[]) => void;
    isLocked: boolean;
}

const shuffleArray = (array: any[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

export function SortingBlock({ data, isLocked, value, onChange }: SortingBlockProps) {
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        if (value && value.length > 0) {
            const orderedItems = value.map((id) => data.items.find((item: any) => item.id === id)).filter(Boolean);
            setItems(orderedItems);
        } else {
            setItems(shuffleArray(data.items));
        }
    }, [data.items, value]); 

    const handleReorder = (newOrder: any[]) => {
        if (isLocked) return
        setItems(newOrder);
        onChange(newOrder.map(item => item.id));
    };

    if (items.length === 0) return null;

    return (
        <div className="space-y-8 animate-fade-in">
            <h3 className="text-xl font-medium text-white flex gap-3 font-orbitron">
                <ListOrdered className="text-orange-500 shrink-0 mt-1" />
                {data.question}
            </h3>

            <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-3">
                {items.map((item: any) => (
                    <Reorder.Item 
                        key={item.id} 
                        value={item}
                        className="bg-[#0F1423] border border-gray-700/50 p-4 rounded-xl flex items-center gap-4 cursor-grab active:cursor-grabbing shadow-lg hover:border-orange-500/50 transition-colors group"
                    >
                        <div className="p-2 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
                            <GripVertical className="text-gray-500 group-hover:text-orange-400" size={20} />
                        </div>
                        <span className="text-gray-300 font-mono text-sm md:text-base select-none group-hover:text-white">
                            {item.text}
                        </span>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
}