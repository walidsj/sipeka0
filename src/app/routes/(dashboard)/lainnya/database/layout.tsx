import { Button } from '@/web/components/ui/button'
import {
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function ProfilLayout() {
    const { pathname } = useLocation()

    return (
        <div className="flex flex-row">
            <div className="flex min-h-[calc(100svh-138px)] w-72 flex-col border-r bg-background shadow-sm">
                <nav className="w-full">
                    <CardHeader className="border-b">
                        <CardTitle>Database</CardTitle>
                        <CardDescription>
                            Basis data pengelolaan BLUD
                        </CardDescription>
                    </CardHeader>
                    <ul className="flex flex-col">
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-12 w-full justify-start rounded-none px-6',
                                    pathname.startsWith(
                                        '/lainnya/database/unit-kerja'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 px-5 text-primary'
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
                                    'h-12 w-full justify-start rounded-none px-6',
                                    pathname.startsWith(
                                        '/lainnya/database/bank'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 px-5 text-primary'
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
                                    'h-12 w-full justify-start rounded-none px-6',
                                    pathname.startsWith(
                                        '/lainnya/database/rekanan'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 px-5 text-primary'
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
                                    'h-12 w-full justify-start rounded-none px-6',
                                    pathname.startsWith(
                                        '/lainnya/database/pegawai'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 px-5 text-primary'
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
            <Outlet />
        </div>
    )
}
