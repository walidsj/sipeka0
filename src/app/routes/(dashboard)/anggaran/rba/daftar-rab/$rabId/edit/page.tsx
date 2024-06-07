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
    const params = useParams<{ rabId: string }>()

    const rab = api.rab.getById.useQuery(parseInt(params.rabId ?? ''))

    if ((rab.isSuccess && !rab.data) || rab.isError)
        return (
            <Navigate to={`/anggaran/rba/daftar-rab/${params.rabId}`} replace />
        )

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Item Daftar RAB</CardTitle>
                <CardDescription>
                    Form untuk mengedit aktivitas rba
                </CardDescription>
            </CardHeader>
            <CardContent>
                {rab.isSuccess && rab.data && <EditForm data={rab.data} />}
            </CardContent>
        </Card>
    )
}
