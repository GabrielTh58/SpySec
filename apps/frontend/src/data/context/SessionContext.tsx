'use client'

import { createContext, useCallback, useEffect, useState } from 'react'
import cookie from 'js-cookie'
import { UserDTO } from '@spysec/auth-adapter'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/localStorage'
import axios, { AxiosError } from 'axios'

interface Session {
    token: string | null
    user: UserDTO | null
}

interface StartSessionInput {
    token: string;
    user: UserDTO;
}

interface SessionContextProps {
    loading: boolean
    token: string | null
    user: UserDTO | null
    startSession: (input: StartSessionInput) => void
    endSession: () => void
}

const TOKEN_COOKIE = '_spysec_token'
const USER_STORAGE = '_spysec_user'
const API_URL = process.env.NEXT_PUBLIC_API_URL

export const SessionContext = createContext<SessionContextProps>({} as any)

export function SessionProvider(props: any) {
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState<Session>({ token: null, user: null })

    const startSession = useCallback((input: StartSessionInput) => {   
        cookie.set(TOKEN_COOKIE, input.token, { expires: 15 }) 
        setLocalStorage(USER_STORAGE, input.user)  

        setSession({ 
            token: input.token, 
            user: input.user 
        })
    }, [])
    
    const endSession = useCallback(() => {
        cookie.remove(TOKEN_COOKIE)   
        removeLocalStorage(USER_STORAGE)     
        setSession({ token: null, user: null })
    }, [])
    
    const validateAndRefreshUser = useCallback(async (token: string) => {
        try {
            const response = await axios.get(`${API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            
            const freshUser = response.data as UserDTO            
      
            setLocalStorage(USER_STORAGE, freshUser)
            setSession({ token, user: freshUser })
        } 
        catch (error: any) {
            const axiosError = error as AxiosError;
            const status = axiosError.response?.status;
            if (status === 401) {
                endSession();
            } else {
                console.error("Error while validating, using cache")
            }
        }
    }, [endSession])

    useEffect(() => {
        async function initialize() {
            setLoading(true)
            
            const token = cookie.get(TOKEN_COOKIE)
            const cachedUser = getLocalStorage<UserDTO>(USER_STORAGE)
            
            if (!token) {
                endSession() 
                setLoading(false)
                return
            }
        
            setSession({ 
                token, 
                user: cachedUser || null 
            })

            setLoading(false)
        
            await validateAndRefreshUser(token)
        }

        initialize()
    }, [endSession, validateAndRefreshUser])
    
    return (
        <SessionContext.Provider
            value={{
                loading,
                token: session.token,
                user: session.user,
                startSession,
                endSession,
            }}
        >
            {props.children}
        </SessionContext.Provider>
    );
}