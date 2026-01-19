'use client'
import { Trophy } from "lucide-react";
import { Drawer } from "../sidebar/Drawer";

export function Header(){
    return (
        <header className="w-full self-start flex items-center justify-between py-3 px-4 md:px-6 border-b border-b-cyan-500/20 ">
            <Drawer />
            <div className="flex items-center gap-2">
                <div className="rounded-full p-[2px] bg-gradient-border-cyan">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-black">
                    <img
                        src="/favicon.png"  
                        alt="mascote"
                        className="w-full h-full object-cover"
                    />
                    </div>
                </div>

                    <div>
                        <p className="font-inter font-semibold">John Doe</p>
                        <p className="font-orbitron font-medium text-cyan-500 text-xs">Agente Júnior</p>
                    </div>
                </div>

            <div className="flex items-center gap-12">
                <div className="flex items-center gap-2">
                    <Trophy className="text-yellow-500" size={24}/>
                    <span className="font-orbitron">2</span>
                </div>

                <div className="w-38">
                    <div className="flex justify-between items-center font-orbitron mb-1">
                        <span className="text-[10px] text-cyan-500">Nível 10</span>   
                        <span className="text-[8px] text-slate-400">10/100 xp</span>  
                    </div>
                    <div>
                        {/* progressbar  */}
                        <div className="relative w-full bg-slate-600 h-[6px] rounded-full">
                            <div className="absolute top-0 left-0 w-9 bg-cyan-500 h-[6px] rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}