import { appRouter } from './api/root'
import express from 'express'
import { createServer } from 'node:http'
import { Server, Socket } from 'socket.io'
import {
    createExpressMiddleware,
    type CreateExpressContextOptions,
} from '@trpc/server/adapters/express'
import { getSession } from './auth'
import { db } from './db'
import { env } from '@/env.server'

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

type IOnlineUser = {
    user: string
    isActive: boolean
}
type ITempOnlineUser = {
    socketId: string
    user: string
    isActive: boolean
}

let tempOnlineUser: ITempOnlineUser[] = []
let onlineUsers: IOnlineUser[] = []

io.on('connection', (socket: Socket) => {
    console.log('a user connected')

    socket.on('connected', () => {
        io.emit('get-users', onlineUsers)
    })

    socket.on(
        'online',
        ({ user, isActive }: { user: string; isActive: boolean }) => {
            tempOnlineUser = tempOnlineUser.filter(
                (tempUser) => tempUser.socketId !== socket.id
            )
            tempOnlineUser.push({ socketId: socket.id, user, isActive })

            onlineUsers = Array.from(
                new Set(tempOnlineUser.map((u) => u.user))
            ).map((user) => ({
                user,
                isActive: tempOnlineUser.find(
                    (u) => u.user === user && u.isActive
                )
                    ? true
                    : false,
            }))

            io.emit('get-users', onlineUsers)
        }
    )

    socket.on('logout', () => {
        const user = tempOnlineUser.find((u) => u.socketId === socket.id)

        tempOnlineUser = tempOnlineUser.filter(
            (tempUser) => tempUser.user !== user?.user
        )

        onlineUsers = Array.from(
            new Set(tempOnlineUser.map((u) => u.user))
        ).map((user) => ({
            user,
            isActive: tempOnlineUser.find((u) => u.user === user && u.isActive)
                ? true
                : false,
        }))

        io.emit('get-users', onlineUsers)
    })

    socket.on('disconnect', () => {
        tempOnlineUser = tempOnlineUser.filter(
            (user) => user.socketId !== socket.id
        )
        onlineUsers = Array.from(
            new Set(tempOnlineUser.map((u) => u.user))
        ).map((user) => ({
            user,
            isActive: tempOnlineUser.find((u) => u.user === user && u.isActive)
                ? true
                : false,
        }))

        io.emit('get-users', onlineUsers)
    })
})

let port = Number(env.PORT || 3000)

if (env.NODE_ENV === 'development') port = 8989

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
