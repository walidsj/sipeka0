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
    const params = useParams<{ dbaId: string }>()

    const dba = api.dba.getById.useQuery(parseInt(params.dbaId!))

    if ((dba.isSuccess && !dba.data) || dba.isError)
        return <Navigate to="/anggaran/dba/penetapan" replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit DBA</CardTitle>
                <CardDescription>Form untuk mengedit dba</CardDescription>
            </CardHeader>
            <CardContent>
                {dba.isSuccess && dba.data && <EditForm data={dba.data} />}
            </CardContent>
        </Card>
    )
}
