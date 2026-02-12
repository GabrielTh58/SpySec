import { Keyboard } from "lucide-react";

interface InputBlockProps {
    data: {
        question: string;
        placeholder?: string;
        mascotMessage?: string;
    };
    value: string;
    onChange: (v: string) => void;
    isLocked: boolean;  
}

export function InputBlock({ data, value, onChange, isLocked }: InputBlockProps) {
    return (
        <div className="space-y-6 md:space-y-8">
            <h3 className="text-base md:text-xl font-inter font-medium text-white flex gap-3 leading-snug">
                <Keyboard className="w-5 h-5 md:w-6 md:h-6 text-pink-500 shrink-0 mt-1 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]" />
                {data.question}
            </h3>

            <div className="relative group">
                <div className="absolute -inset-[2px] bg-linear-to-r from-cyan-500 to-purple-600 rounded-xl opacity-30 
                    group-focus-within:opacity-50 transition duration-500 blur-sm group-focus-within:blur-md"
                ></div>
                <input
                    type="text"
                    value={value || ''}
                    disabled={isLocked}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={data.placeholder || "Digite a senha ou código..."}
                    className="relative w-full bg-[#0F1423] border border-gray-700 text-white text-base md:text-lg p-3 md:p-4 rounded-xl focus:outline-none
                        focus:border-transparent placeholder:text-gray-600 shadow-xl"
                    autoComplete="off"
                />
            </div>
        </div>
    );  
}