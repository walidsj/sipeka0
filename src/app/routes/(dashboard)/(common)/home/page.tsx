import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'

export default function Dashboard() {
    return (
        <div className="grid grid-cols-4 gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle>Pagu Belanja</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-extrabold">20.000.000.000</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle>Realisasi Belanja</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-extrabold">20.000.000.000</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle>Target Pendapatan</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-extrabold">20.000.000.000</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle>Realisasi Pendapatan</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-extrabold">20.000.000.000</p>
                </CardContent>
            </Card>
        </div>
    )
}
