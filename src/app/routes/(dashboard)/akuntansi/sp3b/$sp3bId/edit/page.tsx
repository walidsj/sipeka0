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
    const params = useParams<{ sp3bId: string }>()

    const sp3b = api.sp3b.getById.useQuery(parseInt(params.sp3bId!))

    if ((sp3b.isSuccess && !sp3b.data) || sp3b.isError)
        return <Navigate to="/akuntansi/sp3b" replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Dokumen SP3B</CardTitle>
                <CardDescription>Form untuk mengedit dokumen</CardDescription>
            </CardHeader>
            <CardContent>
                {sp3b.isSuccess && sp3b.data && <EditForm data={sp3b.data} />}
            </CardContent>
        </Card>
    )
}
