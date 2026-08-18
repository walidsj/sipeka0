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

export default function EditRekanan() {
    const params = useParams<{ id: string }>()

    const rekanan = api.rekanan.getById.useQuery(parseInt(params.id!))

    if ((rekanan.isSuccess && !rekanan.data) || rekanan.isError)
        return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Rekanan</CardTitle>
                <CardDescription>
                    Form untuk mengedit data rekanan
                </CardDescription>
            </CardHeader>
            <CardContent>
                {rekanan.isSuccess && rekanan.data && (
                    <EditForm data={rekanan.data} />
                )}
            </CardContent>
        </Card>
    )
}
