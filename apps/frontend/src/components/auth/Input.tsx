import React, { InputHTMLAttributes } from 'react';
import { LucideIcon } from 'lucide-react';

interface CyberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
}

export const CyberInput = ({ icon: Icon, className, ...props }: CyberInputProps) => {
  return (
    <div className="relative group">
      <Icon 
        size={20} 
        className="text-gray-500 group-focus-within:text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 pointer-events-none" 
      />
      <input 
        {...props}
        className={`input-cyber w-full pl-12 pr-4 py-3 rounded-lg text-sm placeholder-gray-500 text-white focus:outline-none bg-black/40 border border-cyan-500/30 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.2)_inset] ${className}`} 
      />
    </div>
  );
};
