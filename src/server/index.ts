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
    socketId: string
    user: string
    address: string
}

let onlineUsers: IOnlineUser[] = []

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('new-user-add', (user: string) => {
        onlineUsers.push({
            socketId: socket.id,
            user,
            address: socket.handshake.address,
        })

        // emit only user & address from onlineUsers
        io.emit('get-users', [
            ...new Set(
                onlineUsers.map((user) => ({
                    user: user.user,
                    address: user.address,
                }))
            ),
        ])
    })

    socket.on('offline', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
        io.emit('get-users', [
            ...new Set(
                onlineUsers.map((user) => ({
                    user: user.user,
                    address: user.address,
                }))
            ),
        ])
    })

    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
        io.emit('get-users', [
            ...new Set(
                onlineUsers.map((user) => ({
                    user: user.user,
                    address: user.address,
                }))
            ),
        ])
    })
})

server.listen(Number(process.env.PORT ?? 3000), () => {
    console.log(
        `Listening on http://localhost:${Number(process.env.PORT ?? 3000)}`
    )
})
