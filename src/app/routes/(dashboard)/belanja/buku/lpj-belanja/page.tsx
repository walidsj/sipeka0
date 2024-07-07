import { Button } from '@/web/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { Link } from 'react-router-dom'
import LpjBelanjaTable from './table'
import { HiOutlinePlus } from 'react-icons/hi'

export default function Page() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>LPJ Belanja</CardTitle>
                <CardDescription>
                    Daftar LPJ Belanja Bendahara Pengeluaran BLUD RSJD Atma
                    Husada Mahakam
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button asChild>
                    <Link to="/belanja/buku/lpj-belanja/tambah">
                        <HiOutlinePlus className="mr-2" />
                        Tambah
                    </Link>
                </Button>
            </CardContent>
            <CardContent>
                <LpjBelanjaTable />
            </CardContent>
        </Card>
    )
}
