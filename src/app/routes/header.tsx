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
import { CardDescription, CardTitle } from '@/web/components/ui/card'

type IOnlineUserClient = {
    user: string
    status: 'on focus' | 'idle'
}

export function Header() {
    const auth = useAuth()
    const [isConnected, setIsConnected] = React.useState(socket.connected)
    const [onlineUsers, setOnlineUsers] = React.useState<IOnlineUserClient[]>(
        []
    )

    React.useEffect(() => {
        if (auth.user) {
            if (!onlineUsers.find((user) => user.user === auth.user?.nama)) {
                socket.emit('new-user-add', {
                    user: auth.user?.nama,
                    status: 'on focus',
                })
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
        window.onfocus = () => {
            if (auth.user) {
                socket.emit('new-user-add', {
                    user: auth.user?.nama,
                    status: 'on focus',
                })
            }
        }

        window.onblur = () => {
            if (auth.user) {
                socket.emit('new-user-add', {
                    user: auth.user?.nama,
                    status: 'idle',
                })
            }
        }
    }, [window.onfocus, window.onblur, auth.user])

    React.useEffect(() => {
        function onConnect() {
            setIsConnected(true)
            socket.on('get-users', (users) => {
                setOnlineUsers(users)
            })
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
                        {auth.user && (
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
                                                    {Object.keys(
                                                        Object.groupBy(
                                                            onlineUsers,
                                                            ({ user }) => user
                                                        )
                                                    ).length > 0
                                                        ? Object.keys(
                                                              Object.groupBy(
                                                                  onlineUsers,
                                                                  ({ user }) =>
                                                                      user
                                                              )
                                                          ).length
                                                        : ''}{' '}
                                                    Online
                                                </>
                                            ) : (
                                                'Offline'
                                            )}
                                        </Badge>
                                    </PopoverTrigger>
                                    <PopoverContent align="start">
                                        <CardTitle className="mb-3">
                                            User Online
                                        </CardTitle>
                                        {onlineUsers.find(
                                            (user) =>
                                                user.user === auth.user?.nama
                                        ) && (
                                            <>
                                                <CardDescription className="my-1 font-semibold">
                                                    Saya
                                                </CardDescription>
                                                <div className="my-1 flex items-center">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage
                                                            src={`https://ui-avatars.com/api/?name=${auth.user?.nama}&background=0D8ABC&color=fff`}
                                                        />
                                                        <AvatarFallback>
                                                            CN
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="ml-2">
                                                        <div className="font-semibold">
                                                            {auth.user?.nama}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        {onlineUsers.filter(
                                            (user) =>
                                                user.user !== auth.user?.nama
                                        ).length > 0 && (
                                            <>
                                                <CardDescription className="my-1 mt-3 font-semibold">
                                                    User Lainnya
                                                </CardDescription>
                                                {onlineUsers
                                                    .filter(
                                                        (user) =>
                                                            user.user !==
                                                            auth.user?.nama
                                                    )
                                                    .map((user) => (
                                                        <div
                                                            key={user.user}
                                                            className="my-1 flex items-center"
                                                        >
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarImage
                                                                    src={`https://ui-avatars.com/api/?name=${user.user}&background=0D8ABC&color=fff`}
                                                                />
                                                                <AvatarFallback>
                                                                    CN
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="ml-2">
                                                                <div className="font-semibold">
                                                                    {user.user}
                                                                </div>
                                                                <div className="text-xs text-slate-500">
                                                                    {
                                                                        user.status
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                            </>
                                        )}

                                        {Object.keys(
                                            Object.groupBy(
                                                onlineUsers,
                                                ({ user }) => user
                                            )
                                        ).length === 0 && (
                                            <div className="text-sm text-slate-500">
                                                Tidak ada user online
                                            </div>
                                        )}
                                    </PopoverContent>
                                </Popover>
                            </li>
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
