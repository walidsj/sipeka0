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
            <div className="flex min-h-[calc(100svh-138px)] w-72 flex-col bg-background">
                <nav className="w-full">
                    <CardHeader>
                        <CardTitle>Monitoring</CardTitle>
                        <CardDescription>
                            Menu untuk melakukan monitoring anggaran dan
                            realisasi
                        </CardDescription>
                    </CardHeader>
                    <ul className="flex flex-col">
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-12 w-full justify-start rounded-none px-5',
                                    pathname.startsWith(
                                        '/anggaran/monitoring/realisasi-belanja'
                                    ) && 'bg-slate-50 text-primary'
                                )}
                            >
                                <Link to="/anggaran/monitoring/realisasi-belanja">
                                    Realisasi Belanja
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
