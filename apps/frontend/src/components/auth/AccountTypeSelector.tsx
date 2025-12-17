import { ProfileType } from "@spysec/auth";
import { Building2, User } from "lucide-react";

interface AccountTypeSelectorProps {
    value: ProfileType | undefined
    onChange: (type: ProfileType) => void
}

export function AccountTypeSelector({value, onChange}: AccountTypeSelectorProps){
    return(
    <div className="grid grid-cols-2 gap-4 mb-2">
        <button
            type="button"
            onClick={() => onChange(ProfileType.PERSONAL)}
            className={`
          flex flex-col items-center justify-center gap-2 p-4 rounded-lg border transition-all duration-300 relative overflow-hidden group
          ${value === ProfileType.PERSONAL
                    ? 'bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,255,255,0.15)_inset]'
                    : 'bg-black/40 border-white/10 text-gray-500 hover:border-cyan-500/50 hover:text-gray-300'
                }
        `}
        >
            <div className={`p-2 rounded-full ${value === ProfileType.PERSONAL ? 'bg-cyan-500/20' : 'bg-white/5'} transition-colors`}>
                <User size={24} />
            </div>
            <span className="text-xs font-orbitron tracking-wider font-semibold">Pessoal</span>
            {value === ProfileType.PERSONAL && <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-lg animate-pulse"></div>}
        </button>

        <button
            type="button"
            onClick={() => onChange(ProfileType.CORPORATE)}
            className={`
          flex flex-col items-center justify-center gap-2 p-4 rounded-lg border transition-all duration-300 relative overflow-hidden group
          ${value === ProfileType.CORPORATE
                    ? 'bg-purple-500/10 border-purple-400 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.15)_inset]'
                    : 'bg-black/40 border-white/10 text-gray-500 hover:border-purple-500/50 hover:text-gray-300'
                }
        `}
        >
            <div className={`p-2 rounded-full ${value === ProfileType.CORPORATE ? 'bg-purple-500/20' : 'bg-white/5'} transition-colors`}>
                <Building2 size={24} />
            </div>
            <span className="text-xs font-orbitron tracking-wider font-semibold">CORPORATIVO</span>
            {value === ProfileType.CORPORATE && <div className="absolute inset-0 border-2 border-purple-500/30 rounded-lg animate-pulse"></div>}
        </button>
    </div>
)}