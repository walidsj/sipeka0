import { useCookies } from 'react-cookie'

export function useAuth() {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    function login(token: string) {
        setCookie('token', token, {
            path: '/',
            sameSite: 'strict',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        })
    }

    function logout() {
        removeCookie('token')
    }

    return { login, logout, token: cookies.token }
}
