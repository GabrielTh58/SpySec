import { ReactNode } from "react";

interface NeonButtonProps {
    children: ReactNode;
    className?: string;
  };
  
  export function NeonButton(props: NeonButtonProps){
    const { children, className } = props

    return(
        <button className={`bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 ${className}`}>
            {children}
        </button>
    )
}