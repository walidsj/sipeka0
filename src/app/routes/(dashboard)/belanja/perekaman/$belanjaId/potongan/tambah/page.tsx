import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { Navigate, useParams } from 'react-router-dom'
import CreateForm from './form'
import { api } from '@/web/trpc/react'

export default function EditPage() {
    const params = useParams<{ belanjaId: string }>()

    const belanja = api.belanja.getById.useQuery(Number(params.belanjaId))

    if ((belanja.isSuccess && !belanja.data) || belanja.isError)
        return <Navigate to={`/belanja/perekaman`} replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Potongan Belanja</CardTitle>
                <CardDescription>
                    Form untuk tambah potongan realisasi belanja
                </CardDescription>
            </CardHeader>
            <CardContent>
                {belanja.isSuccess && belanja.data && (
                    <CreateForm data={belanja.data} />
                )}
            </CardContent>
        </Card>
    )
}
