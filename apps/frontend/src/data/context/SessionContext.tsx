'use client'

import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import cookie from 'js-cookie'
import { User } from '@spysec/auth'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/localStorage'
import { jwtDecode } from 'jwt-decode'
import { FirebaseAuthProvider } from '@/adapter/auth/FirebaseAuthProvider'

interface Session {
    token: string | null
    user: User | null
}

interface SessionContextProps {
    loading: boolean
    token: string | null
    user: User | null
    startSession: (input: StartSessionInput) => void
    endSession: () => void
}

interface StartSessionInput {
    token: string;
    user: User;
}

export const SessionContext = createContext<SessionContextProps>({} as any)

export function SessionProvider(props: any) {
    const TOKEN_COOKIE = '_spysec_token'
    const USER_STORAGE = '_spysec_user'

    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState<Session>({ token: null, user: null })


    const authProviderRef = useRef<FirebaseAuthProvider | null>(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        authProviderRef.current = new FirebaseAuthProvider();
        authProviderRef.current.setTokenObserver((newToken) => handleTokenUpdate(newToken))        

        return () => {
            authProviderRef.current = null;
        };
    }, []);

    const loadSession = useCallback(function () {
        setLoading(true)
        try {
            const currentSession = getSession()
            setSession(currentSession)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        loadSession()
    }, [loadSession])

    function startSession(input: StartSessionInput) {
        cookie.set(TOKEN_COOKIE, input.token, { expires: 1 })
        setLocalStorage(USER_STORAGE, input.user)
        const currentSession = getSession()
        setSession(currentSession)
    }

    function endSession() {
        cookie.remove(TOKEN_COOKIE)
        removeLocalStorage(USER_STORAGE)
        setSession({ token: null, user: null })
    }

    function getSession(): Session {
        const token = cookie.get(TOKEN_COOKIE)

        if (!token) {
            return { token: null, user: null };
        }

        try {
            const payload = jwtDecode(token);
            const isValid = payload.exp! > Date.now() / 1000;

            if (!isValid) {
                cookie.remove(TOKEN_COOKIE);
                removeLocalStorage(USER_STORAGE);
                return { token: null, user: null };
            }

            const user = getLocalStorage<User>(USER_STORAGE);

            if (!user) {
                return { token: null, user: null };
            }

            return { token, user }

        } catch (error) {
            console.error("Erro ao decodificar o token da sessão:", error);
            cookie.remove(TOKEN_COOKIE);
            removeLocalStorage(USER_STORAGE);
            return { token: null, user: null };
        }
    }

    const handleTokenUpdate = useCallback((newToken: string | null) => {
        if (newToken) {
            cookie.set(TOKEN_COOKIE, newToken, { expires: 1 });
            setSession(prev => ({
                ...prev,
                token: newToken
            }));
        } else {
            endSession()
        }
    }, []);

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