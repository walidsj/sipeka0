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
            <div className="flex w-72 flex-col">
                <nav className="w-full">
                    <CardHeader>
                        <CardTitle>Rencana Kerja Anggaran</CardTitle>
                        <CardDescription>
                            Dokumen perencanaan dan penganggaran program dan
                            kegiatan SKPD
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
                                        '/anggaran/rka/program-kegiatan'
                                    ) && 'text-primary'
                                )}
                            >
                                <Link to="/anggaran/rka/program-kegiatan/program">
                                    Program/Kegiatan
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
                                        '/anggaran/rka/dokumen-rka'
                                    ) && 'text-primary'
                                )}
                            >
                                <Link to="/anggaran/rka/dokumen-rka">
                                    Dokumen RKA
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex w-full flex-col">
                <Outlet />
            </div>
        </div>
    )
}
