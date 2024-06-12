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
    const params = useParams<{ belanjaId: string }>()

    const belanja = api.belanja.getById.useQuery(Number(params.belanjaId))

    if ((belanja.isSuccess && !belanja.data) || belanja.isError)
        return <Navigate to={`/anggaran/belanja/perekaman`} replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Rekam Belanja</CardTitle>
                <CardDescription>
                    Form untuk edit rekam realisasi belanja
                </CardDescription>
            </CardHeader>
            <CardContent>
                {belanja.isSuccess && belanja.data && (
                    <EditForm data={belanja.data} />
                )}
            </CardContent>
        </Card>
    )
}
