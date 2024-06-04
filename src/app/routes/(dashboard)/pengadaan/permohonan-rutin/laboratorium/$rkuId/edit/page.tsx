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
    const params = useParams<{ rkuId: string }>()

    const rku = api.rku.getById.useQuery(parseInt(params.rkuId!))

    if ((rku.isSuccess && !rku.data) || rku.isError)
        return <Navigate to="/anggaran/rba/rku" replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit RKU</CardTitle>
                <CardDescription>Form untuk mengedit rku</CardDescription>
            </CardHeader>
            <CardContent>
                {rku.isSuccess && rku.data && <EditForm data={rku.data} />}
            </CardContent>
        </Card>
    )
}
