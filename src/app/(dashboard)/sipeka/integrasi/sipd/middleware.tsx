import { useCookies } from 'react-cookie'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export default function Middleware() {
    const { pathname } = useLocation()
    const [cookie] = useCookies(['sipd_token', 'sipd_refresh_token'])

    if (cookie.sipd_token && cookie.sipd_refresh_token) {
        if (pathname === '/sipeka/integrasi/sipd/login') {
            return <Navigate to="/sipeka/integrasi/sipd/profil" replace />
        }
    }

    if (!cookie.sipd_token || !cookie.sipd_refresh_token) {
        if (pathname !== '/sipeka/integrasi/sipd/login') {
            return <Navigate to="/sipeka/integrasi/sipd/login" replace />
        }
    }

    return <Outlet />
}
