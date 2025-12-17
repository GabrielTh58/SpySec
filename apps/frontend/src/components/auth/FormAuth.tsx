'use client'
import useFormAuth from '@/data/hooks/useFormAuth'
import { CyberInput } from './Input'
import { GoogleLoginBtn } from './GoogleLoginBtn'
import { MissionButton } from '../ui/MissionButton'
import { ArrowRight, AtSign, Bot, Key, User } from 'lucide-react'
import { ProfileType } from '@spysec/auth'
import { AccountTypeSelector } from './AccountTypeSelector'

export default function FormAuth() {
    const {
        mode,
        name,
        email,
        password,
        profileType,
        alterName,
        alterEmail,
        alterPassword,
        alterProfileType,
        alterMode,
        submit,
    } = useFormAuth()


    const handleAccountTypeChange = (type: ProfileType) => {
        alterProfileType(type);
    }
    return (
        <section className="relative z-10 p-6 sm:p-8 md:p-10 max-w-lg w-full rounded-2xl glass-effect text-center shadow-2xl neon-glow-cyan animate-slideIn">

            <header className="absolute -top-16 left-1/2 -translate-x-1/2 w-full flex flex-col items-center">
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#050810] border-2 border-cyan-400 neon-glow-cyan shadow-lg z-20">
                    <Bot size={48} className="text-cyan-300" strokeWidth={1.5} />
                </div>
                <div className="mt-3 px-4 py-2 bg-black/60 backdrop-blur-md rounded-md border border-cyan-500/30">
                    <p className="font-orbitron text-xs tracking-widest text-cyan-300 typewriter-text">
                        {mode === 'login' ? (
                            'IDENTIFICAÇÃO NECESSÁRIA'
                        ) : (
                            'PROTOCOLO DE RECRUTAMENTO'
                        )}
                    </p>
                </div>
            </header>

            <div className="mt-16 mb-6">
                {mode === 'login' ? (
                    <>
                        <h1 className="font-orbitron text-3xl font-bold text-white tracking-wider">CENTRO DE COMANDO</h1>
                        <p className="text-gray-400 text-sm mt-1">Insira suas credenciais para prosseguir</p>
                    </>
                ) : (
                    <>
                        <h1 className="font-orbitron text-3xl font-bold text-white tracking-wider">NOVO AGENTE</h1>
                        <p className="text-gray-400 text-sm mt-1">Crie sua identidade digital segura</p>
                    </>
                )}
            </div>

            <form className="space-y-4 text-left">
                <div className="space-y-3">
                    <GoogleLoginBtn />
                </div>


                <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 py-2">
                    <div className="flex-1 border-b border-white/10"></div>
                    {mode === 'login' ? (
                        <span className="font-orbitron tracking-widest uppercase">Ou protocolo padrão</span>
                    ) : (
                        <span className="font-orbitron tracking-widest uppercase">Ou Registro manual</span>
                    )}
                    <div className="flex-1 border-b border-white/10"></div>
                </div>

                <div className="space-y-4">
                    {mode === 'register' && (
                        <>
                            <AccountTypeSelector value={profileType} onChange={handleAccountTypeChange} />

                            <CyberInput
                                icon={User}
                                type='text'
                                value={name}
                                onChange={(e) => alterName(e.target.value)}
                                placeholder="Nome"
                                required
                            />
                        </>
                    )}
                    <CyberInput
                        icon={AtSign}
                        type="email"
                        value={email}
                        onChange={(e) => alterEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                    <CyberInput
                        icon={Key}
                        type="password"
                        value={password}
                        onChange={(e) => alterPassword(e.target.value)}
                        placeholder="Senha"
                        required
                    />
                </div>


                <div className="flex items-center justify-end text-xs mt-2">
                    <a href="#" className="text-cyan-400 hover:text-cyan-200 transition-colors duration-200 hover:underline decoration-cyan-500/50 underline-offset-4">
                        Recuperar senha?
                    </a>
                </div>

                <div className="flex mt-6">
                    <button onClick={alterMode} className="flex-1 button-outline">
                        {mode === 'login' ? (
                            <p>
                                Primeira vez aqui?
                                <a href="#" className="font-semibold text-cyan-300 hover:text-purple-400 transition-colors duration-200">
                                    Criar Identidade
                                </a>
                            </p>
                        ) : (
                            <p className="text-xs text-gray-500 pt-6">Já possui credenciais?
                                <a href="#" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors duration-200 uppercase tracking-wide ml-1">
                                    Acessar Base
                                </a>
                            </p>
                        )}
                    </button>
                </div>

                <MissionButton>
                    <span>Iniciar Missão</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </MissionButton>
            </form>
        </section>
    )
}

