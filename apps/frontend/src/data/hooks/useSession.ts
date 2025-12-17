import { useContext } from 'react'
import { SessionContext } from '../context/SessionContext'

export const useSession = () => useContext(SessionContext)