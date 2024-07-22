import { CardDescription, CardTitle } from '@/components/ui/card'
import { useParams } from 'react-router-dom'
import EditForm from './form'
import { api } from '@/trpc/react'
import NotFound from '@/app/not-found'

export default function Page() {
    const params = useParams<{ id: string }>()

    const rekeningBank = api.rekeningBank.getById.useQuery(parseInt(params.id!))

    if ((rekeningBank.isSuccess && !rekeningBank.data) || rekeningBank.isError)
        return <NotFound />

    return (
        <div className="flex flex-col gap-5">
            <div>
                <CardTitle>Edit Rekening Bank</CardTitle>
                <CardDescription>
                    Form untuk mengedit data rekening bank
                </CardDescription>
            </div>
            {rekeningBank.isSuccess && rekeningBank.data && (
                <EditForm data={rekeningBank.data} />
            )}
        </div>
    )
}
