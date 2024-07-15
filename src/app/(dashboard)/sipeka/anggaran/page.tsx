import { Button } from '@/components/ui/button'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    HiOutlineArrowSmRight,
    HiOutlineBookOpen,
    HiOutlineDocumentSearch,
    HiOutlineDocumentText,
} from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function Page() {
    return (
        <div className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row gap-4">
                    <div>
                        <CardTitle className="mb-3">
                            Rencana Bisnis dan Anggaran
                        </CardTitle>
                        <CardDescription>
                            Dokumen perencanaan bisnis dan penganggaran tahunan
                        </CardDescription>
                    </div>
                    <HiOutlineDocumentText className="flex-shrink-0 flex-grow-0 text-5xl text-primary" />
                </CardHeader>
                <CardFooter>
                    <Button asChild>
                        <Link to="rba/daftar-rab">
                            Akses
                            <HiOutlineArrowSmRight className="ml-2" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader className="flex flex-row gap-4">
                    <div>
                        <CardTitle className="mb-3">
                            Dokumen Bisnis dan Anggaran
                        </CardTitle>
                        <CardDescription>
                            Rencana bisnis dan anggaran BLUD yang telah disahkan
                            dan ditetapkan untuk dilaksanakan
                        </CardDescription>
                    </div>
                    <HiOutlineBookOpen className="flex-shrink-0 flex-grow-0 text-5xl text-primary" />
                </CardHeader>
                <CardFooter>
                    <Button asChild>
                        <Link to="dba/penetapan">
                            Akses
                            <HiOutlineArrowSmRight className="ml-2" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader className="flex flex-row gap-4">
                    <div>
                        <CardTitle className="mb-3">Monitoring</CardTitle>
                        <CardDescription>
                            Menu untuk melakukan monitoring anggaran dan
                            realisasi
                        </CardDescription>
                    </div>
                    <HiOutlineDocumentSearch className="flex-shrink-0 flex-grow-0 text-5xl text-primary" />
                </CardHeader>
                <CardFooter>
                    <Button asChild>
                        <Link to="monitoring/realisasi-belanja">
                            Akses
                            <HiOutlineArrowSmRight className="ml-2" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
