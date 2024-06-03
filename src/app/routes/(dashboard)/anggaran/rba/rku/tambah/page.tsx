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
                <CardTitle>Tambah RKU</CardTitle>
                <CardDescription>
                    Form untuk tambah dokumen rencana kebutuhan per unit
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreateForm />
            </CardContent>
        </Card>
    )
}
