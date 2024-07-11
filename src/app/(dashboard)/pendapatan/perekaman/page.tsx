import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import PendapatanTable from './table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

export default function CreatePage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>Daftar Perekaman Pendapatan</CardTitle>
                    <CardDescription>Data perekaman pendapatan</CardDescription>
                </div>
                <div>
                    <Button asChild>
                        <Link to="/pendapatan/perekaman/tambah">
                            <FiPlus className="mr-2" />
                            Tambah
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <PendapatanTable />
            </CardContent>
        </Card>
    )
}
