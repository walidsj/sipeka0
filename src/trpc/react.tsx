import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { loggerLink, httpLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import { type AppRouter } from '@/server/api/root'
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

    const trpcClient = api.createClient({
        links: [
            loggerLink({
                enabled: (op) => import.meta.env.DEV || (op.direction === 'down' && op.result instanceof Error),
            }),
            httpLink({
                url: '/api/trpc',
                headers: () => {
                    const headers = new Headers()
                    if (cookies.token) {
                        headers.set('authorization', cookies.token)
                    }
                    return headers
                },
            }),
        ],
    })

    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider client={trpcClient} queryClient={queryClient}>
                {props.children}
            </api.Provider>
        </QueryClientProvider>
    )
}
