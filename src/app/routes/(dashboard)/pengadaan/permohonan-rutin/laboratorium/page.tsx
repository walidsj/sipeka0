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
import LaboratoriumTable from './table'

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-1.5">
                        <CardTitle>Daftar Pesanan Laboratorium</CardTitle>
                        <CardDescription>
                            Daftar permohonan pengadaan dan pembelian reagen
                        </CardDescription>
                    </div>
                    <Button asChild>
                        <Link to="/pengadaan/permohonan-rutin/laboratorium/tambah">
                            <FiPlus className="mr-2" />
                            Tambah Pesanan
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <LaboratoriumTable />
                </CardContent>
            </Card>
        </div>
    )
}
