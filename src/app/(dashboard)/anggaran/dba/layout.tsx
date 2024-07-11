import { Button } from '@/components/ui/button'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function ProfilLayout() {
    const { pathname } = useLocation()

    return (
        <div className="flex flex-row">
            <div className="flex min-h-[calc(100svh-138px)] w-72 flex-col">
                <nav className="w-full">
                    <CardHeader>
                        <CardTitle>Dokumen Bisnis dan Anggaran</CardTitle>
                        <CardDescription>
                            Rencana bisnis dan anggaran BLUD yang telah disahkan
                            dan ditetapkan untuk dilaksanakan
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
                                        '/anggaran/dba/penetapan'
                                    ) && 'text-primary'
                                )}
                            >
                                <Link to="/anggaran/dba/penetapan">
                                    Penetapan
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
