import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import CreateForm from './form'

export default function CreateBank() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Bank</CardTitle>
                <CardDescription>Form untuk menambah data bank</CardDescription>
            </CardHeader>
            <CardContent>
                <CreateForm />
            </CardContent>
        </Card>
    )
}
