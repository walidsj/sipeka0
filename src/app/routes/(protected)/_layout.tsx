import { useCookies } from 'react-cookie'
import { Navigate, Outlet } from 'react-router-dom'

export default function Protected() {
    const [cookies] = useCookies(['token'])

    if (!cookies.token) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}
