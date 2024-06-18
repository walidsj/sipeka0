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

export function Header() {
    const auth = useAuth()

    return (
        <header className="fixed z-50 h-20 w-full border-b bg-background shadow-sm">
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
                                <li>
                                    <Button
                                        variant="ghost"
                                        asChild
                                        className="h-20 rounded-none px-5"
                                    >
                                        <Link to="/login">
                                            <FiLock className="mr-2" /> Login
                                        </Link>
                                    </Button>
                                </li>
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
                                                        src={`https://ui-avatars.com/api/?name=${auth.user?.username}&background=${auth.user.role == 'ADMIN' ? 'E64B4B' : '0D8ABC'}&color=fff`}
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
