'use client'

import { useSession } from "@/data/hooks/useSession"
import { usePathname, useRouter } from "next/navigation"
import { Loading } from "../template/Loading"
import { useEffect } from "react"

export function ForceAuth(props: any){
    const { user, loading } = useSession()
    const router = useRouter()
    const path = usePathname()

    useEffect(() => {       
        if(!loading && !user?.email){
            router.push(`/login?destino=${path}`) 
        }
    }, [loading, user, router, path])
   
    if(loading && !user?.email) return <Loading />

    return props.children
}