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

export default function EditPegawai() {
    const params = useParams<{ id: string }>()

    const pegawai = api.pegawai.getById.useQuery(parseInt(params.id!))

    if ((pegawai.isSuccess && !pegawai.data) || pegawai.isError)
        return <Navigate to="/lainnya/database/pegawai" replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Pegawai</CardTitle>
                <CardDescription>
                    Form untuk mengedit data pegawai
                </CardDescription>
            </CardHeader>
            <CardContent>
                {pegawai.isSuccess && pegawai.data && (
                    <EditForm data={pegawai.data} />
                )}
            </CardContent>
        </Card>
    )
}
