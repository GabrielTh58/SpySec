import { ReactNode } from "react";

interface NextStepButtonProps{
    disabled?: boolean;
    onClick: () => void
    children: ReactNode
    className?: string
}

export function NextStepButton(props: NextStepButtonProps) {
    const {disabled, onClick, children, className } = props
    const style = className ? className : ''

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-4 sm:px-8 py-3 bg-linear-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white 
            rounded-lg font-bold shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm uppercase 
            tracking-wide cursor-pointer ${style}`}
        >
            {children}
        </button>
    )
}