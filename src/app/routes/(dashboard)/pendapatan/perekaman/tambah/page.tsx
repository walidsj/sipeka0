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
                <CardTitle>Rekam Pendapatan Baru</CardTitle>
                <CardDescription>
                    Form untuk rekam realisasi pendapatan baru
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreateForm />
            </CardContent>
        </Card>
    )
}
