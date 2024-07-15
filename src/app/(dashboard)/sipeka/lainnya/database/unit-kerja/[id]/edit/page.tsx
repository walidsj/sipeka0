import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useParams } from 'react-router-dom'
import EditForm from './form'
import { api } from '@/trpc/react'
import NotFound from '@/app/not-found'

export default function Page() {
    const params = useParams<{ id: string }>()

    const unitKerja = api.unitKerja.getById.useQuery(parseInt(params.id!))

    if ((unitKerja.isSuccess && !unitKerja.data) || unitKerja.isError)
        return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Unit Kerja</CardTitle>
                <CardDescription>
                    Form untuk mengedit data unit kerja
                </CardDescription>
            </CardHeader>
            <CardContent>
                {unitKerja.isSuccess && unitKerja.data && (
                    <EditForm data={unitKerja.data} />
                )}
            </CardContent>
        </Card>
    )
}
