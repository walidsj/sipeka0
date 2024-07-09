import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import DetailTable from './table'

export default function Page() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Rincian Realisasi</CardTitle>
                <CardDescription>Daftar belanja terealisasi</CardDescription>
            </CardHeader>
            <CardContent>
                <DetailTable />
            </CardContent>
        </Card>
    )
}
