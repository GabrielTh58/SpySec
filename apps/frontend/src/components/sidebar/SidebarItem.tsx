'use client'    
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TxtGradient } from "../shared/TxtGradient"
import { Tooltip } from '@mantine/core'

interface SidebarItemProps {
    mini: boolean
    href: string
    text: string
    icon: any
    onClick?: (e: any) => void
}

export function SidebarItem(props: SidebarItemProps) {
    const { mini, href, text, icon } = props

    const path = usePathname()
    const active = path === href
    const finalText = mini ? null : active ? <TxtGradient>{text}</TxtGradient> : text

    function envolver(children: any) {
        return mini ? (
            <Tooltip label={text} color="blue" withArrow position="right">
                {children}
            </Tooltip>
        ) : children
    }

    return envolver(
        <Link key={href} href={href} passHref onClick={props.onClick} className={`
            flex items-center gap-3 mx-4 my-1 px-4 py-3 rounded-lg
            hover:bg-black            
            ${active 
                ? 'bg-cyan-500/10 text-cyan-300 border-l-4 border-cyan-500' 
                : 'text-gray-300 hover:bg-white/5 hover:text-white'}  
        `}>
            <span className="text-white">{icon}</span> 
            {finalText}
        </Link>
    )
}
//border-l-4 border-cyan-500 bg-linear-to-r from-cyan-500/35 to-[black/15]
//v