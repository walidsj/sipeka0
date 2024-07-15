import { CardDescription, CardTitle } from '@/components/ui/card'
import { useParams } from 'react-router-dom'
import EditForm from './form'
import { api } from '@/trpc/react'
import NotFound from '@/app/not-found'

export default function Page() {
    const params = useParams<{ id: string }>()

    const pengelolaBlud = api.pengelolaBlud.getById.useQuery(
        parseInt(params.id!)
    )

    if (
        (pengelolaBlud.isSuccess && !pengelolaBlud.data) ||
        pengelolaBlud.isError
    )
        return <NotFound />

    return (
        <div className="flex flex-col gap-5">
            <div>
                <CardTitle>Edit Pengelola</CardTitle>
                <CardDescription>
                    Form untuk mengedit data pengelola
                </CardDescription>
            </div>
            {pengelolaBlud.isSuccess && pengelolaBlud.data && (
                <EditForm data={pengelolaBlud.data} />
            )}
        </div>
    )
}
