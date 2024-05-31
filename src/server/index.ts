import { Hono } from 'hono'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { env } from '@/env'
import { appRouter } from '@/app/api/root'
import { createTRPCContext } from '@/server/trpc'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/bun'

const createContext = async (req: Request) => {
    return createTRPCContext({
        headers: req.headers,
    })
}

const handler = (req: Request) =>
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        createContext: () => createContext(req),
        onError:
            env.NODE_ENV === 'development'
                ? ({ path, error }) => {
                      console.error(
                          `❌ tRPC failed on ${path ?? '<no-path>'}: ${
                              error.message
                          }`
                      )
                  }
                : undefined,
    })

const app = new Hono()

if (env.NODE_ENV === 'production') {
    app.use('*', serveStatic({ root: './dist' }))
    app.use('*', serveStatic({ root: './public' }))
}
app.use('/api/*', cors())
app.all('/api/trpc/*', (c) => handler(c.req.raw))
app.post('/api/trpc/*', (c) => handler(c.req.raw))

const server = Bun.serve({
    fetch: app.fetch.bind(app),
    port: env.PORT,
})

console.log(`Listening on ${server.url}`)
