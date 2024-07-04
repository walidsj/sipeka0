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
    isActive: boolean
}
type ITempOnlineUser = {
    socketId: string
    user: string
    isActive: boolean
}

let tempOnlineUser: ITempOnlineUser[] = []
let onlineUsers: IOnlineUser[] = []

io.on('connection', (socket) => {
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

server.listen(Number(process.env.PORT ?? 3000), () => {
    console.log(
        `Listening on http://localhost:${Number(process.env.PORT ?? 3000)}`
    )
})
