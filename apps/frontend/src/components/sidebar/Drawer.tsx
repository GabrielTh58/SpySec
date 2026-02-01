import { useSideBar } from "@/data/hooks/useSideBar"
import { Menu } from "lucide-react"

export function Drawer(){
    const { drawer, openMenu } = useSideBar()

    if(!drawer) return null

    return(
        <button
            onClick={openMenu}
            className="lg:hidden p-1 text-white"
            aria-label="Abrir menu"
        >
            <Menu size={24} />
         </button>
    )
}