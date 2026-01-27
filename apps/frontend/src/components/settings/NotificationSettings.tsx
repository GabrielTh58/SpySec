import { ToggleItem } from "@/components/settings/ToggleItem";
import { Trash2 } from "lucide-react";

export function NotificationSettings() {
    return (
        <div className="space-y-6">
             <div>
                <h3 className="font-orbitron text-lg text-white mb-1">Alertas de Inteligência</h3>
                <p className="text-sm text-gray-500 mb-6">Escolha como o SpySec se comunica com você.</p>
            </div>

            <div className="space-y-4">
                <ToggleItem 
                    title="Alertas de Login Suspeito" 
                    desc="Receba um e-mail sempre que houver um login de um novo dispositivo."
                    defaultChecked={true}
                />
                <ToggleItem 
                    title="Lembrete de Missões" 
                    desc="Seja notificado quando você perder sua ofensiva (streak)."
                    defaultChecked={true}
                />
                <ToggleItem 
                    title="Novas Badges Disponíveis" 
                    desc="Saiba quando novas conquistas forem adicionadas à plataforma."
                    defaultChecked={false}
                />
                <ToggleItem 
                    title="Marketing e Ofertas" 
                    desc="Receba novidades sobre planos e recursos."
                    defaultChecked={false}
                />
            </div>

             <hr className="border-gray-800 my-8" />

             {/* Danger Zone */}
             <div className="p-4 border border-red-900/30 bg-red-900/5 rounded-xl">
                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                    <Trash2 size={16} /> Zona de Perigo
                </h4>
                <p className="text-xs text-red-300/70 mb-4">
                    Ao deletar sua conta, todo o seu XP, conquistas e progresso serão perdidos permanentemente. Não é possível desfazer.
                </p>
                <button className="text-xs px-3 py-2 bg-red-950 border border-red-900 text-red-400 rounded hover:bg-red-900 transition-colors">
                    Solicitar Exclusão de Conta
                </button>
             </div>
        </div>
    )
}