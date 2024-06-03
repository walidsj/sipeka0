import { Hono } from 'hono'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/app/api/root'
import { createTRPCContext } from '@/server/trpc'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server'

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
            process.env.NODE_ENV === 'development'
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

if (process.env.NODE_ENV === 'production') {
    app.use('*', serveStatic({ root: './build' }))
}
app.use('/api/*', cors())
app.all('/api/trpc/*', (c) => handler(c.req.raw))
app.post('/api/trpc/*', (c) => handler(c.req.raw))

serve({
    fetch: app.fetch.bind(app),
    port: Number(process.env.PORT ?? 8080),
})

console.log(`Listening on http://localhost:${Number(process.env.PORT ?? 8080)}`)
