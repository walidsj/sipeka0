import { Button } from '@/web/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/web/components/ui/card'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Page() {
    return (
        <div className="grid grid-cols-6 gap-5">
            <Card>
                <CardHeader>
                    <CardTitle className="mb-2">
                        Surat Perintah Pengesahan Pendapatan dan Belanja (SP3B)
                    </CardTitle>
                    <Button asChild className="bg-secondary">
                        <Link to="/akuntansi/sp3b">
                            Akses
                            <FiArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Laporan Realisasi Anggaran</CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}
