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
import RekeningKoranTable from './table'

export default function Page() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>Rekening Koran</CardTitle>
                    <CardDescription>
                        Daftar Rekening Koran Bank BLUD
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
                <RekeningKoranTable />
            </CardContent>
        </Card>
    )
}
