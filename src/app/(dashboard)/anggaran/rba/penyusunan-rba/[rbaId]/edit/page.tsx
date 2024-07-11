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
    const params = useParams<{ rbaId: string }>()

    const rba = api.rba.getById.useQuery(parseInt(params.rbaId!))

    if ((rba.isSuccess && !rba.data) || rba.isError)
        return <Navigate to="/anggaran/rba/penyusunan-rba" replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit RBA</CardTitle>
                <CardDescription>Form untuk mengedit rba</CardDescription>
            </CardHeader>
            <CardContent>
                {rba.isSuccess && rba.data && <EditForm data={rba.data} />}
            </CardContent>
        </Card>
    )
}
