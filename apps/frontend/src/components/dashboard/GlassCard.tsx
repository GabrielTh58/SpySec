import { ReactNode } from "react";

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
};
  
export function GlassCard(props: GlassCardProps){
    const { children, hoverEffect, className } = props

    return(
        <div className={`glass-effect rounded-xl p-6 ${hoverEffect ? 'hover:-translate-y-1 transition-transform duration-300' : ''}
            ${className}`}
        >
            {children}
        </div>

    )   
}