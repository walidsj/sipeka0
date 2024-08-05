import { Card, CardHeader } from '@/components/ui/card'
import { api } from '@/trpc/react'

export default function Page() {
    const document = api.tool.getCetakLraSipd.useQuery()

    if (document.isLoading)
        return <div>Mengambil data dari sipd.kemendagri.go.id...</div>

    if (!document.data) return <div>Data not found</div>

    return (
        <Card>
            <CardHeader
                dangerouslySetInnerHTML={{ __html: document.data }}
            ></CardHeader>
        </Card>
    )
}
