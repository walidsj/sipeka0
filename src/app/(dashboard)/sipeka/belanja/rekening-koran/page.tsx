import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import RekeningKoranTable from './table'

export default function Page() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Rekening Koran</CardTitle>
                <CardDescription>
                    Daftar Rekening Koran Bank BLUD
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RekeningKoranTable />
            </CardContent>
        </Card>
    )
}
