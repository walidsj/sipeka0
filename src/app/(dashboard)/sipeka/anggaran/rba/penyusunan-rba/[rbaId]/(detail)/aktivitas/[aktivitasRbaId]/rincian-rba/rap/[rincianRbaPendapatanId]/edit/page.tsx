import { CardDescription, CardTitle } from '@/components/ui/card'
import { useParams } from 'react-router-dom'
import EditForm from './form'
import { api } from '@/trpc/react'
import NotFound from '@/app/not-found'

export default function EditPage() {
    const params = useParams<{
        rbaId: string
        aktivitasRbaId: string
        rincianRbaPendapatanId: string
    }>()

    const rincianRba = api.rincianRbaPendapatan.getById.useQuery(
        parseInt(params.rincianRbaPendapatanId ?? '')
    )

    if ((rincianRba.isSuccess && !rincianRba.data) || rincianRba.isError)
        return <NotFound />

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
