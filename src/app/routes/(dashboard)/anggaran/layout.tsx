import { Button } from '@/web/components/ui/button'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import {
    HiOutlineNewspaper,
    HiOutlinePencilAlt,
    HiOutlinePresentationChartLine,
    HiSearch,
} from 'react-icons/hi'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex w-full flex-col">
            <Helmet>
                <title>Anggaran - SIPEKA</title>
            </Helmet>
            <nav className="mx-auto w-full overflow-x-auto md:px-3 lg:px-5 xl:px-8">
                <ul className="flex w-full">
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('/anggaran/rba') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/anggaran/rba/daftar-rab">
                                <HiOutlineNewspaper className="mr-1 h-5 w-5" />
                                <span>RBA</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('/anggaran/rka') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/anggaran/rka/program-kegiatan/program">
                                <HiOutlinePencilAlt className="mr-1 h-5 w-5" />
                                <span>RKA</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('/anggaran/dba') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/anggaran/dba/penetapan">
                                <HiOutlinePresentationChartLine className="mr-1 h-5 w-5" />
                                <span>DBA</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('/anggaran/monitoring') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/anggaran/monitoring/realisasi-belanja">
                                <HiSearch className="mr-1 h-5 w-5" />
                                <span>Monitoring</span>
                            </Link>
                        </Button>
                    </li>
                </ul>
            </nav>
            <div className="flex w-full flex-col md:px-8 md:pr-6 lg:px-10 xl:px-6">
                <Outlet />
            </div>
        </div>
    )
}
