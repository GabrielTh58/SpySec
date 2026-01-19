import { CheckCircle, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  id: number;
  title: string;
  message: string;
  type: ToastType;
  exiting?: boolean;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
}

export const ToastContainer = ({ toasts }: ToastContainerProps) => {
  return (
    <div className="fixed top-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id}
          className={`
            bg-[#0a0e1a]/90 backdrop-blur-md border-l-4 
            ${toast.type === 'success' 
              ? 'border-cyan-500 shadow-[0_0_15px_rgba(0,255,255,0.3)]' 
              : 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]'}
            text-white px-4 py-3 rounded shadow-2xl flex items-start gap-3 min-w-[300px] pointer-events-auto
            ${toast.exiting ? 'animate-slide-out' : 'animate-slide-in'}
          `}
        >
          <div className="mt-0.5">
            {toast.type === 'success' 
              ? <CheckCircle size={20} className="text-cyan-400" /> 
              : <AlertTriangle size={20} className="text-red-400" />
            }
          </div>
          <div>
              <h4 className="font-orbitron text-sm font-bold tracking-wide">{toast.title}</h4>
              <p className="text-xs text-gray-300 mt-0.5 font-inter">{toast.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

