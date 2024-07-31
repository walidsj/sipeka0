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
                <CardTitle>Import Data Rekening Koran</CardTitle>
                <CardDescription>
                    Import data CSV Rekening Koran dari CMS BPD KALTIMTARA
                </CardDescription>
            </CardHeader>

            <CardContent>
                <CreateForm />
            </CardContent>
        </Card>
    )
}
