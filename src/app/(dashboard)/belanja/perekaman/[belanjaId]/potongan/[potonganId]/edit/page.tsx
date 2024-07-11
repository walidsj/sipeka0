import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Navigate, useParams } from 'react-router-dom'
import { api } from '@/trpc/react'
import EditForm from './form'
import { formatAngka, formatTanggal } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

export default function EditPage() {
    const params = useParams<{ potonganId: string; belanjaId: string }>()

    const belanja = api.belanja.getById.useQuery(Number(params.belanjaId))

    if ((belanja.isSuccess && !belanja.data) || belanja.isError)
        return <Navigate to={`/belanja/perekaman`} replace />

    const potongan = api.belanja.getPotonganById.useQuery(
        Number(params.potonganId)
    )

    if ((potongan.isSuccess && !potongan.data) || potongan.isError)
        return <Navigate to={`/anggaran/belanja/perekaman`} replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Potongan Belanja</CardTitle>
                <CardDescription>
                    Form untuk edit potongan realisasi belanja
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
                {potongan.isSuccess && potongan.data && (
                    <EditForm data={potongan.data} />
                )}
            </CardContent>
        </Card>
    )
}
