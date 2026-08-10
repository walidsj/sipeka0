import { CardDescription, CardTitle } from '@/components/ui/card'
import { useParams } from 'react-router-dom'
import EditForm from './form'
import { api } from '@/trpc/react'
import NotFound from '@/app/not-found'

export default function EditPage() {
    const params = useParams<{
        rbaId: string
        aktivitasRbaId: string
        rincianRbaBelanjaId: string
    }>()

    const rincianRbaBelanja = api.rincianRbaBelanja.getById.useQuery(
        parseInt(params.rincianRbaBelanjaId ?? '')
    )

    if (
        (rincianRbaBelanja.isSuccess && !rincianRbaBelanja.data) ||
        rincianRbaBelanja.isError
    )
        return <NotFound />

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <CardTitle>Edit Rincian RBA</CardTitle>
                <CardDescription>
                    Form untuk mengedit rincian rba
                </CardDescription>
            </div>
            {rincianRbaBelanja.isSuccess && rincianRbaBelanja.data && (
                <EditForm data={rincianRbaBelanja.data} />
            )}
        </div>
    )
}
