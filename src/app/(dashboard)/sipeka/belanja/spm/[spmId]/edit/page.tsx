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
    const params = useParams<{ spmId: string }>()

    const spm = api.spm.getById.useQuery(parseInt(params.spmId!))

    if ((spm.isSuccess && !spm.data) || spm.isError) return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Dokumen SPM</CardTitle>
                <CardDescription>Form untuk mengedit dokumen</CardDescription>
            </CardHeader>
            <CardContent>
                {spm.isSuccess && spm.data && <EditForm data={spm.data} />}
            </CardContent>
        </Card>
    )
}
