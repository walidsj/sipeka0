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

export default function EditRekanan() {
    const params = useParams<{ id: string }>()

    const rekanan = api.rekanan.getById.useQuery(parseInt(params.id!))

    if ((rekanan.isSuccess && !rekanan.data) || rekanan.isError)
        return <Navigate to="/lainnya/database/rekanan" replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Rekanan</CardTitle>
                <CardDescription>
                    Form untuk mengedit data rekanan
                </CardDescription>
            </CardHeader>
            <CardContent>
                {rekanan.isSuccess && rekanan.data && (
                    <EditForm data={rekanan.data} />
                )}
            </CardContent>
        </Card>
    )
}
