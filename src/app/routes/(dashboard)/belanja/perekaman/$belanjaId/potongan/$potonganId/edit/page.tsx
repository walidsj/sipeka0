import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { Navigate, useParams } from 'react-router-dom'
import { api } from '@/web/trpc/react'
import EditForm from './form'

export default function EditPage() {
    const params = useParams<{ potonganId: string }>()

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
            <CardContent>
                {potongan.isSuccess && potongan.data && (
                    <EditForm data={potongan.data} />
                )}
            </CardContent>
        </Card>
    )
}
