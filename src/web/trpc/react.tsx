import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { loggerLink, httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { useEffect, useState } from 'react'
import SuperJSON from 'superjson'
import { type AppRouter } from '@/app/api/root'
import { useCookies } from 'react-cookie'

const createQueryClient = () => new QueryClient()

let clientQueryClientSingleton: QueryClient | undefined = undefined
const getQueryClient = () => {
    if (typeof window === 'undefined') {
        return createQueryClient()
    }
    return (clientQueryClientSingleton ??= createQueryClient())
}

export const api = createTRPCReact<AppRouter>()

export type RouterInputs = inferRouterInputs<AppRouter>

export type RouterOutputs = inferRouterOutputs<AppRouter>

export function TRPCReactProvider(props: { children: React.ReactNode }) {
    const [cookies] = useCookies(['token'])

    const queryClient = getQueryClient()

    const clientTrpcInstance = () =>
        api.createClient({
            links: [
                loggerLink({
                    enabled: (op) =>
                        process.env.NODE_ENV === 'development' ||
                        (op.direction === 'down' && op.result instanceof Error),
                }),
                httpBatchLink({
                    transformer: SuperJSON,
                    url: '/api/trpc',
                    headers: () => {
                        const headers = new Headers()
                        headers.set('authorization', cookies.token ?? '')
                        return headers
                    },
                }),
            ],
        })

    const [trpcClient, setTrpcClient] = useState(clientTrpcInstance)

    useEffect(() => {
        setTrpcClient(clientTrpcInstance)
    }, [cookies.token])

    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider client={trpcClient} queryClient={queryClient}>
                {props.children}
            </api.Provider>
        </QueryClientProvider>
    )
}
