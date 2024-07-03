import { useCookies } from 'react-cookie'
import { api } from '../trpc/react'
import { getQueryKey } from '@trpc/react-query'
import { useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { socket } from './socket'

export function useAuth() {
    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const queryClient = useQueryClient()

    const {
        data: user,
        isLoading,
        isError,
        error,
    } = api.user.getProfile.useQuery(undefined, {
        enabled: !!cookies.token,
    })

    if (isError && error.data?.code === 'UNAUTHORIZED') {
        toast.error('Maaf, silakan login kembali')
        logout()
    }

    function login(token: string) {
        setCookie('token', token, {
            path: '/',
            sameSite: 'strict',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        })
    }

    function logout() {
        const userKey = getQueryKey(api.user.getProfile, undefined)
        queryClient.removeQueries({ queryKey: userKey })
        socket.emit('offline')
        removeCookie('token')
    }

    return { login, logout, token: cookies.token ?? '', user: user, isLoading }
}
