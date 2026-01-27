import { useCallback } from 'react'
import { useSession } from './useSession'
import axios, { AxiosResponse } from 'axios'

const URL_BASE = process.env.NEXT_PUBLIC_API_URL

export function useAPI() {
    const { token } = useSession()
       
    const httpGet = useCallback(
        async function <T = any>(path: string, params?: any): Promise<T> {
            const uri = path.startsWith('/') ? path : `/${path}`
            const fullUrl = `${URL_BASE}${uri}`

            try {
                const response: AxiosResponse<T> = await axios.get(fullUrl, {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '', 
                    },                     
                    params
                })
                return response.data
            } catch (error: any) { 
                throw handleAxiosError(error)
            }
        },
        [token]
    )

    const httpPost = useCallback(
        async function <T = any>(path: string, body: any): Promise<T> {
            const uri = path.startsWith('/') ? path : `/${path}`
            const fullUrl = `${URL_BASE}${uri}`

            try {
                const response: AxiosResponse<T> = await axios.post(fullUrl, body, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token ? `Bearer ${token}` : '',
                    },                    
                })
                return response.data
            } catch (error: any) {
                throw handleAxiosError(error)
            }
        },
        [token]
    )

    const httpPatch = useCallback(
        async function <T = any>(path: string, body: any): Promise<T> {
            const uri = path.startsWith('/') ? path : `/${path}`
            const fullUrl = `${URL_BASE}${uri}`

            try {
                const response: AxiosResponse<T> = await axios.patch(fullUrl, body, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token ? `Bearer ${token}` : '',
                    },                    
                })
                return response.data
            } catch (error: any) {
                throw handleAxiosError(error)
            }
        },
        [token]
    )

    function handleAxiosError(error: any) {
        if (error.response) {            
            return error.response.data
        } else if (error.request) {            
            return { message: 'Sem resposta do servidor. Verifique sua conexão.' }
        } else {            
            return { message: 'Erro ao processar requisição.' }
        }
    }

    return { httpGet, httpPost, httpPatch }
}