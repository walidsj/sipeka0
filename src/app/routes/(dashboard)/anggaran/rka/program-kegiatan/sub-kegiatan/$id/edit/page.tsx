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
    const params = useParams<{ id: string }>()

    const kegiatanRka = api.kegiatanRka.getById.useQuery(parseInt(params.id!))

    if ((kegiatanRka.isSuccess && !kegiatanRka.data) || kegiatanRka.isError)
        return <Navigate to="/anggaran/rka/program-kegiatan/kegiatan" replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Kegiatan</CardTitle>
                <CardDescription>
                    Form untuk mengedit data kegiatan
                </CardDescription>
            </CardHeader>
            <CardContent>
                {kegiatanRka.isSuccess && kegiatanRka.data && (
                    <EditForm data={kegiatanRka.data} />
                )}
            </CardContent>
        </Card>
    )
}
