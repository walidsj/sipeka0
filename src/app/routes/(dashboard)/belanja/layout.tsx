import { Button } from '@/web/components/ui/button'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { LuBook, LuFileInput } from 'react-icons/lu'
import { Helmet } from 'react-helmet'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex w-full flex-col">
            <Helmet>
                <title>Belanja - SIPEKA</title>
            </Helmet>
            <nav className="mx-auto w-full overflow-x-auto md:px-3 lg:px-5 xl:px-8">
                <ul className="flex w-full">
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                'flex h-auto w-full justify-center gap-2 rounded-none text-center',
                                pathname.startsWith('/belanja/perekaman') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/belanja/perekaman">
                                <LuFileInput className="h-4 w-4" />
                                <span className="text-wrap text-sm">
                                    Rekam Belanja
                                </span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                'flex h-auto w-full justify-center gap-2 rounded-none text-center',
                                pathname.startsWith('/belanja/laporan') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/belanja/laporan">
                                <LuBook className="h-4 w-4" />
                                <span className="text-wrap text-sm">
                                    Laporan
                                </span>
                            </Link>
                        </Button>
                    </li>
                </ul>
            </nav>
            <div className="flex w-full flex-col px-5 py-5 md:px-8 md:pr-6 lg:px-10 lg:pr-6 xl:px-12">
                <Outlet />
            </div>
        </div>
    )
}
