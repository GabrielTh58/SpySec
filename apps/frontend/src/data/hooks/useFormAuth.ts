import { useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ProfileType } from '@spysec/auth'
import { useAPI } from './useAPI'
import { useSession } from './useSession'
import { UserDTO } from '@spysec/auth-adapter'
import { firebaseProvider } from '@/adapter'
import { toast } from 'sonner'

interface AuthAPIResponse {
    accessToken: string;
    user: UserDTO;
    isNewUser: boolean;
}

export interface AuthFormData {
    email: string;
    password: string;
    name?: string; 
    profileType?: ProfileType;
}

export default function useFormAuth() {
    const [mode, setMode] = useState<'login' | 'register'>('login')
    const [loading, setLoading] = useState(false)   
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)   
    
    const { httpPost } = useAPI() 
    const { user, startSession } = useSession()
    const router = useRouter()
    const param = useSearchParams()

    useEffect(() => {
        if (user?.email) {
            const destino = param.get('destino') as string
            router.push(destino ? destino : '/dashboard')
        }
    }, [user, router, param])

    function alterMode() {
        setMode(mode === 'login' ? 'register' : 'login')   
    }   

    async function submit(data: AuthFormData) {
        setLoading(true)     

        try {
            let response: AuthAPIResponse;

            if (mode === 'login') {
                response = await httpPost<AuthAPIResponse>('auth/login', { 
                    email: data.email, 
                    password: data.password 
                })

                toast.success("Acesso Autorizado", {
                    description: "Bem-vindo ao sistema, agente."
                });
            } else {               
                response = await httpPost<AuthAPIResponse>('auth/register', { 
                    name: data.name!, 
                    email: data.email, 
                    password: data.password, 
                    profileType: data.profileType! 
                })

                toast.success("Identidade Criada", {
                    description: "Seu perfil foi registrado na base de dados."
                });            
            }
            
            startSession({
                token: response.accessToken,
                user: response.user
            })           
        } catch (error: any) {
            console.error(error)      
            toast.error("Falha na Operação", {
                description: error?.message || 'Erro ao conectar com o servidor.'
            });
        } finally {
            setLoading(false)
        }
    }

    async function loginWithGoogle(currentProfileType: ProfileType) {
        setLoading(true);

        try {            
            const data = await firebaseProvider.loginWithGoogle(currentProfileType);
            
            startSession({
                token: data.accessToken,
                user: data.user
            });
            toast.success("Autenticação Google", {
                description: "Vínculo estabelecido com sucesso."
            });
        } catch (error: any) {
            console.error(error);
            toast.error("Erro no Google Login", {
                description: error.message
            });
        } finally {
            setLoading(false);
        }
    }

    const handlePasswordVisible = useCallback(() =>{
        setIsPasswordVisible((prev) => !prev)
    }, [])

    return {
        mode,
        loading,
        isPasswordVisible,
        ChangePasswordVisibility: handlePasswordVisible,
        alterMode,
        submit,   
        loginWithGoogle
    }
}