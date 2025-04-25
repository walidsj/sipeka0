import { appRouter } from './api/root'
import express from 'express'
import { createServer } from 'node:http'
import { Server, Socket } from 'socket.io'
import { createExpressMiddleware, type CreateExpressContextOptions } from '@trpc/server/adapters/express'
import { getSession } from './auth'
import { db } from './db'
import _ from 'lodash'
import { createProxyMiddleware } from 'http-proxy-middleware'

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
                      console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`)
                  }
                : undefined,
    })
)

app.use('/api/storage/files/belanja/:file', (req, res) => {
    res.sendFile(req.params.file, {
        root: 'storage/files/belanja',
    })
})
app.use('/api/storage/files/user-image/:file', (req, res) => {
    res.sendFile(req.params.file, {
        root: 'storage/files/user-image',
    })
})

app.use('*', (_req, res) => {
    //load dist/index.html
    res.sendFile('index.html', { root: 'dist' })
})

// Proxy middleware configuration
const proxyOptions = {
    target: 'https://service.sipd.kemendagri.go.id',
    changeOrigin: true,
}

// Create the proxy middleware
const proxyMiddleware = createProxyMiddleware(proxyOptions)

// Use the proxy middleware
app.use('/api/proxy-sipd', proxyMiddleware)

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
    image: string
}
type ITempOnlineUser = {
    socketId: string
    userId: number
    nama: string
    isActive: boolean
    image: string
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
        ({ user, isActive }: { user: { id: number; nama: string; image: string }; isActive: boolean }) => {
            tempOnlineUser = tempOnlineUser.filter((tempUser) => tempUser.socketId !== socket.id)
            tempOnlineUser.push({
                socketId: socket.id,
                userId: user.id,
                nama: user.nama,
                image: user.image,
                isActive,
            })

            onlineUsers = _.uniqBy(tempOnlineUser, 'userId').map((user) => ({
                ...user,
                isActive: tempOnlineUser.find((u) => u.userId === user.userId && u.isActive) ? true : false,
            }))

            io.emit('get-users', onlineUsers)
        }
    )

    socket.on('say-hi', (toUserId: number, message: string) => {
        const toUserSocket = tempOnlineUser.filter((u) => u.userId === toUserId)
        const getFromUser = tempOnlineUser.find((u) => u.socketId === socket.id)

        const fromUser = onlineUsers.find((u) => u.userId === getFromUser?.userId)

        if (toUserSocket && fromUser) {
            toUserSocket.forEach((u) => {
                io.to(u.socketId).emit('incoming-hi', fromUser, message)
            })
        }
    })

    socket.on('logout', () => {
        const user = tempOnlineUser.find((u) => u.socketId === socket.id)

        tempOnlineUser = tempOnlineUser.filter((tempUser) => tempUser.userId !== user?.userId)

        onlineUsers = _.uniqBy(tempOnlineUser, 'userId').map((user) => ({
            ...user,
            isActive: tempOnlineUser.find((u) => u.userId === user.userId && u.isActive) ? true : false,
        }))

        io.emit('get-users', onlineUsers)
    })

    socket.on('disconnect', () => {
        tempOnlineUser = tempOnlineUser.filter((user) => user.socketId !== socket.id)
        onlineUsers = _.uniqBy(tempOnlineUser, 'userId').map((user) => ({
            ...user,
            isActive: tempOnlineUser.find((u) => u.userId === user.userId && u.isActive) ? true : false,
        }))

        io.emit('get-users', onlineUsers)
    })
})

let port = 8089
if (process.env.NODE_ENV === 'development') port = 8989

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})
