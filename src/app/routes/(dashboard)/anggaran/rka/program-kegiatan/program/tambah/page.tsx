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
                <CardTitle>Tambah Program</CardTitle>
                <CardDescription>
                    Form untuk menambah data program
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreateForm />
            </CardContent>
        </Card>
    )
}
