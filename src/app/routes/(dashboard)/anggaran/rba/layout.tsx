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
            <div className="flex min-h-[calc(100svh-138px)] w-72 flex-col">
                <nav className="w-full">
                    <CardHeader>
                        <CardTitle>Rencana Bisnis dan Anggaran</CardTitle>
                        <CardDescription>
                            Dokumen perencanaan bisnis dan penganggaran tahunan
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
                                        '/anggaran/rba/daftar-rab'
                                    ) && 'text-primary'
                                )}
                            >
                                <Link to="/anggaran/rba/daftar-rab">
                                    Rencana Belanja
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
                                        '/anggaran/rba/daftar-rap'
                                    ) && 'text-primary'
                                )}
                            >
                                <Link to="/anggaran/rba/daftar-rap">
                                    Rencana Pendapatan
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
                                        '/anggaran/rba/penyusunan-rba'
                                    ) && 'text-primary'
                                )}
                            >
                                <Link to="/anggaran/rba/penyusunan-rba">
                                    Penyusunan RBA
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
