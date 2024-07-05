import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import CreateForm from './form'

export default function Page() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Buat Dokumen SP3B</CardTitle>
                <CardDescription>
                    Form untuk menambah dokumen baru
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreateForm />
            </CardContent>
        </Card>
    )
}
