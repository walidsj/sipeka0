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
    const params = useParams<{ rabId: string }>()

    const rab = api.rab.getById.useQuery(parseInt(params.rabId ?? ''))

    if ((rab.isSuccess && !rab.data) || rab.isError) return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Item Daftar RAB</CardTitle>
                <CardDescription>
                    Form untuk mengedit aktivitas rba
                </CardDescription>
            </CardHeader>
            <CardContent>
                {rab.isSuccess && rab.data && <EditForm data={rab.data} />}
            </CardContent>
        </Card>
    )
}
