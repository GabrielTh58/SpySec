import { useCallback } from 'react'
import { useSession } from './useSession'
import axios, { AxiosResponse } from 'axios'

const URL_BASE = process.env.NEXT_PUBLIC_API_URL

export function useAPI() {
    const { token } = useSession()

    const httpGet = useCallback(
        async function (path: string) {
            const uri = path.startsWith('/') ? path : `/${path}`
            const fullUrl = `${URL_BASE}${uri}`

            try {
                const response: AxiosResponse = await axios.get(fullUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },                     
                })
                return response.data
            } catch (error: any) {
                return handleAxiosError(error)
            }
        },
        [token]
    )

    const httpPost = useCallback(
        async function (path: string, body: any) {
            const uri = path.startsWith('/') ? path : `/${path}`
            const fullUrl = `${URL_BASE}${uri}`

            try {
                const response: AxiosResponse = await axios.post(fullUrl, body, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },                    
                })
                return response.data
            } catch (error: any) {
                return handleAxiosError(error)
            }
        },
        [token]
    )

    function handleAxiosError(error: any) {
        if (error.response) {            
            return error.response.data
        } else if (error.request) {            
            return { error: 'No response from server', details: error.message }
        } else {            
            return { error: 'Request error', details: error.message }
        }
    }

    return { httpGet, httpPost }
}