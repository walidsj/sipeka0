import { CardDescription, CardTitle } from '@/web/components/ui/card'
import { Navigate, useParams } from 'react-router-dom'
import EditForm from './form'
import { api } from '@/web/trpc/react'

export default function EditPage() {
    const params = useParams<{
        rbaId: string
        aktivitasRbaId: string
        rincianRbaId: string
    }>()

    const rincianRba = api.rincianRbaPendapatan.getById.useQuery(
        parseInt(params.rincianRbaId ?? '')
    )

    if ((rincianRba.isSuccess && !rincianRba.data) || rincianRba.isError)
        return (
            <Navigate
                to={`/anggaran/rba/penyusunan-rba/${params.rbaId}/aktivitas/${params.aktivitasRbaId}/rincian-rba`}
                replace
            />
        )

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <CardTitle>Edit Rincian RBA</CardTitle>
                <CardDescription>
                    Form untuk mengedit rincian rba
                </CardDescription>
            </div>
            {rincianRba.isSuccess && rincianRba.data && (
                <EditForm data={rincianRba.data} />
            )}
        </div>
    )
}
