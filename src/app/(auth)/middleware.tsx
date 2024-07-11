import { useAuth } from '@/lib/auth'
import { Navigate, Outlet } from 'react-router-dom'

export default function Protected() {
    const { token } = useAuth()

    if (token) {
        return <Navigate to="/home" replace />
    }

    return <Outlet />
}
