import { Button } from '@/web/components/ui/button'
import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
    FiEdit,
    FiFileText,
    FiHome,
    FiPocket,
    FiShoppingBag,
    FiShoppingCart,
    FiTool,
} from 'react-icons/fi'
import { cn } from '@/web/lib/utils'

export default function DashboardLayout() {
    const { pathname } = useLocation()

    return (
        <React.Fragment>
            <div className="border-b bg-background shadow-sm">
                <nav className="mx-auto px-8">
                    <ul className="flex">
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-14 rounded-none px-5',
                                    pathname.startsWith('/home') &&
                                        'border-b-4 border-primary text-primary'
                                )}
                            >
                                <Link to="/home">
                                    <FiHome className="mr-3" />
                                    Home
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-14 rounded-none px-5',
                                    pathname.startsWith('/anggaran') &&
                                        'border-b-4 border-primary text-primary'
                                )}
                            >
                                <Link to="/anggaran/rka/program-kegiatan/program">
                                    <FiEdit className="mr-3" />
                                    Anggaran
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-14 rounded-none px-5',
                                    pathname.startsWith('/pengadaan') &&
                                        'border-b-4 border-primary text-primary'
                                )}
                            >
                                <Link to="/pengadaan">
                                    <FiShoppingBag className="mr-3" />
                                    Pengadaan
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-14 rounded-none px-5',
                                    pathname.startsWith('/belanja') &&
                                        'border-b-4 border-primary text-primary'
                                )}
                            >
                                <Link to="/belanja">
                                    <FiShoppingCart className="mr-3" />
                                    Belanja
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-14 rounded-none px-5',
                                    pathname.startsWith('/pendapatan') &&
                                        'border-b-4 border-primary text-primary'
                                )}
                            >
                                <Link to="/pendapatan">
                                    <FiPocket className="mr-3" />
                                    Pendapatan
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-14 rounded-none px-5',
                                    pathname.startsWith('/akuntansi') &&
                                        'border-b-4 border-primary text-primary'
                                )}
                            >
                                <Link to="/akuntansi">
                                    <FiFileText className="mr-3" />
                                    Akuntansi
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-14 rounded-none px-5',
                                    pathname.startsWith('/lainnya') &&
                                        'border-b-4 border-primary text-primary'
                                )}
                            >
                                <Link to="/lainnya/database/bank">
                                    <FiTool className="mr-3" />
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
