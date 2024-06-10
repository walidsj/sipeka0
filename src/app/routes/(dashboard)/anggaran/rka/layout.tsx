import { Button } from '@/web/components/ui/button'
import { CardTitle } from '@/web/components/ui/card'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function ProfilLayout() {
    const { pathname } = useLocation()

    return (
        <div className="flex flex-row">
            <div className="flex min-h-[calc(100svh-138px)] w-72 flex-col border-r bg-background shadow-sm">
                <nav className="w-full">
                    <div className="border-b bg-background px-5 py-5">
                        <CardTitle>Rencana Kerja Anggaran</CardTitle>
                    </div>
                    <ul className="flex flex-col">
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-12 w-full justify-start rounded-none px-5',
                                    pathname.startsWith(
                                        '/anggaran/rka/program-kegiatan'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
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
                                    'h-12 w-full justify-start rounded-none px-5',
                                    pathname.startsWith(
                                        '/anggaran/rka/dokumen-rka'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
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
            <div className="flex w-full flex-col gap-5 px-8 py-5">
                <Outlet />
            </div>
        </div>
    )
}
