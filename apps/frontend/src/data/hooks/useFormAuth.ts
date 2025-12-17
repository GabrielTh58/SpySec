import { useEffect, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'
import { ProfileType } from '@spysec/auth'
import { useAPI } from './useAPI'
import { useSession } from './useSession'

export default function useFormAuth() {
    const [mode, setMode] = useState<'login' | 'register'>('login')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profileType, setProfileType] = useState<ProfileType>()
    
    const { httpPost } = useAPI() // arrumar
    const { user, startSession } = useSession()

    const router = useRouter()
    const param = useSearchParams()

    useEffect(() => {
        if (user?.email) {
            const destino = param.get('destino') as string
            router.push(destino ? destino : '/')
        }
    }, [user, router, param])

    function alterMode() {
        setMode(mode === 'login' ? 'register' : 'login')
    }

    async function submit() {
        if (mode === 'login') {
            await login()
        } else {
            await register()
            await login()
        }
        cleanForm()
    }

    async function login() {
        const token = await httpPost('auth/login', { email, password })
        startSession(token)
    }

    async function register() {
        await httpPost('auth/register', { name, email, password, profileType })
    }

    function cleanForm() {
        setName('')
        setEmail('')
        setPassword('')
        setProfileType(ProfileType.PERSONAL)
        setMode('login')
    }

    return {
        mode,
        name,
        email,
        password,
        profileType,
        alterName: setName,
        alterEmail: setEmail,
        alterPassword: setPassword,
        alterProfileType: setProfileType,
        alterMode,
        submit,
    }
}