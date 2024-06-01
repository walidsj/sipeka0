import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'

export default function Anggaran() {
    return (
        <div>
            <div className="gap-4 grid grid-cols-4">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Pagu Belanja</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-extrabold text-2xl">
                            20.000.000.000
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Realisasi Belanja</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-extrabold text-2xl">
                            20.000.000.000
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Target Pendapatan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-extrabold text-2xl">
                            20.000.000.000
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle>Realisasi Pendapatan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="font-extrabold text-2xl">
                            20.000.000.000
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
