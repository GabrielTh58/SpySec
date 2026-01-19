'use client'
import { createContext, useEffect, useState } from "react"
import useDimensions from "../hooks/useDimensions"

export interface SidebarContextProps {
    open: boolean
    drawer: boolean
    mini: boolean
    closeMenu: () => void
    openMenu: () => void
    toggleMenu: () => void
    itemClickedMenu: () => void
}

export const SideBarContext = createContext<SidebarContextProps>({
    open: true,
    drawer: false,
    mini: false,
    closeMenu: () => { },
    openMenu: () => { },
    toggleMenu: () => { },
    itemClickedMenu: () => { }
})

export function SideBarProvider({ children }: any) {
    const { smOrLess, lgOrLess } = useDimensions()

    const drawer = smOrLess
    const isTablet = !drawer && lgOrLess

    const [open, setOpen] = useState(false)
    const [mini, setMini] = useState(false) 

    useEffect(() => {
        if (drawer) {
            setOpen(false)
            setMini(false)
        } else if (isTablet) {
            setOpen(true)
            setMini(true)
        } else {
            setOpen(true)
            setMini(false)
        }
    }, [drawer, isTablet])
    


    function toggleMenu() {
        if (drawer) {
            setOpen(prev => !prev)
        }
        else {
            setMini(prev => !prev)
        }
    }

    function itemClickedMenu() {
        if (drawer) setOpen(false)
    }

    function closeMenu() {
        setOpen(false)
    }

    function openMenu() {
        setOpen(true)
    }

    return (
        <SideBarContext.Provider value={{
            open,
            drawer,
            mini: !drawer && mini,
            toggleMenu,
            closeMenu,
            openMenu,
            itemClickedMenu,
        }}>
            {children}
        </SideBarContext.Provider>
    )
}

