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
import RbaTable from './table'

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-1.5">
                        <CardTitle>Dokumen RBA</CardTitle>
                        <CardDescription>
                            Daftar dokumen RBA yang telah disusun
                        </CardDescription>
                    </div>
                    <Button asChild>
                        <Link to="/anggaran/rba/penyusunan-rba/tambah">
                            <FiPlus className="mr-2" />
                            Buat RBA
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <RbaTable />
                </CardContent>
            </Card>
        </div>
    )
}
