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
    const params = useParams<{ id: string }>()

    const subKegiatanRka = api.subKegiatanRka.getById.useQuery(
        parseInt(params.id!)
    )

    if (
        (subKegiatanRka.isSuccess && !subKegiatanRka.data) ||
        subKegiatanRka.isError
    )
        return (
            <Navigate
                to="/anggaran/rka/program-kegiatan/sub-kegiatan"
                replace
            />
        )

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Sub Kegiatan</CardTitle>
                <CardDescription>
                    Form untuk mengedit data sub kegiatan
                </CardDescription>
            </CardHeader>
            <CardContent>
                {subKegiatanRka.isSuccess && subKegiatanRka.data && (
                    <EditForm data={subKegiatanRka.data} />
                )}
            </CardContent>
        </Card>
    )
}
