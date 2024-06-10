import { Button } from '@/web/components/ui/button'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { LuBook, LuFileInput } from 'react-icons/lu'
import { Helmet } from 'react-helmet'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex w-full flex-row">
            <Helmet>
                <title>Pendapatan - SIPEKA</title>
            </Helmet>
            <div className="flex min-h-[calc(100svh-138px)] w-28 flex-col bg-background shadow">
                <nav>
                    <ul className="flex w-full flex-col">
                        <li>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'flex h-auto w-full flex-col justify-center gap-1 rounded-none px-8 py-3 text-center',
                                    pathname.startsWith(
                                        '/pendapatan/perekaman'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                                asChild
                            >
                                <Link to="/pendapatan/perekaman">
                                    <LuFileInput className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Rekam Pendapatan
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
                                        '/pendapatan/laporan'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                                asChild
                            >
                                <Link to="/pendapatan/laporan">
                                    <LuBook className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Laporan
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
