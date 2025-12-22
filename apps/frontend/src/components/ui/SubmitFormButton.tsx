import React, { ButtonHTMLAttributes } from 'react';

interface SubmitFormButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}

export const SubmitFormButton = ({ loading,type, children, className, disabled, ...props }: SubmitFormButtonProps) => {
  return (
    <button 
      type={type}
      {...props}
      disabled={loading || disabled}
      className={`
        w-full relative overflow-hidden transition-all duration-300
        bg-linear-to-r from-cyan-400 to-purple-600
        text-black font-bold font-orbitron text-sm uppercase tracking-wider
        py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 group
        hover:shadow-[0_0_20px_rgba(0,255,255,0.6)] hover:-translate-y-0.5
        disabled:opacity-80 disabled:cursor-not-allowed
        before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-[300%] before:h-[300%]
        before:bg-white/20 before:transition-all before:duration-700 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-45
        hover:before:w-0 hover:before:h-0
        ${className}
      `}
    >
      {loading ? (
          <div className="w-5 h-5 rounded-full border-2 border-black border-l-transparent animate-spin-cyber"></div>
      ) : (
          children
      )}
    </button>
  );
};

