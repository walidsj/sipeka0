import { Button } from '@/web/components/ui/button'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
    FiEdit,
    FiFileText,
    FiHome,
    FiPocket,
    FiShoppingCart,
    FiTool,
} from 'react-icons/fi'
import { cn } from '@/web/lib/utils'
import { Helmet } from 'react-helmet'

export default function DashboardLayout() {
    const { pathname } = useLocation()

    return (
        <React.Fragment>
            <Helmet>
                <title>Dashboard - SIPEKA</title>
            </Helmet>
            <div className="border-b bg-background shadow-sm">
                <nav className="mx-auto w-full overflow-x-auto">
                    <ul className="flex">
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-14 gap-3 rounded-none px-5',
                                    pathname.startsWith('/home') &&
                                        'text-primary'
                                )}
                            >
                                <Link to="/home">
                                    <div
                                        className={cn(
                                            'flex items-center justify-center rounded-lg p-2 text-primary shadow',
                                            pathname.startsWith('/home')
                                                ? 'bg-gradient-to-br from-blue-400 to-primary text-white'
                                                : 'border bg-background'
                                        )}
                                    >
                                        <FiHome />
                                    </div>
                                    Home
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-14 gap-3 rounded-none px-5',
                                    pathname.startsWith('/anggaran') &&
                                        'text-primary'
                                )}
                            >
                                <Link to="/anggaran/rba/daftar-rab">
                                    <div
                                        className={cn(
                                            'flex items-center justify-center rounded-lg p-2 text-primary shadow',
                                            pathname.startsWith('/anggaran')
                                                ? 'bg-gradient-to-br from-blue-400 to-primary text-white'
                                                : 'border bg-background'
                                        )}
                                    >
                                        <FiEdit />
                                    </div>
                                    Anggaran
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-14 gap-3 rounded-none px-5',
                                    pathname.startsWith('/pendapatan') &&
                                        'text-primary'
                                )}
                            >
                                <Link to="/pendapatan/perekaman">
                                    <div
                                        className={cn(
                                            'flex items-center justify-center rounded-lg p-2 text-primary shadow',
                                            pathname.startsWith('/pendapatan')
                                                ? 'bg-gradient-to-br from-blue-400 to-primary text-white'
                                                : 'border bg-background'
                                        )}
                                    >
                                        <FiPocket />
                                    </div>
                                    Pendapatan
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-14 gap-3 rounded-none px-5',
                                    pathname.startsWith('/belanja') &&
                                        'text-primary'
                                )}
                            >
                                <Link to="/belanja/perekaman">
                                    <div
                                        className={cn(
                                            'flex items-center justify-center rounded-lg p-2 text-primary shadow',
                                            pathname.startsWith('/belanja')
                                                ? 'bg-gradient-to-br from-blue-400 to-primary text-white'
                                                : 'border bg-background'
                                        )}
                                    >
                                        <FiShoppingCart />
                                    </div>
                                    Belanja
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-14 gap-3 rounded-none px-5',
                                    pathname.startsWith('/akuntansi') &&
                                        'text-primary'
                                )}
                            >
                                <Link to="/akuntansi">
                                    <div
                                        className={cn(
                                            'flex items-center justify-center rounded-lg p-2 text-primary shadow',
                                            pathname.startsWith('/akuntansi')
                                                ? 'bg-gradient-to-br from-blue-400 to-primary text-white'
                                                : 'border bg-background'
                                        )}
                                    >
                                        <FiFileText />
                                    </div>
                                    Akuntansi
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-14 gap-3 rounded-none px-5',
                                    pathname.startsWith('/lainnya') &&
                                        'text-primary'
                                )}
                            >
                                <Link to="/lainnya/database/unit-kerja">
                                    <div
                                        className={cn(
                                            'flex items-center justify-center rounded-lg p-2 text-primary shadow',
                                            pathname.startsWith('/lainnya')
                                                ? 'bg-gradient-to-br from-blue-400 to-primary text-white'
                                                : 'border bg-background'
                                        )}
                                    >
                                        <FiTool />
                                    </div>
                                    Lainnya
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
            <Outlet />
        </React.Fragment>
    )
}
