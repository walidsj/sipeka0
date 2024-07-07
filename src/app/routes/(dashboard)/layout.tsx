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
import { Card } from '@/web/components/ui/card'

export default function DashboardLayout() {
    const { pathname } = useLocation()

    return (
        <React.Fragment>
            <nav className="mx-auto w-full overflow-x-auto py-4 md:px-8 lg:px-10 xl:px-12">
                <ul className="flex gap-3">
                    <li>
                        <Link to="/home">
                            <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                                <div
                                    className={cn(
                                        'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                        pathname.startsWith('/home')
                                            ? 'bg-primary text-white'
                                            : 'bg-background'
                                    )}
                                >
                                    <FiHome />
                                </div>
                                Home
                            </Card>
                        </Link>
                    </li>
                    <li>
                        <Link to="/anggaran">
                            <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                                <div
                                    className={cn(
                                        'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                        pathname.startsWith('/anggaran')
                                            ? 'bg-primary text-white'
                                            : 'bg-background'
                                    )}
                                >
                                    <FiEdit />
                                </div>
                                Anggaran
                            </Card>
                        </Link>
                    </li>
                    <li>
                        <Link to="/pendapatan/perekaman">
                            <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                                <div
                                    className={cn(
                                        'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                        pathname.startsWith('/pendapatan')
                                            ? 'bg-primary text-white'
                                            : 'bg-background'
                                    )}
                                >
                                    <FiPocket />
                                </div>
                                Pendapatan
                            </Card>
                        </Link>
                    </li>
                    <li>
                        <Link to="/belanja/perekaman">
                            <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                                <div
                                    className={cn(
                                        'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                        pathname.startsWith('/belanja')
                                            ? 'bg-primary text-white'
                                            : 'bg-background'
                                    )}
                                >
                                    <FiShoppingCart />
                                </div>
                                Belanja
                            </Card>
                        </Link>
                    </li>
                    <li>
                        <Link to="/akuntansi">
                            <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                                <div
                                    className={cn(
                                        'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                        pathname.startsWith('/akuntansi')
                                            ? 'bg-primary text-white'
                                            : 'bg-background'
                                    )}
                                >
                                    <FiFileText />
                                </div>
                                Akuntansi
                            </Card>
                        </Link>
                    </li>
                    <li>
                        <Link to="/lainnya/database/unit-kerja">
                            <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                                <div
                                    className={cn(
                                        'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                        pathname.startsWith('/lainnya')
                                            ? 'bg-primary text-white'
                                            : 'bg-background'
                                    )}
                                >
                                    <FiTool />
                                </div>
                                Lainnya
                            </Card>
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="flex w-full flex-col px-5 md:px-8 lg:px-10 xl:px-12">
                <Outlet />
            </div>
        </React.Fragment>
    )
}
