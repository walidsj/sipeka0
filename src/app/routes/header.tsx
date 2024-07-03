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
import { Badge } from '@/web/components/ui/badge'
import { FaCircle } from 'react-icons/fa'
import { cn } from '@/web/lib/utils'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/web/components/ui/popover'
import { CardTitle } from '@/web/components/ui/card'

type IOnlineUser = {
    socketId: string
    user: string
}

export function Header() {
    const auth = useAuth()
    const [isConnected, setIsConnected] = React.useState(socket.connected)
    const [onlineUsers, setOnlineUsers] = React.useState<IOnlineUser[]>([])

    React.useEffect(() => {
        if (auth.user) {
            if (!onlineUsers.find((user) => user.user === auth.user?.nama)) {
                socket.emit('new-user-add', auth.user?.nama)
            }
        }

        socket.on('get-users', (users) => {
            setOnlineUsers(users)
        })

        return () => {
            socket.off('get-users')
        }
    }, [auth.user])

    React.useEffect(() => {
        function onConnect() {
            setIsConnected(true)
        }

        function onDisconnect() {
            setIsConnected(false)
            socket.emit('offline', auth.user?.nama)
        }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)

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
                        <li>
                            <Popover>
                                <PopoverTrigger>
                                    <Badge
                                        className={cn(
                                            'mx-5 bg-green-500',
                                            !isConnected && 'bg-slate-400'
                                        )}
                                    >
                                        {isConnected ? (
                                            <>
                                                <FaCircle className="mr-1 h-2 w-2 animate-pulse" />
                                                {onlineUsers.length > 0
                                                    ? onlineUsers.length
                                                    : ''}{' '}
                                                Online
                                            </>
                                        ) : (
                                            'Offline'
                                        )}
                                    </Badge>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <CardTitle className="mb-2">
                                        User Online
                                    </CardTitle>
                                    {onlineUsers.map((onlineUser) => (
                                        <div
                                            key={onlineUser.socketId}
                                            className="flex items-center text-sm"
                                        >
                                            <FaCircle className="mr-2 h-2 w-2 text-green-500" />
                                            {onlineUser.user}
                                        </div>
                                    ))}
                                    {onlineUsers.length === 0 && (
                                        <div className="text-sm text-slate-400">
                                            Tidak ada user online
                                        </div>
                                    )}
                                </PopoverContent>
                            </Popover>
                        </li>
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
                                                        src={`https://ui-avatars.com/api/?name=${auth.user?.nama}&background=${auth.user.role == 'ADMIN' ? 'E64B4B' : '0D8ABC'}&color=fff`}
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
