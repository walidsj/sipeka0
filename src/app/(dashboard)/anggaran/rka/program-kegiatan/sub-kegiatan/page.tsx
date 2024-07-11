import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import SubKegiatanRkaTable from './table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

export default function Page() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>Daftar Sub Kegiatan</CardTitle>
                    <CardDescription>
                        Sub Kegiatan RKA sesuai dengan peraturan yang berlaku
                    </CardDescription>
                </div>
                <div>
                    <Button asChild>
                        <Link to="/anggaran/rka/program-kegiatan/sub-kegiatan/tambah">
                            <FiPlus className="mr-2" />
                            Tambah
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <SubKegiatanRkaTable />
            </CardContent>
        </Card>
    )
}
