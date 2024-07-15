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

export default function EditPage() {
    const params = useParams<{ belanjaId: string }>()

    const belanja = api.belanja.getById.useQuery(Number(params.belanjaId))

    if ((belanja.isSuccess && !belanja.data) || belanja.isError)
        return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Rekam Belanja</CardTitle>
                <CardDescription>
                    Form untuk edit rekam realisasi belanja
                </CardDescription>
            </CardHeader>
            <CardContent>
                {belanja.isSuccess && belanja.data && (
                    <EditForm data={belanja.data} />
                )}
            </CardContent>
        </Card>
    )
}
