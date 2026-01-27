'use client'
import { useState } from "react";
import { User, Lock, Bell, Shield, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings"; 
import { NavButton } from "@/components/settings/NavButton";

type Tab = 'profile' | 'security' | 'notifications';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = {
    profile: {
      label: "Perfil de Agente",
      icon: User,
      component: <ProfileSettings /> 
    },
    security: {
      label: "Segurança & Login",
      icon: Lock,
      component: <SecuritySettings />
    },
    notifications: {
      label: "Notifications",
      icon: Bell,
      component: <NotificationSettings />
    }
  };

  return (
    <div className="flex-1 w-full mx-auto p-4 sm:p-6 md:p-12 min-h-screen animate-fade-in text-gray-200">
      
      {/* HEADER DA PÁGINA */}
      <div className="mb-8 border-b border-gray-800 pb-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-orbitron text-white mb-2 neon-text-glow flex items-center gap-3">
          <div className="p-2 bg-cyan-950/30 border border-cyan-500/30 rounded-lg hidden sm:block">
             <Shield className="text-cyan-400" size={32} />
          </div>
          Configurações do Sistema
        </h2>
        <p className="text-gray-400 text-sm max-w-2xl">
          Gerencie sua identidade, credenciais de acesso e preferências de alerta da plataforma SpySec.
        </p>
      </div>

      {/* LAYOUT PRINCIPAL: GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
        
        {/* --- MENU LATERAL (SIDEBAR) --- */}
        <div className="lg:col-span-3 lg:block">
            {/* Menu Mobile Toggle */}
            <div className="lg:hidden mb-4">
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="flex items-center gap-2 text-sm font-bold text-cyan-400 bg-cyan-950/30 px-4 py-2 rounded-lg border border-cyan-500/30 w-full"
                >
                    <Menu size={18} /> 
                    {isMobileMenuOpen ? "Fechar Menu" : "Menu de Opções"}
                </button>
            </div>

            {/* Navegação */}
            <nav className={`
                flex-col gap-2 
                ${isMobileMenuOpen ? 'flex' : 'hidden lg:flex'}
            `}>
                <NavButton 
                    active={activeTab === 'profile'} 
                    onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }} 
                    icon={User} 
                    label="Perfil" 
                />
                <NavButton 
                    active={activeTab === 'security'} 
                    onClick={() => { setActiveTab('security'); setIsMobileMenuOpen(false); }} 
                    icon={Lock} 
                    label="Segurança" 
                />
                <NavButton 
                    active={activeTab === 'notifications'} 
                    onClick={() => { setActiveTab('notifications'); setIsMobileMenuOpen(false); }} 
                    icon={Bell} 
                    label="Notificações" 
                />
            </nav>
        </div>

        {/* --- ÁREA DE CONTEÚDO --- */}
        <div className="lg:col-span-9">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 md:p-8 backdrop-blur-sm min-h-[500px]"
            >
                <div className="mb-6 pb-4 border-b border-gray-800/50 flex items-center gap-3 lg:hidden">
                    {(() => {
                        const Icon = tabs[activeTab].icon;
                        return <Icon className="text-cyan-500" size={20} />
                    })()}
                    <h3 className="text-xl font-bold text-white">{tabs[activeTab].label}</h3>
                </div>

                {tabs[activeTab].component}
            </motion.div>
        </div>

      </div>
    </div>
  )
}
