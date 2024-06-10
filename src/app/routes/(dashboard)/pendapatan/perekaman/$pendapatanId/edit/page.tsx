import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { Navigate, useParams } from 'react-router-dom'
import EditForm from './form'
import { api } from '@/web/trpc/react'

export default function EditPage() {
    const params = useParams<{ pendapatanId: string }>()

    const pendapatan = api.pendapatan.getById.useQuery(
        parseInt(params.pendapatanId ?? '')
    )

    if ((pendapatan.isSuccess && !pendapatan.data) || pendapatan.isError)
        return <Navigate to={`/anggaran/pendapatan/perekaman`} replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Rekam Pendapatan</CardTitle>
                <CardDescription>
                    Form untuk edit rekam realisasi pendapatan
                </CardDescription>
            </CardHeader>
            <CardContent>
                {pendapatan.isSuccess && pendapatan.data && (
                    <EditForm data={pendapatan.data} />
                )}
            </CardContent>
        </Card>
    )
}
