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

    const programRka = api.programRka.getById.useQuery(parseInt(params.id!))

    if ((programRka.isSuccess && !programRka.data) || programRka.isError)
        return <Navigate to="/anggaran/rka/program-kegiatan/program" replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Program</CardTitle>
                <CardDescription>
                    Form untuk mengedit data program
                </CardDescription>
            </CardHeader>
            <CardContent>
                {programRka.isSuccess && programRka.data && (
                    <EditForm data={programRka.data} />
                )}
            </CardContent>
        </Card>
    )
}
