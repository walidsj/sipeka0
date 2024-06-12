import { CardDescription, CardTitle } from '@/web/components/ui/card'
import { Navigate, useParams } from 'react-router-dom'
import EditForm from './form'
import { api } from '@/web/trpc/react'

export default function EditPage() {
    const params = useParams<{
        rincianRbaBelanjaId: string
    }>()

    const rincianRbaBelanja = api.rincianRbaBelanja.getById.useQuery(
        parseInt(params.rincianRbaBelanjaId ?? '')
    )

    if (
        (rincianRbaBelanja.isSuccess && !rincianRbaBelanja.data) ||
        rincianRbaBelanja.isError
    )
        return (
            <Navigate to={`/anggaran/monitoring/realisasi-belanja`} replace />
        )

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <CardTitle>Edit Pagu</CardTitle>
                <CardDescription>
                    Akses cepat untuk mengubah data pagu
                </CardDescription>
            </div>
            {rincianRbaBelanja.isSuccess && rincianRbaBelanja.data && (
                <EditForm data={rincianRbaBelanja.data} />
            )}
        </div>
    )
}
