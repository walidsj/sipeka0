import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import KegiatanRkaTable from './table'
import { Button } from '@/web/components/ui/button'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

export default function Page() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Daftar Kegiatan</CardTitle>
                    <CardDescription>
                        Kegiatan RKA sesuai dengan peraturan yang berlaku
                    </CardDescription>
                </div>
                <div>
                    <Button asChild>
                        <Link to="/anggaran/rka/program-kegiatan/kegiatan/tambah">
                            <FiPlus className="mr-2" />
                            Tambah
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <KegiatanRkaTable />
            </CardContent>
        </Card>
    )
}
