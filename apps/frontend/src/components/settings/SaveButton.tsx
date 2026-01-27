import { Save } from "lucide-react";

interface SaveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    label?: string;
}


export function SaveButton({ isLoading,  label = "Salvar Alterações", ...props } : SaveButtonProps) {
    return (
        <button 
            disabled={isLoading}
            {...props}  
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-wait"
        >
            {isLoading ? (
                <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Processando...
                </>
            ) : (
                <>
                    <Save size={16} /> {label}
                </>
            )}
        </button>
    )
}