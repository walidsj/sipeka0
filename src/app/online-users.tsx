import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth'
import React from 'react'
import { socket } from '@/lib/socket'
import { FaCircle, FaRegCircle } from 'react-icons/fa'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { HiOutlineUser } from 'react-icons/hi'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

type IOnlineUser = {
    userId: number
    nama: string
    isActive: boolean
    image: string
}

const colorImg = ['0ea5e9', '6366f1', '14b8a6', 'eab308', 'ec4899']

export default function OnlineUsers() {
    const auth = useAuth()

    const [isConnected, setIsConnected] = React.useState(socket.connected)
    const [onlineUsers, setOnlineUsers] = React.useState<IOnlineUser[]>([])

    React.useEffect(() => {
        if (!auth.isLoading) {
            if (auth.user) {
                socket.connect()
                if (!onlineUsers.find((user) => user.userId === auth.user?.id)) {
                    socket.emit('online', {
                        user: {
                            id: auth.user.id,
                            nama: auth.user.nama,
                            image: auth.user.image,
                        },
                        isActive: true,
                    })
                }
            } else {
                socket.disconnect()
            }
        }
    }, [auth.user, auth.isLoading, onlineUsers])

    React.useEffect(() => {
        window.onfocus = () => {
            if (auth.user) {
                socket.emit('online', {
                    user: {
                        id: auth.user.id,
                        nama: auth.user.nama,
                        image: auth.user.image,
                    },
                    isActive: true,
                })
            }
        }

        window.onblur = () => {
            if (auth.user) {
                socket.emit('online', {
                    user: {
                        id: auth.user.id,
                        nama: auth.user.nama,
                        image: auth.user.image,
                    },
                    isActive: false,
                })
            }
        }

        return () => {
            window.onfocus = null
            window.onblur = null
        }
    }, [auth.user, onlineUsers])

    React.useEffect(() => {
        function onConnect() {
            setIsConnected(true)
        }

        function onDisconnect() {
            setIsConnected(false)
            setOnlineUsers([])
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)

        socket.on('get-users', (users) => {
            setOnlineUsers(users)
        })

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
        }
    }, [])

    const handleSayHi = (userId: number) => {
        socket.emit('say-hi', userId)
    }

    React.useEffect(() => {
        socket.on('incoming-hi', (fromSocket: IOnlineUser) => {
            toast(() => (
                <div className="flex items-center">
                    <div className="mr-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={`https://ui-avatars.com/api/?name=${fromSocket.nama}&background=${colorImg[fromSocket.userId % 5]}&color=fff`}
                            />
                            <AvatarFallback>
                                <HiOutlineUser />
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div>
                        <div className="font-semibold">{fromSocket.nama}</div>
                        <div className="text-xs text-slate-500">Halo 👋👋</div>
                    </div>
                </div>
            ))
        })

        return () => {
            socket.off('incoming-hi')
        }
    }, [])

    if (!isConnected) return null

    return (
        <Popover>
            <PopoverTrigger disabled={!isConnected}>
                <div className="flex px-5">
                    {onlineUsers
                        .filter((onlineUser) => onlineUser.userId !== auth.user?.id)
                        .map((onlineUser, index) => (
                            <Avatar className={cn('-ml-3 h-6 w-6 bg-white')} key={index}>
                                <AvatarImage
                                    className={cn('transition-all', !onlineUser.isActive && 'opacity-40')}
                                    src={
                                        onlineUser.image
                                            ? `/api/storage/files/user-image/${onlineUser.image}`
                                            : `https://ui-avatars.com/api/?name=${onlineUser.nama}&background=${colorImg[index % 5]}&color=fff`
                                    }
                                />
                                <AvatarFallback>
                                    <HiOutlineUser />
                                </AvatarFallback>
                            </Avatar>
                        ))}
                </div>
            </PopoverTrigger>
            <PopoverContent className="min-w-fit">
                <CardTitle className="mb-4">User Online Lainnya</CardTitle>
                {onlineUsers
                    .filter((onlineUser) => onlineUser.userId !== auth.user?.id)
                    .map((onlineUser, index) => (
                        <div key={index} className="my-3 flex items-center justify-between gap-4">
                            <div className="flex items-center">
                                <Avatar className="mr-2 h-8 w-8">
                                    <AvatarImage
                                        className={cn('transition-all', !onlineUser.isActive && 'opacity-40')}
                                        src={
                                            onlineUser.image
                                                ? `/api/storage/files/user-image/${onlineUser.image}`
                                                : `https://ui-avatars.com/api/?name=${onlineUser.nama}&background=${colorImg[index % 5]}&color=fff`
                                        }
                                    />
                                    <AvatarFallback>
                                        <HiOutlineUser />
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="block truncate text-sm font-semibold">{onlineUser.nama}</div>
                                    <div className="flex items-center text-xs font-normal text-slate-500">
                                        {onlineUser.isActive ? (
                                            <FaCircle className="mr-1 h-2 w-2 text-green-500" />
                                        ) : (
                                            <FaRegCircle className="mr-1 h-2 w-2 text-slate-500" />
                                        )}
                                        Online
                                    </div>
                                </div>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => handleSayHi(onlineUser.userId)}>
                                👋 Say Hi
                            </Button>
                        </div>
                    ))}
                {onlineUsers.length === 0 && <div className="text-sm text-slate-400">Tidak ada user online</div>}
            </PopoverContent>
        </Popover>
    )
}
