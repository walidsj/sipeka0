import { appRouter } from '@/app/api/root'
import dotenv from 'dotenv'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import * as trpcExpress from '@trpc/server/adapters/express'
import { getSession } from './auth'
import { db } from '@/server/db'

dotenv.config()

const app = express()

app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext: async ({
            req,
        }: trpcExpress.CreateExpressContextOptions) => ({
            headers: req.headers,
            db,
            session: await getSession(req.headers.authorization ?? ''),
        }),
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
)

app.use(express.static('dist'))

const server = createServer(app)
const io = new Server(server)

io.on('connection', () => {
    console.log('a user connected')
})

server.listen(Number(process.env.PORT ?? 3000), () => {
    console.log(
        `Listening on http://localhost:${Number(process.env.PORT ?? 3000)}`
    )
})
