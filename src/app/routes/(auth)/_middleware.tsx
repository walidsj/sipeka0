import { useAuth } from '@/web/lib/auth'
import { Navigate, Outlet } from 'react-router-dom'

export default function MustPublic() {
    const { token } = useAuth()

    if (token) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}
