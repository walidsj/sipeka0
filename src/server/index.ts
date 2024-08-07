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

app.use('/api/storage/files/belanja/:file', (req, res) => {
    res.sendFile(req.params.file, {
        root: 'storage/files/belanja',
    })
})

app.use(express.static('dist'))

const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
    },
})

type IOnlineUser = {
    userId: number
    nama: string
    isActive: boolean
}
type ITempOnlineUser = {
    socketId: string
    userId: number
    nama: string
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
        ({
            user,
            isActive,
        }: {
            user: { id: number; nama: string }
            isActive: boolean
        }) => {
            tempOnlineUser = tempOnlineUser.filter(
                (tempUser) => tempUser.socketId !== socket.id
            )
            tempOnlineUser.push({
                socketId: socket.id,
                userId: user.id,
                nama: user.nama,
                isActive,
            })

            onlineUsers = Array.from(
                new Set(
                    tempOnlineUser.map((u) => ({
                        userId: u.userId,
                        nama: u.nama,
                    }))
                )
            ).map((user) => ({
                ...user,
                isActive: tempOnlineUser.find(
                    (u) => u.userId === user.userId && u.isActive
                )
                    ? true
                    : false,
            }))

            io.emit('get-users', onlineUsers)
        }
    )

    socket.on('say-hi', (toUserId: number) => {
        const toUserSocket = tempOnlineUser.filter((u) => u.userId === toUserId)
        const getFromUser = tempOnlineUser.find((u) => u.socketId === socket.id)

        const fromUser = onlineUsers.find(
            (u) => u.userId === getFromUser?.userId
        )

        if (toUserSocket && fromUser) {
            toUserSocket.forEach((u) => {
                io.to(u.socketId).emit('incoming-hi', fromUser)
            })
        }
    })

    socket.on('logout', () => {
        const user = tempOnlineUser.find((u) => u.socketId === socket.id)

        tempOnlineUser = tempOnlineUser.filter(
            (tempUser) => tempUser.userId !== user?.userId
        )

        onlineUsers = Array.from(
            new Set(
                tempOnlineUser.map((u) => ({
                    userId: u.userId,
                    nama: u.nama,
                }))
            )
        ).map((user) => ({
            ...user,
            isActive: tempOnlineUser.find(
                (u) => u.userId === user.userId && u.isActive
            )
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
            new Set(
                tempOnlineUser.map((u) => ({
                    userId: u.userId,
                    nama: u.nama,
                }))
            )
        ).map((user) => ({
            ...user,
            isActive: tempOnlineUser.find(
                (u) => u.userId === user.userId && u.isActive
            )
                ? true
                : false,
        }))

        io.emit('get-users', onlineUsers)
    })
})

let port = 8089
if (process.env.NODE_ENV === 'development') port = 8989

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
