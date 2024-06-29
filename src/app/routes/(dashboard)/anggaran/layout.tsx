import { Button } from '@/web/components/ui/button'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { RiPagesLine } from 'react-icons/ri'
import { LuBookCopy } from 'react-icons/lu'
import { IoNewspaperOutline } from 'react-icons/io5'
import { Helmet } from 'react-helmet'
import { FiSearch } from 'react-icons/fi'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex w-full flex-row">
            <Helmet>
                <title>Anggaran - SIPEKA</title>
            </Helmet>
            <div className="flex min-h-[calc(100svh-138px)] w-28 flex-col">
                <nav>
                    <ul className="flex w-full flex-col pt-3">
                        <li>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'flex h-auto w-full flex-col justify-center gap-1 rounded-none px-8 py-3 text-center',
                                    pathname.startsWith('/anggaran/rba') &&
                                        'text-primary'
                                )}
                                asChild
                            >
                                <Link to="/anggaran/rba/daftar-rab">
                                    <LuBookCopy className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        RBA
                                    </span>
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'flex h-auto w-full flex-col justify-center gap-1 rounded-none px-8 py-3 text-center',
                                    pathname.startsWith('/anggaran/rka') &&
                                        'text-primary'
                                )}
                                asChild
                            >
                                <Link to="/anggaran/rka/program-kegiatan/program">
                                    <RiPagesLine className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        RKA
                                    </span>
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'flex h-auto w-full flex-col justify-center gap-1 rounded-none px-8 py-3 text-center',
                                    pathname.startsWith('/anggaran/dba') &&
                                        'text-primary'
                                )}
                                asChild
                            >
                                <Link to="/anggaran/dba/penetapan">
                                    <IoNewspaperOutline className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        DBA
                                    </span>
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'flex h-auto w-full flex-col justify-center gap-1 rounded-none px-8 py-3 text-center',
                                    pathname.startsWith(
                                        '/anggaran/monitoring'
                                    ) && 'text-primary'
                                )}
                                asChild
                            >
                                <Link to="/anggaran/monitoring/realisasi-belanja">
                                    <FiSearch className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Monitoring
                                    </span>
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    )
}
