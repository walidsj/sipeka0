import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { api } from '@/web/trpc/react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Navigate, Outlet, useParams } from 'react-router-dom'

export default function Layout() {
    const params = useParams<{ rkaId: string }>()

    const rka = api.rka.getById.useQuery(parseInt(params.rkaId ?? ''))

    if ((rka.isSuccess && !rka.data) || rka.isError)
        return <Navigate to="/anggaran/rka/dokumen-rka" replace />

    return (
        <div className="flex flex-col gap-5">
            <Card>
                {rka.data && (
                    <CardHeader className="flex flex-row justify-start gap-5">
                        <img
                            src="/images/icons/documentation.png"
                            className="h-20 w-20"
                            alt="RKA"
                        />
                        <div className="flex flex-col gap-1">
                            <CardDescription>
                                Rencana Kerja Anggaran (RKA)
                            </CardDescription>
                            <CardTitle>{rka.data.uraian}</CardTitle>
                            <CardDescription>
                                No. Dokumen: {rka.data.noDokumen}, tanggal:{' '}
                                {format(
                                    String(rka.data.tglDokumen ?? ''),
                                    'dd MMMM yyyy',
                                    { locale: id }
                                )}
                            </CardDescription>
                            <p className="rounded-lg border border-yellow-300 bg-yellow-50 p-2 text-xs text-black">
                                RBA: {rka.data.rba?.noDokumen}
                                <br />
                                Tanggal:{' '}
                                {format(
                                    String(rka.data.rba?.tglDokumen),
                                    'dd MMMM yyyy',
                                    { locale: id }
                                )}
                            </p>
                        </div>
                    </CardHeader>
                )}
                <CardContent>
                    <div className="py-3">
                        <Outlet />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
