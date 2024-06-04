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
import FarmasiTable from './table'

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-1.5">
                        <CardTitle>Rincian Pengadaan Reagen</CardTitle>
                        <CardDescription>Item pengadaan reagen</CardDescription>
                    </div>
                    <Button asChild>
                        <Link to="/pengadaan/permohonan-rutin/farmasi/tambah">
                            <FiPlus className="mr-2" />
                            Tambah Item
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <FarmasiTable />
                </CardContent>
            </Card>
        </div>
    )
}
