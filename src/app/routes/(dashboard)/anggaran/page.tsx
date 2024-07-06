import { Button } from '@/web/components/ui/button'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Page() {
    return (
        <div className="grid grid-cols-4 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle className="mb-2">
                        Rencana Bisnis dan Anggaran
                    </CardTitle>
                    <CardDescription>
                        Dokumen perencanaan bisnis dan penganggaran tahunan
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button asChild>
                        <Link to="/anggaran/rba/daftar-rab">
                            Akses
                            <FiArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="mb-2">
                        Rencana Kerja Anggaran
                    </CardTitle>
                    <CardDescription>
                        Dokumen perencanaan dan penganggaran program dan
                        kegiatan SKPD
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button asChild>
                        <Link to="/anggaran/rka/program-kegiatan/program">
                            Akses
                            <FiArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="mb-2">
                        Dokumen Bisnis dan Anggaran
                    </CardTitle>
                    <CardDescription>
                        Rencana bisnis dan anggaran BLUD yang telah disahkan dan
                        ditetapkan untuk dilaksanakan
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button asChild>
                        <Link to="/anggaran/dba/penetapan">
                            Akses
                            <FiArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="mb-2">Monitoring</CardTitle>
                    <CardDescription>
                        Menu untuk melakukan monitoring anggaran dan realisasi
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button asChild>
                        <Link to="/anggaran/monitoring/realisasi-belanja">
                            Akses
                            <FiArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
