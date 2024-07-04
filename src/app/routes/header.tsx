import { Link } from 'react-router-dom'
import { Button } from '@/web/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/web/components/ui/avatar'
import { useAuth } from '@/web/lib/auth'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu'
import React from 'react'
import { FiLock, FiLogOut } from 'react-icons/fi'
import Loading from '@/web/components/loading'
import { socket } from '@/web/lib/socket'
import { FaCircle, FaRegCircle } from 'react-icons/fa'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/web/components/ui/popover'
import { CardTitle } from '@/web/components/ui/card'
import { cn } from '@/web/lib/utils'

type IOnlineUser = {
    user: string
    isActive: boolean
}

const colorImg = ['0ea5e9', '6366f1', '14b8a6', 'eab308', 'ec4899']

export function Header() {
    const auth = useAuth()
    const [isConnected, setIsConnected] = React.useState(socket.connected)
    const [onlineUsers, setOnlineUsers] = React.useState<IOnlineUser[]>([])

    React.useEffect(() => {
        if (!auth.isLoading) {
            if (auth.user) {
                socket.connect()
                if (
                    !onlineUsers.find((user) => user.user === auth.user?.nama)
                ) {
                    socket.emit('online', {
                        user: auth.user.nama,
                        isActive: true,
                    })
                }
            } else {
                socket.disconnect()
            }
        }
    }, [auth.user, auth.isLoading])

    React.useEffect(() => {
        window.onfocus = () => {
            if (auth.user) {
                socket.emit('online', {
                    user: auth.user.nama,
                    isActive: true,
                })
            }
        }

        window.onblur = () => {
            if (auth.user) {
                socket.emit('online', {
                    user: auth.user.nama,
                    isActive: false,
                })
            }
        }

        return () => {
            window.onfocus = null
            window.onblur = null
        }
    }, [window.onfocus, window.onblur, auth.user])

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

    return (
        <header className="fixed z-50 h-20 w-full bg-background">
            <div className="mx-auto px-5 pr-1 md:px-8 md:pr-6 lg:px-10 lg:pr-6 xl:px-12">
                <div className="flex w-full items-center justify-between">
                    <Link
                        to="/"
                        className="flex h-20 flex-shrink-0 items-center"
                    >
                        <img
                            src="/images/logo-sipeka-full-long.svg"
                            alt="Logo"
                            className="hidden h-10 w-auto lg:block"
                        />
                        <img
                            src="/images/logo-sipeka-full.svg"
                            alt="Logo"
                            className="block h-10 w-auto lg:hidden"
                        />
                    </Link>
                    <ul className="flex items-center">
                        {isConnected && (
                            <Popover>
                                <PopoverTrigger disabled={!isConnected}>
                                    <li className="flex">
                                        {onlineUsers
                                            .filter(
                                                (onlineUser) =>
                                                    onlineUser.user !==
                                                    auth.user?.nama
                                            )
                                            .map((onlineUser, index) => (
                                                <Avatar
                                                    className={cn(
                                                        '-ml-3 h-7 w-7 bg-white'
                                                    )}
                                                >
                                                    <AvatarImage
                                                        className={cn(
                                                            !onlineUser.isActive &&
                                                                'opacity-20'
                                                        )}
                                                        src={`https://ui-avatars.com/api/?name=${onlineUser.user}&background=${colorImg[index % 5]}&color=fff`}
                                                    />
                                                </Avatar>
                                            ))}
                                    </li>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <CardTitle className="mb-4">
                                        User Online Lainnya
                                    </CardTitle>
                                    {onlineUsers
                                        .filter(
                                            (onlineUser) =>
                                                onlineUser.user !==
                                                auth.user?.nama
                                        )
                                        .map((onlineUser, index) => (
                                            <div
                                                key={onlineUser.user}
                                                className="my-3 flex items-center"
                                            >
                                                <Avatar className="mr-2 h-10 w-10">
                                                    <AvatarImage
                                                        className={cn(
                                                            !onlineUser.isActive &&
                                                                'opacity-20'
                                                        )}
                                                        src={`https://ui-avatars.com/api/?name=${onlineUser.user}&background=${colorImg[index % 5]}&color=fff`}
                                                    />
                                                    <AvatarFallback>
                                                        CN
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="block truncate text-sm font-semibold">
                                                        {onlineUser.user}
                                                    </div>
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
                                        ))}
                                    {onlineUsers.length === 0 && (
                                        <div className="text-sm text-slate-400">
                                            Tidak ada user online
                                        </div>
                                    )}
                                </PopoverContent>
                            </Popover>
                        )}
                        <li>
                            <Button
                                variant="ghost"
                                asChild
                                className="hidden h-20 rounded-none px-5 md:flex"
                            >
                                <Link to="/">Beranda</Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                asChild
                                className="hidden h-20 rounded-none px-5 sm:flex"
                            >
                                <Link to="/panduan">Panduan</Link>
                            </Button>
                        </li>

                        {!auth.user ? (
                            <React.Fragment>
                                {auth.isLoading ? (
                                    <Loading />
                                ) : (
                                    <li>
                                        <Button
                                            variant="ghost"
                                            asChild
                                            className="h-20 rounded-none px-5"
                                        >
                                            <Link to="/login">
                                                <FiLock className="mr-2" />{' '}
                                                Login
                                            </Link>
                                        </Button>
                                    </li>
                                )}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <li>
                                    <Button
                                        variant="ghost"
                                        asChild
                                        className="h-20 rounded-none px-5"
                                    >
                                        <Link to="/home">Dashboard</Link>
                                    </Button>
                                </li>
                                <li>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="h-20 gap-3 rounded-none"
                                            >
                                                <Avatar>
                                                    <AvatarImage
                                                        src={`https://ui-avatars.com/api/?name=${auth.user?.nama}&background=3b82f6&color=fff`}
                                                    />
                                                    <AvatarFallback>
                                                        CN
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="hidden text-left lg:block">
                                                    <div className="block text-sm">
                                                        {auth.user.nama}
                                                    </div>
                                                    <div className="block text-xs font-normal text-slate-400">
                                                        {auth.user.instansi}
                                                    </div>
                                                </div>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="-mt-3"
                                            align="start"
                                        >
                                            <DropdownMenuLabel>
                                                My Profile
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <Link
                                                to="/profil"
                                                className="w-full"
                                            >
                                                <DropdownMenuItem>
                                                    Profil Saya
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link
                                                to="/profil/ganti-password"
                                                className="w-full"
                                            >
                                                <DropdownMenuItem>
                                                    Ganti Password
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-red-500"
                                                onClick={() => auth.logout()}
                                            >
                                                <FiLogOut className="mr-2" />{' '}
                                                Logout
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    )
}
