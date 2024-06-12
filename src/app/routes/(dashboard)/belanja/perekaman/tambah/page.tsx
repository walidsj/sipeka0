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
                <CardTitle>Rekam Belanja Baru</CardTitle>
                <CardDescription>
                    Form untuk rekam realisasi belanja baru
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreateForm />
            </CardContent>
        </Card>
    )
}
