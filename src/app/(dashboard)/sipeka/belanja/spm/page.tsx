import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { HiOutlinePlus } from 'react-icons/hi'
import SpmTable from './table'

export default function Page() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>SPM Belanja</CardTitle>
                    <CardDescription>
                        Daftar SPM Belanja Bendahara Pengeluaran BLUD RSJD Atma
                        Husada Mahakam
                    </CardDescription>
                </div>
                <div>
                    <Button asChild>
                        <Link to="tambah">
                            <HiOutlinePlus className="mr-2" />
                            Tambah
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <SpmTable />
            </CardContent>
        </Card>
    )
}
