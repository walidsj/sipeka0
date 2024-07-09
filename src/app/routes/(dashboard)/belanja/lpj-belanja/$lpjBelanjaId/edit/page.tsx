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
    const params = useParams<{ lpjBelanjaId: string }>()

    const lpjBelanja = api.lpjBelanja.getById.useQuery(
        parseInt(params.lpjBelanjaId!)
    )

    if ((lpjBelanja.isSuccess && !lpjBelanja.data) || lpjBelanja.isError)
        return <Navigate to="/belanja/lpj-belanja" replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Dokumen Lpj Belanja</CardTitle>
                <CardDescription>Form untuk mengedit dokumen</CardDescription>
            </CardHeader>
            <CardContent>
                {lpjBelanja.isSuccess && lpjBelanja.data && (
                    <EditForm data={lpjBelanja.data} />
                )}
            </CardContent>
        </Card>
    )
}
