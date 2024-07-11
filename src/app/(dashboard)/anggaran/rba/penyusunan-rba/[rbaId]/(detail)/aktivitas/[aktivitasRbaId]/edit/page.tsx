import { CardDescription, CardTitle } from '@/components/ui/card'
import { Navigate, useParams } from 'react-router-dom'
import EditForm from './form'
import { api } from '@/trpc/react'

export default function EditPage() {
    const params = useParams<{ rbaId: string; aktivitasRbaId: string }>()

    const aktivitasRba = api.aktivitasRba.getById.useQuery(
        parseInt(params.aktivitasRbaId ?? '')
    )

    if ((aktivitasRba.isSuccess && !aktivitasRba.data) || aktivitasRba.isError)
        return (
            <Navigate
                to={`/anggaran/rba/penyusunan-rba/${params.rbaId}/aktivitas`}
                replace
            />
        )

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <CardTitle>Edit Aktivitas</CardTitle>
                <CardDescription>
                    Form untuk mengedit aktivitas rba
                </CardDescription>
            </div>
            {aktivitasRba.isSuccess && aktivitasRba.data && (
                <EditForm data={aktivitasRba.data} />
            )}
        </div>
    )
}
