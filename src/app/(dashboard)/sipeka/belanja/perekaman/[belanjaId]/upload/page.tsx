import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import CreateForm from './form'
import { api } from '@/trpc/react'
import Loading from '@/components/loading'
import NotFound from '@/app/not-found'
import { useNavigate, useParams } from 'react-router-dom'

export default function Page() {
    const params = useParams<{ belanjaId: string }>()
    const utils = api.useUtils()
    const navigate = useNavigate()

    const {
        data: belanja,
        isError,
        isLoading,
    } = api.belanja.getById.useQuery(Number(params.belanjaId))

    if (isLoading) return <Loading />

    if (isError) return <NotFound />

    if (!belanja) return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload File Belanja</CardTitle>
                <CardDescription>{belanja.uraian}</CardDescription>
            </CardHeader>

            <CardContent>
                <CreateForm />
            </CardContent>
        </Card>
    )
}
