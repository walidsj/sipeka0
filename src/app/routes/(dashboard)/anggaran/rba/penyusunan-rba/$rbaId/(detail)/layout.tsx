import { Button } from '@/web/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { cn } from '@/web/lib/utils'
import { api } from '@/web/trpc/react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import {
    Link,
    Navigate,
    Outlet,
    useLocation,
    useParams,
} from 'react-router-dom'

export default function Layout() {
    const { pathname } = useLocation()
    const params = useParams<{ rbaId: string; aktivitasId: string }>()

    const rba = api.rba.getById.useQuery(parseInt(params.rbaId ?? ''))

    if ((rba.isSuccess && !rba.data) || rba.isError)
        return <Navigate to="/anggaran/rba/penyusunan-rba" replace />

    return (
        <div className="flex flex-col gap-5">
            <Card>
                {rba.data && (
                    <CardHeader className="flex flex-row justify-start gap-5">
                        <img
                            src="/images/icons/research.png"
                            className="h-20 w-20"
                            alt="RBA"
                        />
                        <div className="flex flex-col gap-1">
                            <CardDescription>
                                Rencana Bisnis dan Anggaran (RBA)
                            </CardDescription>
                            <CardTitle>{rba.data?.uraian}</CardTitle>
                            <CardDescription>
                                No. Dokumen: {rba.data?.noDokumen}, tanggal:{' '}
                                {format(
                                    String(rba.data.tglDokumen ?? ''),
                                    'dd MMMM yyyy',
                                    { locale: id }
                                )}
                            </CardDescription>
                        </div>
                    </CardHeader>
                )}
                <CardContent>
                    <nav className="mb-3 w-full border-b">
                        <ul className="flex">
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname.startsWith(
                                            `/anggaran/rba/penyusunan-rba/${params.rbaId}/aktivitas`
                                        ) &&
                                            'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link
                                        to={`/anggaran/rba/penyusunan-rba/${params.rbaId}/aktivitas`}
                                    >
                                        Aktivitas
                                    </Link>
                                </Button>
                            </li>
                        </ul>
                    </nav>
                    <div className="py-3">
                        <Outlet />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
