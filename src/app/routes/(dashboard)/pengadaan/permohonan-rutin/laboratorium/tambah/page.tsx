import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import CreateForm from './form'

export default function CreatePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Pesanan Farmasi</CardTitle>
                <CardDescription>
                    Form untuk tambah permohonan pengadaan untuk farmasi
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreateForm />
            </CardContent>
        </Card>
    )
}
