import { Button } from '@/web/components/ui/button'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function ProfilLayout() {
    const { pathname } = useLocation()

    return (
        <div className="flex flex-row">
            <div className="flex min-h-[calc(100svh-138px)] w-72 flex-col bg-background shadow">
                <nav className="w-full">
                    <div className="border-b bg-background px-5 py-5">
                        <h1 className="text-xl font-semibold">Database</h1>
                        <p className="text-sm text-slate-500">
                            Basis data pengelolaan BLUD
                        </p>
                    </div>
                    <ul className="flex flex-col">
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-12 w-full justify-start rounded-none px-5',
                                    pathname.startsWith(
                                        '/lainnya/database/unit-kerja'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                            >
                                <Link to="/lainnya/database/unit-kerja">
                                    Data Unit Kerja
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-12 w-full justify-start rounded-none px-5',
                                    pathname.startsWith(
                                        '/lainnya/database/bank'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                            >
                                <Link to="/lainnya/database/bank">
                                    Data Bank
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-12 w-full justify-start rounded-none px-5',
                                    pathname.startsWith(
                                        '/lainnya/database/rekanan'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                            >
                                <Link to="/lainnya/database/rekanan">
                                    Data Rekanan
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-12 w-full justify-start rounded-none px-5',
                                    pathname.startsWith(
                                        '/lainnya/database/pegawai'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                            >
                                <Link to="/lainnya/database/pegawai">
                                    Data Pegawai
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex w-full flex-col gap-5 px-8 py-5">
                <Outlet />
            </div>
        </div>
    )
}
