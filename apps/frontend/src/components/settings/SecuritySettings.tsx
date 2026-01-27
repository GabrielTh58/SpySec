import { Lock, LogOut, Monitor, Smartphone } from "lucide-react";
import { InputGroup } from "./InputGroup";
import { SaveButton } from "./SaveButton";
import { SessionItem } from "./SessionItem";

interface SecuritySettingsProps{
    isLoading?: boolean;
    onSave?: () => void;
}

export function SecuritySettings(props: SecuritySettingsProps) {
    const { isLoading, onSave } = props
    
    return (
        <div className="space-y-8">
            <div>
                <h3 className="font-orbitron text-lg text-white mb-4 flex items-center gap-2">
                    <Lock size={18} className="text-cyan-500" /> Alterar Senha
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputGroup label="Senha Atual" type="password" placeholder="••••••••" />
                    <div className="hidden md:block"></div> 
                    <InputGroup label="Nova Senha" type="password" placeholder="••••••••" />
                    <InputGroup label="Confirmar Nova Senha" type="password" placeholder="••••••••" />
                </div>
                <div className="mt-4 flex justify-end">
                     <SaveButton onClick={onSave} isLoading={isLoading} label="Atualizar Senha" />
                </div>
            </div>

            <hr className="border-gray-800" />

            {/* 2FA (Apenas Visual) */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 opacity-75">
                <div>
                    <h4 className="text-white font-bold flex items-center gap-2">
                        Autenticação de Dois Fatores (2FA)
                        <span className="px-2 py-0.5 rounded text-[10px] bg-gray-700 text-gray-300 border border-gray-600 font-mono uppercase">
                            Em Breve
                        </span>
                    </h4>
                    <p className="text-sm text-gray-500 mt-1 max-w-lg">
                        Em breve você poderá adicionar uma camada extra de segurança com Google Authenticator.
                    </p>
                </div>
                
                {/* Botão Estilizado "Desativado" */}
                <button 
                    disabled
                    className="px-4 py-2 bg-gray-800 text-gray-500 text-sm font-bold rounded-lg border border-gray-700 cursor-not-allowed transition-all opacity-70 hover:opacity-70"
                >
                    Recurso Indisponível
                </button>
            </div>

            <hr className="border-gray-800" />

            {/* Sessões Ativas (Simulado) */}
            <div>
                <h3 className="font-orbitron text-lg text-white mb-4">Sessões Ativas</h3>
                <div className="bg-gray-950/50 rounded-xl border border-gray-800 overflow-hidden">
                    <SessionItem 
                        icon={Monitor} 
                        device="Este Dispositivo" 
                        location="Localização Atual" 
                        status="active" 
                        lastActive="Online Agora" 
                    />
                </div>
            </div>
        </div>
    )
}