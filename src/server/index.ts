import { appRouter } from './api/root'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import {
    createExpressMiddleware,
    type CreateExpressContextOptions,
} from '@trpc/server/adapters/express'
import { getSession } from './auth'
import { db } from './db'
import { env } from '@/env.server'

const globals: { io?: Server } = {}

const app = express()

app.use(
    '/api/trpc',
    createExpressMiddleware({
        router: appRouter,
        createContext: async ({ req }: CreateExpressContextOptions) => ({
            headers: req.headers,
            db,
            session: await getSession(req.headers.authorization ?? ''),
        }),
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
)

app.use(express.static('dist'))

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
    },
})

globals.io = io

server.listen(Number(env.PORT ?? 3000), () => {
    console.log(`Listening on http://localhost:${Number(env.PORT ?? 3000)}`)
})

export { globals }
