import { Server, Socket } from 'socket.io'
import { globals } from '.'

const io = globals.io as Server

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

export { io }
