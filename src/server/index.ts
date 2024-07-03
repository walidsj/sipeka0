import { appRouter } from '@/app/api/root'
import dotenv from 'dotenv'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import {
    createExpressMiddleware,
    type CreateExpressContextOptions,
} from '@trpc/server/adapters/express'
import { getSession } from './auth'
import { db } from '@/server/db'

dotenv.config()

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
const io = new Server(server, {
    cors: {
        origin: '*',
    },
})

type IOnlineUser = {
    user: string
    status: 'on focus' | 'idle'
}

let onlineUsers: IOnlineUser[] = []

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on(
        'new-user-add',
        ({ user, status }: { user: string; status: 'on focus' | 'idle' }) => {
            onlineUsers = onlineUsers.filter((u) => u.user !== user)
            onlineUsers.push({
                user,
                status,
            })

            // emit only user & address from onlineUsers
            io.emit('get-users', onlineUsers)
        }
    )

    socket.on('offline', (id: string) => {
        onlineUsers = onlineUsers.filter((user) => user.user !== id)
        io.emit('get-users', onlineUsers)
    })

    socket.on('disconnect', () => {
        io.emit('get-users', onlineUsers)
    })
})

server.listen(Number(process.env.PORT ?? 3000), () => {
    console.log(
        `Listening on http://localhost:${Number(process.env.PORT ?? 3000)}`
    )
})
