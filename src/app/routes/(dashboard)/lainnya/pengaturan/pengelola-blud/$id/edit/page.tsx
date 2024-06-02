import { CardDescription, CardTitle } from '@/web/components/ui/card'
import { Navigate, useParams } from 'react-router-dom'
import EditForm from './form'
import { api } from '@/web/trpc/react'

export default function Page() {
    const params = useParams<{ id: string }>()

    const pengelolaBlud = api.pengelolaBlud.getById.useQuery(
        parseInt(params.id!)
    )

    if (
        (pengelolaBlud.isSuccess && !pengelolaBlud.data) ||
        pengelolaBlud.isError
    )
        return <Navigate to="/lainnya/pengaturan/pengelola-blud" replace />

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
