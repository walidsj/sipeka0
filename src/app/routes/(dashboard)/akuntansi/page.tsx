import { Card, CardHeader, CardTitle } from '@/web/components/ui/card'

export default function Page() {
    return (
        <div className="grid grid-cols-6 gap-5">
            <Card>
                <CardHeader>
                    <CardTitle>Laporan Realisasi Anggaran</CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}
