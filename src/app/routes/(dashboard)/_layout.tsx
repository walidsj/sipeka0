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
            <div className="border-b shadow-sm bg-background">
                <nav className="mx-auto max-w-7xl px-10 py-2">
                    <ul className="flex gap-1">
                        <li>
                            <Button
                                asChild
                                variant={
                                    pathname.startsWith('/home')
                                        ? 'default'
                                        : 'ghost'
                                }
                                className={cn(
                                    pathname.startsWith('/home') && 'mr-3'
                                )}
                            >
                                <Link to="/home">
                                    <FiHome className="mr-2" />
                                    Home
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant={
                                    pathname.startsWith('/anggaran')
                                        ? 'default'
                                        : 'ghost'
                                }
                                className={cn(
                                    pathname.startsWith('/anggaran') && 'mx-3'
                                )}
                            >
                                <Link to="/anggaran">
                                    <FiEdit className="mr-2" />
                                    Anggaran
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant={
                                    pathname.startsWith('/pengadaan')
                                        ? 'default'
                                        : 'ghost'
                                }
                                className={cn(
                                    pathname.startsWith('/pengadaan') && 'mx-3'
                                )}
                            >
                                <Link to="/pengadaan">
                                    <FiShoppingBag className="mr-2" />
                                    Pengadaan
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant={
                                    pathname.startsWith('/belanja')
                                        ? 'default'
                                        : 'ghost'
                                }
                                className={cn(
                                    pathname.startsWith('/belanja') && 'mx-3'
                                )}
                            >
                                <Link to="/belanja">
                                    <FiShoppingCart className="mr-2" />
                                    Belanja
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant={
                                    pathname.startsWith('/pendapatan')
                                        ? 'default'
                                        : 'ghost'
                                }
                                className={cn(
                                    pathname.startsWith('/pendapatan') && 'mx-3'
                                )}
                            >
                                <Link to="/pendapatan">
                                    <FiPocket className="mr-2" />
                                    Pendapatan
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant={
                                    pathname.startsWith('/akuntansi')
                                        ? 'default'
                                        : 'ghost'
                                }
                                className={cn(
                                    pathname.startsWith('/akuntansi') && 'mx-3'
                                )}
                            >
                                <Link to="/akuntansi">
                                    <FiFileText className="mr-2" />
                                    Akuntansi
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant={
                                    pathname.startsWith('/lainnya')
                                        ? 'default'
                                        : 'ghost'
                                }
                                className={cn(
                                    pathname.startsWith('/lainnya') && 'ml-3'
                                )}
                            >
                                <Link to="/lainnya">
                                    <FiTool className="mr-2" />
                                    Lainnya
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="mx-auto px-10 py-5 max-w-7xl">
                <Outlet />
            </div>
        </React.Fragment>
    )
}
