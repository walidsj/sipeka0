import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'

export default function Dashboard() {
    return (
        <div className="grid grid-cols-4 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <img
                        src="/images/icons/divided.png"
                        alt="Pagu Belanja"
                        className="h-14 w-14"
                    />
                    <div className="flex flex-col gap-1">
                        <CardTitle>20.000.000.000</CardTitle>
                        <CardDescription>Pagu Belanja</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <img
                        src="/images/icons/payment.png"
                        alt="Realisasi Belanja"
                        className="h-14 w-14"
                    />
                    <div className="flex flex-col gap-1">
                        <CardTitle>20.000.000.000</CardTitle>
                        <CardDescription>Realisasi Belanja</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <img
                        src="/images/icons/list.png"
                        alt="Target Pendapatan"
                        className="h-14 w-14"
                    />
                    <div className="flex flex-col gap-1">
                        <CardTitle>20.000.000.000</CardTitle>
                        <CardDescription>Target Pendapatan</CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <img
                        src="/images/icons/salary.png"
                        alt="Realisasi Pendapatan"
                        className="h-14 w-14"
                    />
                    <div className="flex flex-col gap-1">
                        <CardTitle>20.000.000.000</CardTitle>
                        <CardDescription>Realisasi Pendapatan</CardDescription>
                    </div>
                </CardHeader>
            </Card>
        </div>
    )
}
