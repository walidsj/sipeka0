import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import CreateForm from './form'

export default function CreatePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Sub Kegiatan</CardTitle>
                <CardDescription>
                    Form untuk menambah data sub kegiatan
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreateForm />
            </CardContent>
        </Card>
    )
}
