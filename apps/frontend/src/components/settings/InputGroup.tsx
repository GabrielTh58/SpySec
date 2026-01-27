import { ComponentProps } from "react";

interface InputGroupProps extends ComponentProps<'input'> {
    label: string;
    error?: string; 
}

export function InputGroup(
    { label, error, disabled, className, ...props }: InputGroupProps
) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            <label className="text-xs uppercase tracking-wider text-gray-500 font-bold">
                {label}
            </label>
            <input
                disabled={disabled}
                className={`
                    w-full bg-gray-950 border border-gray-800 rounded-lg px-4 py-2.5 text-sm text-white 
                    focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all
                    placeholder:text-gray-700
                    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    ${error ? 'border-red-500 focus:border-red-500' : ''}
                    ${className}
                `}
                {...props}
            />
            {error && <span className="text-xs text-red-400">{error}</span>}
        </div>
    );
}