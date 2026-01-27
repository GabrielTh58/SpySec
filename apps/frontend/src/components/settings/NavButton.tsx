interface NavButtonProps {
    active: boolean;
    onClick: () => void;
    icon: React.ElementType;
    label: string;
}


export function NavButton(props: NavButtonProps) {
    const { active, onClick, icon: Icon, label } = props

    return (
        <button 
            onClick={onClick}
            className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-sm font-medium whitespace-nowrap
                ${active 
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.1)]' 
                    : 'text-gray-500 hover:text-gray-200 hover:bg-gray-800'
                }
            `}
        >
            <Icon size={18} />
            {label}
        </button>
    )
}