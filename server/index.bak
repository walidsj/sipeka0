import { serve } from 'bun'
import { createTRPCContext } from './trpc'
import { appRouter } from './api/root'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import index from '@/web/index-bun.html'

const trpcHandler = async (req: Request) =>
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: createTRPCContext,
    })

const isDev = process.env.NODE_ENV !== 'production'

const server = serve({
    development: isDev,
    port: isDev ? 3000 : 8089,
    routes: {
        '/*':
            // isDev ?
            index,
        // : async () => {
        //       const file = Bun.file('./.dist/index.html')
        //       const compressed = Bun.gzipSync(await file.text())
        //       return new Response(compressed, {
        //           headers: {
        //               'Content-Type': file.type,
        //               'Content-Encoding': 'gzip',
        //               'Cache-Control': 'private, max-age=86400, stale-while-revalidate=604800',
        //           },
        //       })
        //   }
        '/assets/*': async (req: Request) => {
            const url = new URL(req.url)
            const filePath = url.pathname.replace('/assets', './.dist')
            const file = Bun.file(filePath)
            if (await file.exists()) {
                const compressed = Bun.gzipSync(await file.arrayBuffer())

                const uint8Array = new Uint8Array(compressed)

                return new Response(uint8Array, {
                    headers: {
                        'Content-Type': file.type,
                        'Content-Encoding': 'gzip',
                        'Cache-Control': 'public, max-age=31536000, immutable',
                    },
                })
            }
            return new Response('File not found', { status: 404 })
        },
        '/public/*': async (req: Request) => {
            const url = new URL(req.url)
            const filePath = url.pathname.replace('/public', './public')
            const file = Bun.file(filePath)
            if (await file.exists()) {
                const compressed = Bun.gzipSync(await file.arrayBuffer())

                const uint8Array = new Uint8Array(compressed)

                return new Response(uint8Array, {
                    headers: {
                        'Content-Type': file.type,
                        'Content-Encoding': 'gzip',
                        'Cache-Control': 'public, max-age=31536000, immutable',
                    },
                })
            }
            return new Response('File not found', { status: 404 })
        },
        '/images/*': async (req) => {
            const url = new URL(req.url)
            const filePath = './public' + url.pathname
            const file = Bun.file(filePath)
            if (await file.exists()) {
                const compressed = Bun.gzipSync(await file.arrayBuffer())

                const uint8Array = new Uint8Array(compressed)

                return new Response(uint8Array, {
                    headers: {
                        'Content-Type': file.type,
                        'Content-Encoding': 'gzip',
                        'Cache-Control': 'public, max-age=31536000, immutable',
                    },
                })
            }
            return new Response('File not found', { status: 404 })
        },
        '/api/trpc/*': { POST: trpcHandler, GET: trpcHandler },
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
