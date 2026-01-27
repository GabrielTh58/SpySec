import { CheckCircle2, Circle, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export function SecurityGoalsWidget() {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Verificar sessões ativas no Google", done: true, type: 'system' },
        { id: 2, text: "Ativar 2FA no Instagram", done: false, type: 'system' },
        { id: 3, text: "Trocar senha do Wi-Fi de casa", done: false, type: 'system' },
    ]);
    
    const [inputValue, setInputValue] = useState("");

    const toggle = (id: number) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    };

    const addTask = (e: any) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        
        const newTask = {
            id: Date.now(),
            text: inputValue,
            done: false,
            type: 'user' 
        };
        
        setTasks([...tasks, newTask]);
        setInputValue("");
    };

    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="mt-6 p-5 bg-linear-to-b from-cyan-950/7 to-black/20 border border-cyan-500/20 rounded-xl h-full flex flex-col glass-effect">
            <h4 className="text-cyan-400 font-orbitron text-sm mb-4 uppercase tracking-wider font-bold flex items-center gap-2">
                <CheckCircle2 size={16} />
                Metas de Segurança
            </h4>
            
            <form onSubmit={addTask} className="flex gap-2 mb-4">
                <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ex: Fazer backup das fotos..." 
                    className="flex-1 bg-black/40 border border-cyan-500/30 rounded px-3 py-1.5 text-xs text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <button 
                    type="submit"
                    className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 p-1.5 rounded border border-cyan-500/30 transition-all"
                >
                    <Plus size={16} />
                </button>
            </form>
            
            <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar max-h-[200px] pr-1">
                {tasks.map((task) => (
                    <div 
                        key={task.id} 
                        className={`group flex items-center justify-between p-2 rounded transition-all border ${
                            task.done 
                            ? 'bg-cyan-500/5 border-transparent opacity-60' 
                            : 'bg-white/5 border-white/5 hover:border-cyan-500/30'
                        }`}
                    >
                        <div 
                            className="flex items-center gap-3 cursor-pointer flex-1"
                            onClick={() => toggle(task.id)}
                        >
                            {task.done 
                                ? <CheckCircle2 size={16} className="text-cyan-500 shrink-0" /> 
                                : <Circle size={16} className="text-gray-500 shrink-0 group-hover:text-cyan-400" />
                            }
                            <span className={`text-xs select-none ${task.done ? 'text-gray-500 line-through' : 'text-gray-200'}`}>
                                {task.text}
                            </span>
                        </div>

                        <button 
                            onClick={() => removeTask(task.id)}
                            className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                        >
                            <Trash2 size={12} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}