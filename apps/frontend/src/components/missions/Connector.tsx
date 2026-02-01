interface ConnectorProps {
    status: "LOCKED" | "AVAILABLE" | "COMPLETED";
}

export function Connector({ status }: ConnectorProps) {
    const styles = {
      completed: "bg-gradient-to-b from-green-500 to-yellow-600 shadow-[0_0_10px_rgba(34,197,94,0.4)]",
      available: "bg-cyan-600 shadow-[0_0_15px_rgba(8,145,178,0.6)] animate-pulse", 
      locked: "bg-gray-800 border-l border-r border-gray-700 opacity-40"
    };
  
    // Mapeamento simples
    const currentStyle = 
        status === 'COMPLETED' ? styles.completed :
        status === 'AVAILABLE' ? styles.available : 
        styles.locked;
  
    return (
        <div className={`w-1 h-16 rounded-full ${currentStyle} my-1 transition-all duration-500`} />
    );
}