import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Navigate, useParams } from 'react-router-dom'
import EditForm from './form'
import { api } from '@/trpc/react'

export default function EditPage() {
    const params = useParams<{ rkaId: string }>()

    const rka = api.rka.getById.useQuery(parseInt(params.rkaId!))

    if ((rka.isSuccess && !rka.data) || rka.isError)
        return <Navigate to="/anggaran/rka/dokumen-rka" replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit RKA</CardTitle>
                <CardDescription>Form untuk mengedit rka</CardDescription>
            </CardHeader>
            <CardContent>
                {rka.isSuccess && rka.data && <EditForm data={rka.data} />}
            </CardContent>
        </Card>
    )
}
