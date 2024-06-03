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
import UnitKerjaTable from './table'

export default function UnitKerja() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>Daftar Unit Kerja</CardTitle>
                    <CardDescription>
                        Daftar referensi unit kerja untuk BLUD
                    </CardDescription>
                </div>
                <div>
                    <Button asChild>
                        <Link to="/lainnya/database/unit-kerja/tambah">
                            <FiPlus className="mr-2" />
                            Tambah
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <UnitKerjaTable />
            </CardContent>
        </Card>
    )
}
