import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import BkPajakTable from './table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { HiOutlineChevronDoubleDown, HiOutlinePrinter } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function Page() {
    return (
        <Card>
            <div className="mb-5 flex flex-row items-center justify-between px-6 pt-6">
                <CardHeader className="p-0">
                    <CardTitle>Buku Pembantu Pajak</CardTitle>
                    <CardDescription>
                        Daftar penerimaan dan penyetoran pajak yang telah dibuat
                    </CardDescription>
                </CardHeader>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Aksi <HiOutlineChevronDoubleDown className="ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <Link to={`/belanja/buku/bk-pajak/cetak`}>
                            <DropdownMenuItem>
                                <HiOutlinePrinter className="mr-2" />
                                Cetak
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <CardContent>
                <BkPajakTable />
            </CardContent>
        </Card>
    )
}
