'use client'
import { ChevronLeft, ChevronRight, Home, Map, Settings, Trophy, X } from 'lucide-react'
import { SidebarItem } from './SidebarItem'
import { Logo } from '../shared/Logo'
import { useSideBar } from '../../data/hooks/useSideBar'

interface MenuProps {
    className?: string
}

export const SIDEBAR_ITEMS = [
    {
        href: '/dashboard',
        text: 'Dashboard',
        icon: Home,
    },
    {
        href: '/tracks',
        text: 'Trilhas',
        icon: Map,
    },
    {
        href: '/achievements',
        text: 'Conquistas',
        icon: Trophy,
    },
    {
        href: '/settings',
        text: 'Configurações',
        icon: Settings,
    },
]


export function Sidebar(props: MenuProps) {
    const { mini, itemClickedMenu, open, drawer, closeMenu, toggleMenu } = useSideBar()

    function renderItems(mini: boolean) {
        return SIDEBAR_ITEMS.map(({ href, text, icon: Icon }) => (
            <SidebarItem
                key={href}
                href={href}
                text={text}
                icon={<Icon size={20} />}
                mini={mini}
                onClick={itemClickedMenu}
            />
        ))
    }

    return (
        <>
            {!drawer && (
                <aside
                    style={{ width: mini ? 76 : 300 }}
                    className={`relative flex flex-col overflow-y-auto bg-black/30 border-0 
                        ${mini && 'items-center'} ${props.className ?? ''}
                    `}
                >
                    <div className={`flex justify-between items-center min-h-[74px] py-3 ${mini ? 'px-2 flex-col' : 'px-5'}`}>
                        <Logo mini={mini} />
                        <div 
                            className={`hidden xl:flex items-center text-gray-400}`} 
                            onClick={toggleMenu}
                        >
                            <ChevronLeft size={12} />
                            <ChevronRight size={12} />
                        </div>
                    </div>

                    <div className={`flex flex-col flex-1 gap-1 ${mini && 'items-center'}`}>
                        {renderItems(mini)}
                    </div>
                </aside>
            )}

            {drawer && open && (
                <div className="fixed inset-0 z-40 flex md:hidden">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={closeMenu} />

                    <aside className="relative z-50 w-[min(260px,85vw)] max-w-full h-full bg-gradient-cyan
                        shadow-xl flex flex-col transition-transform duration-300 ease-in-out"
                    >
                        <div className="flex justify-between items-center min-h-[74px] py-3 px-5">
                            <Logo mini={false} />

                            <button
                                className="text-gray-300 hover:text-white ml-2"
                                onClick={closeMenu}
                                aria-label="Fechar menu"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="flex flex-col flex-1 gap-1">
                            {renderItems(false)}
                        </div>
                    </aside>
                </div>
            )}
        </>
    )
}

