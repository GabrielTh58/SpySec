'use client'
import Link from "next/link";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { motion } from "framer-motion";
import { 
  ArrowRight, ShieldAlert, Lock, ChevronRight, 
  BrainCircuit, Fingerprint, MessageSquareWarning, 
  Building2, User, Terminal, CheckCircle2, Zap,
  Dot
} from "lucide-react";
import { Logo } from "@/components/shared/Logo";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-gray-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
             <Logo /> 
             <span className="font-orbitron font-bold text-lg md:text-xl tracking-wider text-white hidden sm:block">SPYSEC</span>
          </div>
          <div className="flex items-center gap-6">
            <Link 
              href="/login" 
              className="group bg-white hover:bg-cyan-400 text-black px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <span className="flex items-center gap-2">
                Acessar <span className="hidden xs:inline">Plataforma</span> <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
              </span>
            </Link>
          </div>
        </div>
      </nav>

      <BackgroundBeamsWithCollision className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 md:pt-20 relative py-8">
        <FadeIn className="max-w-5xl space-y-6 md:space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full border border-red-500/30 bg-red-950/20 backdrop-blur-sm mb-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <span className="text-[9px] md:text-[10px] font-mono text-red-300 uppercase tracking-widest text-left">
              Aviso: Seu antivírus não protege você disso
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-orbitron tracking-tight text-white leading-[1.2] md:leading-[1.1]">
            O Hacker não quer invadir seu sistema. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-500 block md:inline mt-2 md:mt-0">
              Ele quer hackear você.
            </span>
          </h1>
          
          <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light px-2">
            95% das invasões acontecem por erro humano. Esqueça códigos complexos. 
            Aprenda a blindar sua mente contra golpes reais com a ajuda de quem entende do assunto.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 md:pt-6 w-full sm:w-auto">
            <Link 
              href="/login"
              className="w-full sm:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold text-white shadow-[0_0_30px_rgba(6,182,212,0.2)] hover:shadow-[0_0_50px_rgba(6,182,212,0.4)] transition-all transform hover:-translate-y-1 font-orbitron tracking-wide text-sm md:text-base"
            >
              INICIAR TREINAMENTO
            </Link>
          </div>
        </FadeIn>
      </BackgroundBeamsWithCollision>

      <section className="py-16 md:py-24 bg-gray-950 relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
                <h2 className="text-2xl md:text-4xl font-bold font-orbitron mb-4 text-white">Você é o Alvo.</h2>
                <p className="text-gray-400 text-base md:text-lg">
                    Grandes firewalls não adiantam nada se alguém clica onde não deve. 
                    O cibercrime mudou: eles não atacam máquinas, atacam a psicologia humana.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <FadeIn delay={0.1} className="group bg-gray-900/50 border border-gray-800 hover:border-red-500/50 p-6 md:p-8 rounded-2xl transition-all hover:-translate-y-2">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-800 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-red-500/20 transition-colors">
                        <MessageSquareWarning className="text-red-400" size={24} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Phishing & Engenharia Social</h3>
                    <p className="text-gray-400 text-sm">
                        Aquele e-mail "urgente" do RH ou a promoção imperdível no WhatsApp. É assim que o sequestro de dados começa.
                    </p>
                </FadeIn>

                <FadeIn delay={0.2} className="group bg-gray-900/50 border border-gray-800 hover:border-red-500/50 p-6 md:p-8 rounded-2xl transition-all hover:-translate-y-2">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-800 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-red-500/20 transition-colors">
                        <Lock className="text-red-400" size={24} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">A Ilusão da Senha Forte</h3>
                    <p className="text-gray-400 text-sm">
                        Usar a mesma senha em tudo ou adicionar "123" no final? Um programa leva segundos para quebrar isso.
                    </p>
                </FadeIn>

                <FadeIn delay={0.3} className="group bg-gray-900/50 border border-gray-800 hover:border-red-500/50 p-6 md:p-8 rounded-2xl transition-all hover:-translate-y-2">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-800 rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-red-500/20 transition-colors">
                        <Fingerprint className="text-red-400" size={24} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">Rastro Digital</h3>
                    <p className="text-gray-400 text-sm">
                        Suas redes sociais entregam as respostas das suas perguntas de segurança. Você está se expondo sem saber.
                    </p>
                </FadeIn>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-linear-to-b from-gray-950 to-red-950/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
             <FadeIn>
                <div className="inline-block px-3 py-1 rounded bg-red-500/10 text-red-400 text-[10px] md:text-xs font-bold mb-4 uppercase tracking-wider">
                    O Custo do Erro
                </div>
                <h2 className="text-3xl md:text-5xl font-bold font-orbitron mb-4 md:mb-6 text-white leading-tight">
                    Um clique errado custa caro.
                </h2>
                <p className="text-gray-400 text-base md:text-lg mb-6">
                    Não é apenas sobre "formatar o computador". Para empresas, significa multas milionárias, vazamento de clientes e reputação destruída. Para você, significa fotos vazadas, contas bancárias zeradas e identidade roubada.
                </p>
                <ul className="space-y-3 md:space-y-4 text-sm md:text-base">
                    <li className="flex items-center gap-3 text-gray-300">
                        <ShieldAlert className="text-red-500 shrink-0" size={18} />
                        <span>Sequestro de dados (Ransomware)</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                        <ShieldAlert className="text-red-500 shrink-0" size={18} />
                        <span>Perda total de acesso a redes sociais</span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                        <ShieldAlert className="text-red-500 shrink-0" size={18} />
                        <span>Prejuízos financeiros irrecuperáveis</span>
                    </li>
                </ul>
             </FadeIn>
             
             <FadeIn delay={0.2} className="relative h-full flex items-center justify-center mt-8 md:mt-0">
                 {/* Visual abstrato de "Glitch/Erro" */}
                 <div className="relative w-64 h-64 md:w-full md:max-w-sm aspect-square bg-red-500/5 rounded-full border border-red-500/20 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
                    <div className="absolute w-[120%] h-[2px] bg-red-500/50 top-1/2 animate-scanline"></div>
                    <ShieldAlert size={80} className="md:w-[120px] md:h-[120px] text-red-500/50 animate-pulse" />
                 </div>
             </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-950 border-t border-white/5">
         <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-4xl font-bold font-orbitron mb-4 md:mb-6 text-white">
                A tecnologia sozinha não vai te salvar.
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                Você pode ter o melhor antivírus do mundo, mas ele não impede você de entregar sua senha voluntariamente para um site falso. <br/>
                <span className="text-cyan-400 font-bold block mt-4 text-xl md:text-2xl">A única defesa real é a educação.</span>
            </p>
         </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden bg-gray-900/20">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-900/10 blur-[60px] md:blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center relative z-10">
          
          <FadeIn className="relative flex justify-center order-2 md:order-1 mt-6 md:mt-0">
            <div className="relative w-56 h-56 md:w-96 md:h-96 group cursor-pointer">
                <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-[60px] md:blur-[80px] animate-pulse" />
                <img 
                    src="./Mascot-WB.png" 
                    alt="Spy - Mascote Spysec" 
                    className="relative w-full h-full object-contain animate-float drop-shadow-2xl z-20 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Balão de Fala do Spy */}
                <div className="absolute -top-6 -right-6 bg-gray-900 border border-cyan-500 text-cyan-400 text-xs font-mono p-3 rounded-lg shadow-lg max-w-[180px] hidden md:block animate-in fade-in slide-in-from-bottom-4">
                  "Eu fui programado para encontrar suas falhas. Agora, minha diretriz é garantir que ninguém mais as encontre."                
                  </div>
            </div>
          </FadeIn>

          {/* Texto e Personalidade */}
          <FadeIn delay={0.2} className="space-y-6 order-1 md:order-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs md:text-sm tracking-widest uppercase">
                <Terminal size={14} className="md:w-4 md:h-4" /> Protocolo SPYSEC Iniciado
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-white">
                Conheça o <span className="text-cyan-400">Spy</span>.
            </h2>
            
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                O Spy não nasceu em um laboratório de antivírus. Ele foi gerado nas camadas mais profundas da dark web como uma ferramenta de invasão. <br/><br/>
                Após ser capturado e reconfigurado, sua lealdade mudou, mas seu código não. Ele traz o conhecimento proibido do "outro lado" para treinar você. Ele é sarcástico com a ingenuidade humana, direto nos alertas, e a melhor defesa que você poderia ter.
            </p>

            <div className="p-5 md:p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2 text-sm md:text-base">
                    <BrainCircuit className="text-purple-400" size={18} />
                    Como funciona?
                </h4>
                <p className="text-sm text-gray-400">
                  O Spy não dá aulas; ele te prepara para o campo. Ele transforma cenários reais de ataque em <strong>Missões interativas</strong>. Você ganha XP por pensar como um invasor para aprender a se defender como um profissional.
                </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gray-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-10 md:mb-16">
                <h2 className="text-2xl md:text-4xl font-bold font-orbitron mb-4 text-white">Segurança sem "Technobabble"</h2>
                <p className="text-gray-400 text-sm md:text-base">Tiramos a complexidade. Deixamos apenas o que salva sua pele.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="p-6 rounded-2xl bg-gray-900/30 border border-gray-800">
                    <div className="w-10 h-10 bg-cyan-900/30 rounded flex items-center justify-center text-cyan-400 mb-4 font-bold font-orbitron">01</div>
                    <h3 className="font-bold text-white mb-2">Aprenda Jogando</h3>
                    <p className="text-sm text-gray-400">Gamificação real. Rankings, Badges e XP tornam o aprendizado viciante, não uma obrigação.</p>
                </div>
                <div className="p-6 rounded-2xl bg-gray-900/30 border border-gray-800">
                    <div className="w-10 h-10 bg-cyan-900/30 rounded flex items-center justify-center text-cyan-400 mb-4 font-bold font-orbitron">02</div>
                    <h3 className="font-bold text-white mb-2">Simulações Reais</h3>
                    <p className="text-sm text-gray-400">Identifique e-mails falsos e sites fraudulentos em um ambiente seguro antes que aconteça de verdade.</p>
                </div>
                <div className="p-6 rounded-2xl bg-gray-900/30 border border-gray-800">
                    <div className="w-10 h-10 bg-cyan-900/30 rounded flex items-center justify-center text-cyan-400 mb-4 font-bold font-orbitron">03</div>
                    <h3 className="font-bold text-white mb-2">Rápido e Direto</h3>
                    <p className="text-sm text-gray-400">Lições de 5 a 10 minutos. Perfeito para rotinas corridas de funcionários e estudantes.</p>
                </div>
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8">
                
                {/* Para Público Geral */}
                <FadeIn className="relative bg-gray-900 border border-gray-800 p-6 md:p-8 rounded-3xl overflow-hidden hover:border-cyan-500/30 transition-colors group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <User size={80} className="md:w-[120px] md:h-[120px]" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold font-orbitron text-white mb-4 flex items-center gap-2">
                        <User className="text-cyan-400" size={24} /> Para Você
                    </h3>
                    <p className="text-gray-400 mb-6 min-h-[60px] md:min-h-[80px] text-sm md:text-base">
                        Proteja seu Instagram, seu dinheiro e suas fotos. Pare de ter medo de clicar em links e navegue com confiança.
                    </p>
                    <ul className="space-y-2 mb-8 text-sm text-gray-300">
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-cyan-500 shrink-0"/> Defesa contra golpes</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-cyan-500 shrink-0"/> Configuração de Privacidade</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-cyan-500 shrink-0"/> Gestão de Senhas</li>
                    </ul>
                    <Link href="/login" className="inline-flex items-center text-cyan-400 font-bold hover:gap-2 transition-all text-sm md:text-base">
                        Começar Grátis <ChevronRight size={16}/>
                    </Link>
                </FadeIn>

                {/* Para Empresas */}
                <FadeIn delay={0.2} className="relative bg-gray-900 border border-gray-800 p-6 md:p-8 rounded-3xl overflow-hidden hover:border-purple-500/30 transition-colors group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Building2 size={80} className="md:w-[120px] md:h-[120px]" />
                    </div>
                    <div className="absolute top-4 right-4 bg-purple-500/20 text-purple-300 text-[10px] font-bold px-2 py-1 rounded uppercase">
                        B2B
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold font-orbitron text-white mb-4 flex items-center gap-2">
                        <Building2 className="text-purple-400" size={24} /> Para Empresas
                    </h3>
                    <p className="text-gray-400 mb-6 min-h-[60px] md:min-h-[80px] text-sm md:text-base">
                        O "Human Firewall" é sua melhor defesa. Reduza o risco de vazamento de dados treinando sua equipe de forma mensurável.
                    </p>
                    <ul className="space-y-2 mb-8 text-sm text-gray-300">
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-purple-500 shrink-0"/> Relatórios de Engajamento</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-purple-500 shrink-0"/> Redução de Phishing</li>
                        <li className="flex gap-2"><CheckCircle2 size={16} className="text-purple-500 shrink-0"/> Compliance e Cultura</li>
                    </ul>
                    <Link href="/login" className="inline-flex items-center text-purple-400 font-bold hover:gap-2 transition-all text-sm md:text-base">
                        Treinar Equipe <ChevronRight size={16}/>
                    </Link>
                </FadeIn>

            </div>
        </div>
      </section>

      <section className="py-20 md:py-32 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-900/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-cyan-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

        <FadeIn className="max-w-4xl mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-6xl font-bold font-orbitron mb-6 md:mb-8 text-white">
            Missão Aceita?
          </h2>
          <p className="text-gray-300 mb-8 md:mb-10 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            O conhecimento é a única ferramenta que não pode ser hackeada. <br/>
            Junte-se à Spysec e comece sua jornada.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
            <Link 
                href="/login"
                className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-white text-black hover:bg-cyan-400 rounded-full font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 text-sm md:text-base"
            >
                <Zap size={18} className="fill-current" /> CRIAR CONTA AGORA
            </Link>
          </div>
          <div className="mt-6 text-xs md:text-sm text-gray-500 font-mono">
            <div className="flex items-center justify-center gap-1">
              <Dot size={16} />
              <span>
                Acesso imediato. Nenhum cartão de crédito necessário.
              </span> 
            </div>
          </div>
        </FadeIn>
      </section>

      <footer className="bg-black border-t border-white/10 pt-12 md:pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 mb-12">
                <div className="max-w-xs">
                    <div className="flex items-center gap-2 mb-4 opacity-90">
                        <Logo />
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        Descomplicando a cibersegurança através da gamificação. Treinamento sério, em um ambiente divertido.
                    </p>
                    <div className="text-gray-400 text-sm">
                        <strong>Contato:</strong><br/>
                        <a href="mailto:gabriel@zaytek.com.br" className="hover:text-cyan-400 transition-colors">gabrieloliveira.dev.br@gmail.com</a>
                    </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 w-full md:w-auto">
                    <div>
                        <h4 className="font-bold text-white mb-4 font-orbitron">Plataforma</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="/login" className="hover:text-cyan-400 transition-colors">Login</Link></li>
                            <li><Link href="/register" className="hover:text-cyan-400 transition-colors">Cadastro</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-4 font-orbitron">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Privacidade</Link></li>
                            <li><Link href="#" className="hover:text-cyan-400 transition-colors">Termos</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-700 text-center md:text-left">
                <p>&copy; {new Date().getFullYear()} Gabriel. Curitiba, Brasil.</p>
                <p className="font-mono">SYSTEM_STATUS: ONLINE</p>
            </div>
        </div>
      </footer>
    </div>
  );
}