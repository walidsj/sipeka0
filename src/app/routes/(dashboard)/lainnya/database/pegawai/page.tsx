import { Button } from '@/web/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PegawaiTable from './table'

export default function Pegawai() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Daftar Pegawai</CardTitle>
                    <CardDescription>
                        Daftar pegawai yang terdaftar di BLUD
                    </CardDescription>
                </div>
                <div>
                    <Button asChild>
                        <Link to="/lainnya/database/pegawai/tambah">
                            <FiPlus className="mr-2" />
                            Tambah
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <PegawaiTable />
            </CardContent>
        </Card>
    )
}
