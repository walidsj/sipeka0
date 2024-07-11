import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router-dom'
import LpjBelanjaTable from './table'
import { HiOutlinePlus } from 'react-icons/hi'

export default function Page() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>LPJ Belanja</CardTitle>
                    <CardDescription>
                        Daftar LPJ Belanja Bendahara Pengeluaran BLUD RSJD Atma
                        Husada Mahakam
                    </CardDescription>
                </div>
                <div>
                    <Button asChild>
                        <Link to="/belanja/lpj-belanja/tambah">
                            <HiOutlinePlus className="mr-2" />
                            Tambah
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <LpjBelanjaTable />
            </CardContent>
        </Card>
    )
}
