import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import CreateForm from './form'

export default function Page() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Unit Kerja</CardTitle>
                <CardDescription>
                    Form untuk menambah data unit kerja
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreateForm />
            </CardContent>
        </Card>
    )
}
