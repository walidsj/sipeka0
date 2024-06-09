import { Button } from '@/web/components/ui/button'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import RabTable from './table'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'

export default function Page() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>Daftar RAB</CardTitle>
                    <CardDescription>
                        Rencana Belanja sesuai dengan kebutuhan Unit Kerja
                    </CardDescription>
                </div>
                <div>
                    <Button asChild>
                        <Link to="/anggaran/rba/daftar-rab/tambah">
                            <FiPlus className="mr-2" />
                            Tambah
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <RabTable />
            </CardContent>
        </Card>
    )
}
