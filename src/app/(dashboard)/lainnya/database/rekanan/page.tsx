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
import RekananTable from './table'
import { TableBoundary } from '@/components/table-boundary'

export default function Page() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Daftar Rekanan</CardTitle>
                <CardDescription>
                    Daftar rekanan yang bertransaksi dengan BLUD
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
                    <RekananTable />
                </TableBoundary>
            </CardContent>
        </Card>
    )
}
