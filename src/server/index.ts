import { serve } from 'bun'
import { createTRPCContext } from './trpc'
import { appRouter } from './api/root'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

const trpcHandler = async (req: Request) =>
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: createTRPCContext,
    })

const server = serve({
    development: process.env.NODE_ENV !== 'production',
    port: process.env.NODE_ENV !== 'production' ? 8089 : 8999,
    routes: {
        '/*': async () => {
            const file = Bun.file('./dist/index.html')
            return new Response(file)
        },
        '/api/trpc/*': { POST: trpcHandler, GET: trpcHandler },
        '/assets/*': async (req) => {
            const url = new URL(req.url)
            const filePath = './dist' + url.pathname
            const file = Bun.file(filePath)
            if (await file.exists()) {
                return new Response(file)
            }
            return new Response('File not found', { status: 404 })
        },
        '/images/*': async (req) => {
            const url = new URL(req.url)
            const filePath = './dist' + url.pathname
            const file = Bun.file(filePath)
            if (await file.exists()) {
                return new Response(file)
            }
            return new Response('File not found', { status: 404 })
        },
        '/api/storage/files/belanja/*': async (req) => {
            const url = new URL(req.url)
            const filePath = './storage/files/belanja' + url.pathname.replace('/api/storage/files/belanja', '')
            const file = Bun.file(filePath)
            if (await file.exists()) {
                return new Response(file)
            }
            return new Response('File not found', { status: 404 })
        },
        '/api/storage/files/user-image/*': async (req) => {
            const url = new URL(req.url)
            const filePath = './storage/files/user-image' + url.pathname.replace('/api/storage/files/user-image', '')
            const file = Bun.file(filePath)
            if (await file.exists()) {
                return new Response(file)
            }
            return new Response('File not found', { status: 404 })
        },
    },
})

console.log(`🚀 Server running at ${server.url}`)
