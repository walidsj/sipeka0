import { useAuth } from '@/lib/auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function Middleware() {
    const { pathname } = useLocation()

    const { token } = useAuth()

    if (!token) {
        return <Navigate to={`/login?redirect=${pathname}`} replace />
    }

    return <Outlet />
}
