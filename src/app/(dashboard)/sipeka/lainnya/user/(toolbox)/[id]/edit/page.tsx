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

export default function EditUser() {
    const params = useParams<{ id: string }>()

    const user = api.user.getById.useQuery(parseInt(params.id!))

    if ((user.isSuccess && !user.data) || user.isError) return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit User</CardTitle>
                <CardDescription>Form untuk mengedit data user</CardDescription>
            </CardHeader>
            <CardContent>
                {user.isSuccess && user.data && <EditForm data={user.data} />}
            </CardContent>
        </Card>
    )
}
