import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import BkPajakTable from './table'

export default function Page() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Buku Pembantu Pajak</CardTitle>
                <CardDescription>
                    Daftar penerimaan dan penyetoran pajak yang telah dibuat
                </CardDescription>
            </CardHeader>
            <CardContent>
                <BkPajakTable />
            </CardContent>
        </Card>
    )
}
