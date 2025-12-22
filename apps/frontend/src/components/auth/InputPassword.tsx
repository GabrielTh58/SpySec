        import { EyeClosed, EyeIcon, Key} from 'lucide-react';
        import { InputHTMLAttributes } from 'react';

        interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement>{
            fnChangePassword: () => void
            isPasswordVisible: boolean
        }

        export function InputPassword({ fnChangePassword, isPasswordVisible, ...props }: InputPasswordProps){
            
        return (
            <div className="relative group"> 
            <Key 
                size={20} 
                className="text-gray-500 group-focus-within:text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 pointer-events-none"
            />

            <div className='input-cyber flex justify-between items-center rounded-lg text-sm pl-12 pr-4 py-3'>
                <input 
                    {...props}
                    type={isPasswordVisible ? 'text' : 'password'}
                    className={`border-none outline-none w-full  placeholder-gray-500 text-white focus:outline-none border 
                        focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,255,255,0.2)_inset]
                    `} 
                />

                {isPasswordVisible ? (
                    <button type="button" onClick={fnChangePassword}>
                        <EyeClosed                    
                            size={20}
                            className='text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300 pointer-events-none cursor-pointer'
                        />
                    </button>
                ):(
                    <button type="button" onClick={fnChangePassword}>
                        <EyeIcon                     
                            size={20}
                            className='text-gray-400 group-focus-within:text-cyan-400 transition-colors duration-300 pointer-events-none cursor-pointer'
                        />
                    </button>
                )}
                
            </div>
            </div>
        );
        };
