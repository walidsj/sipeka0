import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import DetailTable from './table'

export default function Page() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Rincian Belanja</CardTitle>
                <CardDescription>Daftar belanja terealisasi</CardDescription>
            </CardHeader>
            <CardContent>
                <DetailTable />
            </CardContent>
        </Card>
    )
}
