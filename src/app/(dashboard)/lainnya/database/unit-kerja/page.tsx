import { Button } from '@/components/ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import UnitKerjaTable from './table'
import { TableBoundary } from '@/components/table-boundary'

export default function UnitKerja() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Daftar Unit Kerja</CardTitle>
                <CardDescription>
                    Daftar referensi unit kerja untuk BLUD
                </CardDescription>
                <CardAction>
                    <Button asChild>
                        <Link to="tambah">
                            <FiPlus className="mr-2" />
                            Tambah
                        </Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent>
                <TableBoundary>
                    <UnitKerjaTable />
                </TableBoundary>
            </CardContent>
        </Card>
    )
}
