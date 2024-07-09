import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu'
import { Button } from '@/web/components/ui/button'
import { HiOutlineChevronDoubleDown, HiOutlinePrinter } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import LraTable from './table'

export default function Page() {
    return (
        <Card>
            <div className="mb-5 flex flex-row items-center justify-between px-6 pt-6">
                <CardHeader className="p-0">
                    <CardTitle>Laporan Realisasi Anggaran</CardTitle>
                    <CardDescription>
                        Data laporan realisasi anggaran
                    </CardDescription>
                </CardHeader>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Aksi <HiOutlineChevronDoubleDown className="ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <Link to={`/belanja/lra/cetak`}>
                            <DropdownMenuItem>
                                <HiOutlinePrinter className="mr-2" />
                                Cetak
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <CardContent>
                <LraTable />
            </CardContent>
        </Card>
    )
}
