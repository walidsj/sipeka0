import { Button } from '@/web/components/ui/button'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { HiOutlineClipboardList, HiOutlineDocumentText } from 'react-icons/hi'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex w-full flex-col">
            <Helmet>
                <title>Pendapatan - SIPEKA</title>
            </Helmet>
            <nav className="mx-auto w-full overflow-x-auto md:px-3 lg:px-5 xl:px-8">
                <ul className="flex w-full">
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('/pendapatan/perekaman') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/pendapatan/perekaman">
                                <HiOutlineClipboardList className="mr-1 h-5 w-5" />
                                <span>Rekam Pendapatan</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('/pendapatan/laporan') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/pendapatan/laporan">
                                <HiOutlineDocumentText className="mr-1 h-5 w-5" />
                                <span>Laporan</span>
                            </Link>
                        </Button>
                    </li>
                </ul>
            </nav>
            <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
                <Outlet />
            </div>
        </div>
    )
}
