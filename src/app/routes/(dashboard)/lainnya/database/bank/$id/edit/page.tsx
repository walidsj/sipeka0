import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { Navigate, useParams } from 'react-router-dom'
import EditForm from './form'
import { api } from '@/web/trpc/react'

export default function EditBank() {
    const params = useParams<{ id: string }>()

    const bank = api.bank.getById.useQuery(parseInt(params.id!))

    if ((bank.isSuccess && !bank.data) || bank.isError)
        return <Navigate to="/lainnya/database/bank" replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Bank</CardTitle>
                <CardDescription>Form untuk mengedit data bank</CardDescription>
            </CardHeader>
            <CardContent>
                {bank.isSuccess && bank.data && <EditForm data={bank.data} />}
            </CardContent>
        </Card>
    )
}
