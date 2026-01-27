interface ConnectorProps {
    status: 'completed' | 'active' | 'locked';
}

export function Connector({ status }: ConnectorProps) {
    const styles = {
      completed: "bg-gradient-to-b from-green-500 to-yellow-500",
      active: "bg-cyan-600 path-connector-active shadow-[0_0_10px_rgba(8,145,178,0.5)]",
      locked: "bg-gray-700 opacity-50"
    };
  
    // Se o status for "completed", assumimos que ele conecta a uma missão "active" ou "completed",
    // mas para simplificar visualmente, usamos a lógica do layout HTML original
    const currentStyle = status === 'completed' ? styles.completed 
                       : status === 'active' ? styles.active 
                       : styles.locked;
  
    return <div className={`w-1 h-20 rounded ${currentStyle} my-2 transition-all duration-500`}></div>;
  }
