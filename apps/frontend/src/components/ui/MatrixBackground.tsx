'use client';

import { useMatrixRain } from '@/data/hooks/ui/useMatrixRain';
import { useRef } from 'react';

export const MatrixBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);    
    
    useMatrixRain(canvasRef);

    return (
        <canvas 
            ref={canvasRef} 
            className="fixed top-0 left-0 w-full h-full opacity-50 pointer-events-none z-0" 
        />
    );
};
