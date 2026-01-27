import { useState } from "react";

interface ToggleItemProps {
    title: string;
    desc: string;
    defaultChecked?: boolean;
}


export function ToggleItem(props: ToggleItemProps) {
    const { title, desc, defaultChecked } = props
    const [checked, setChecked] = useState(defaultChecked);

    return (
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/30 transition-colors">
            <div className="pr-4">
                <p className="text-sm font-bold text-gray-200">{title}</p>
                <p className="text-xs text-gray-500">{desc}</p>
            </div>
            
            <button 
                onClick={() => setChecked(!checked)}
                className={`
                    w-11 h-6 rounded-full p-1 transition-colors duration-300 relative
                    ${checked ? 'bg-cyan-600 shadow-[0_0_10px_rgba(8,145,178,0.4)]' : 'bg-gray-700'}
                `}
            >
                <div className={`
                    w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300
                    ${checked ? 'translate-x-5' : 'translate-x-0'}
                `}/>
            </button>
        </div>
    )
}