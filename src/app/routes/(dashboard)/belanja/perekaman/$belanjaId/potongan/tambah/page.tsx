import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { Navigate, useParams } from 'react-router-dom'
import CreateForm from './form'
import { api } from '@/web/trpc/react'
import { formatAngka, formatTanggal } from '@/web/lib/utils'
import { Badge } from '@/web/components/ui/badge'

export default function EditPage() {
    const params = useParams<{ belanjaId: string }>()

    const belanja = api.belanja.getById.useQuery(Number(params.belanjaId))

    if ((belanja.isSuccess && !belanja.data) || belanja.isError)
        return <Navigate to={`/belanja/perekaman`} replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Potongan Belanja</CardTitle>
                <CardDescription>
                    Form untuk tambah potongan realisasi belanja
                </CardDescription>
            </CardHeader>
            {belanja.data && (
                <CardContent>
                    <div className="flex flex-row items-center gap-4">
                        <img
                            src="/images/icons/research.png"
                            className="h-16"
                        />
                        <div>
                            <CardTitle>{belanja.data.noDokumen}</CardTitle>
                            <CardDescription>
                                tanggal {formatTanggal(belanja.data.tglDokumen)}
                            </CardDescription>
                            <CardDescription className="font-semibold">
                                {belanja.data.uraian}
                            </CardDescription>
                            <Badge>Rp {formatAngka(belanja.data.jumlah)}</Badge>
                        </div>
                    </div>
                </CardContent>
            )}

            <CardContent>
                <CreateForm />
            </CardContent>
        </Card>
    )
}
