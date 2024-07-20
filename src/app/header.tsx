import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import React from 'react'
import { socket } from '@/lib/socket'
import { FaCircle, FaRegCircle } from 'react-icons/fa'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
    HiOutlineBookOpen,
    HiOutlineLockClosed,
    HiOutlineLogout,
    HiOutlineUser,
} from 'react-icons/hi'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'

type IOnlineUser = {
    user: string
    isActive: boolean
}

const colorImg = ['0ea5e9', '6366f1', '14b8a6', 'eab308', 'ec4899']

export function Header() {
    const auth = useAuth()
    const { pathname } = useLocation()

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
    }, [auth.user, auth.isLoading, onlineUsers])

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

    return (
        <header className="h-20 w-full border-b bg-background shadow-sm">
            <div className="mx-auto px-5 md:px-8 md:pr-6 lg:px-8 lg:pr-6 xl:px-12">
                <div className="flex w-full items-center justify-between">
                    <Link
                        to="/"
                        className="flex h-20 flex-shrink-0 items-center gap-4"
                    >
                        <img
                            src="/images/atmaku.svg"
                            alt="Logo Atmaku"
                            className={cn(
                                'block h-9 w-auto transition-all md:block',
                                pathname.startsWith('__DASHBOARD_PREFIX__') &&
                                    'hidden h-6',
                                pathname.startsWith('__CLIENT_PREFIX__') &&
                                    'hidden h-6'
                            )}
                        />
                        {pathname.startsWith('__DASHBOARD_PREFIX__') && (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.1 }}
                                className="flex h-8 items-center md:border-l md:px-4"
                            >
                                <img
                                    src="/images/logo-sipeka-full-long.svg"
                                    alt="Logo SIPEKA"
                                    className="hidden h-9 w-auto md:block"
                                />
                                <img
                                    src="/images/logo-sipeka-full.svg"
                                    alt="Logo SIPEKA"
                                    className="block h-9 w-auto md:hidden"
                                />
                            </motion.div>
                        )}
                        {pathname.startsWith('__CLIENT_PREFIX__') && (
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.1 }}
                                className="flex h-8 items-center md:border-l md:px-4"
                            >
                                <img
                                    src="/images/logo-myatma.svg"
                                    alt="Logo MyAtma"
                                    className="block h-9 w-auto"
                                />
                            </motion.div>
                        )}
                    </Link>
                    <div className="flex items-center">
                        {isConnected && (
                            <Popover>
                                <PopoverTrigger disabled={!isConnected}>
                                    <div className="flex px-5">
                                        {onlineUsers
                                            .filter(
                                                (onlineUser) =>
                                                    onlineUser.user !==
                                                    auth.user?.nama
                                            )
                                            .map((onlineUser, index) => (
                                                <Avatar
                                                    className={cn(
                                                        '-ml-3 h-6 w-6 bg-white'
                                                    )}
                                                    key={index}
                                                >
                                                    <AvatarImage
                                                        className={cn(
                                                            'transition-all',
                                                            !onlineUser.isActive &&
                                                                'opacity-20'
                                                        )}
                                                        src={`https://ui-avatars.com/api/?name=${onlineUser.user}&background=${colorImg[index % 5]}&color=fff`}
                                                    />
                                                </Avatar>
                                            ))}
                                    </div>
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
                                                key={index}
                                                className="my-3 flex items-center"
                                            >
                                                <Avatar className="mr-2 h-8 w-8">
                                                    <AvatarImage
                                                        className={cn(
                                                            'transition-all',
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
                        <Button
                            variant="ghost"
                            asChild
                            className="hidden h-16 sm:flex"
                        >
                            <Link to="/panduan">
                                <HiOutlineBookOpen className="h-6 w-6" />
                            </Link>
                        </Button>
                        {!auth.user ? (
                            <React.Fragment>
                                {auth.isLoading ? (
                                    <Button
                                        disabled
                                        variant="ghost"
                                        className="h-16 gap-3"
                                    >
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="hidden lg:block">
                                            <Skeleton className="mb-2 block h-5 w-36" />
                                            <Skeleton className="block h-4 w-28" />
                                        </div>
                                    </Button>
                                ) : (
                                    <Button
                                        variant="ghost"
                                        asChild
                                        className="h-16"
                                    >
                                        <Link to="/login">
                                            <HiOutlineLockClosed className="mr-2 h-6 w-6" />
                                            Login
                                        </Link>
                                    </Button>
                                )}
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="h-16 gap-3"
                                        >
                                            <Avatar>
                                                <AvatarImage
                                                    src={`https://ui-avatars.com/api/?name=${auth.user?.nama}&background=3b82f6&color=fff`}
                                                />
                                                <AvatarFallback>
                                                    <HiOutlineUser />
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="hidden text-left lg:block">
                                                <div className="block text-sm">
                                                    {auth.user.nama}
                                                </div>
                                                <div className="block text-xs font-normal text-slate-400">
                                                    {auth.user.pegawai
                                                        ?.jabatan ||
                                                        auth.user.instansi}
                                                    {auth.user.pegawai?.pengelolaBlud.map(
                                                        (blud, index) => (
                                                            <div
                                                                className="text-xs font-normal text-slate-400"
                                                                key={index}
                                                            >
                                                                {blud.role}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuItem className="lg:hidden">
                                            <div className="flex items-center">
                                                <Avatar>
                                                    <AvatarImage
                                                        src={`https://ui-avatars.com/api/?name=${auth.user?.nama}&background=3b82f6&color=fff`}
                                                    />
                                                    <AvatarFallback>
                                                        CN
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="ml-3">
                                                    <div className="block text-sm">
                                                        {auth.user.nama}
                                                    </div>
                                                    <div className="block text-xs font-normal text-slate-400">
                                                        {auth.user.pegawai
                                                            ?.jabatan ||
                                                            auth.user.instansi}
                                                        {auth.user.pegawai?.pengelolaBlud.map(
                                                            (blud, index) => (
                                                                <div
                                                                    className="text-xs font-normal text-slate-400"
                                                                    key={index}
                                                                >
                                                                    {blud.role}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </DropdownMenuItem>
                                        <Link to="/profil" className="w-full">
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
                                            <HiOutlineLogout className="mr-2" />{' '}
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}
