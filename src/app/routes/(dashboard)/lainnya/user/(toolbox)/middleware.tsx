import { useAuth } from '@/web/lib/auth'
import { Navigate, Outlet } from 'react-router-dom'

export default function Protected() {
    const { user } = useAuth()

    if (user?.role !== 'ADMIN') {
        return <Navigate to="/lainnya/user" replace />
    }

    return <Outlet />
}
