import { Button } from '@/components/ui/button'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { HiOutlineArrowSmRight, HiOutlineDocumentText } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function Page() {
    return (
        <div className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row gap-4">
                    <div className="w-full">
                        <CardTitle className="mb-3">SP3B</CardTitle>
                        <CardDescription>
                            Surat Perintah Pengesahan Pendapatan dan Belanja
                        </CardDescription>
                    </div>
                    <HiOutlineDocumentText className="flex-shrink-0 flex-grow-0 text-5xl text-primary" />
                </CardHeader>
                <CardFooter>
                    <Button asChild>
                        <Link to="/akuntansi/sp3b">
                            Akses
                            <HiOutlineArrowSmRight className="ml-2" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader className="flex flex-row gap-4">
                    <div className="w-full">
                        <CardTitle className="mb-3">Buku Besar</CardTitle>
                        <CardDescription>
                            Buku Besar per Kode Rekening
                        </CardDescription>
                    </div>
                    <HiOutlineDocumentText className="flex-shrink-0 flex-grow-0 text-5xl text-primary" />
                </CardHeader>
                <CardFooter>
                    <Button asChild>
                        <Link to="/akuntansi/buku-besar">
                            Akses
                            <HiOutlineArrowSmRight className="ml-2" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader className="flex flex-row gap-4">
                    <div className="w-full">
                        <CardTitle className="mb-3">LRA</CardTitle>
                        <CardDescription>
                            Laporan Realisasi Anggaran
                        </CardDescription>
                    </div>
                    <HiOutlineDocumentText className="flex-shrink-0 flex-grow-0 text-5xl text-primary" />
                </CardHeader>
                <CardFooter>
                    <Button asChild>
                        <Link to="/akuntansi/lra">
                            Akses
                            <HiOutlineArrowSmRight className="ml-2" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
