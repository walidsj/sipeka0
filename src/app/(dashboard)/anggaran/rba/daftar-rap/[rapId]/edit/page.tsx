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
    const params = useParams<{ rapId: string }>()

    const rap = api.rap.getById.useQuery(parseInt(params.rapId ?? ''))

    if ((rap.isSuccess && !rap.data) || rap.isError)
        return (
            <Navigate to={`/anggaran/rba/daftar-rap/${params.rapId}`} replace />
        )

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Item Daftar RAP</CardTitle>
                <CardDescription>
                    Form untuk mengedit aktivitas rba
                </CardDescription>
            </CardHeader>
            <CardContent>
                {rap.isSuccess && rap.data && <EditForm data={rap.data} />}
            </CardContent>
        </Card>
    )
}
