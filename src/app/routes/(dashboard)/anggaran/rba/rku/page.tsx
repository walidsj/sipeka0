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
import RkuTable from './table'

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex flex-col gap-1.5">
                        <CardTitle>Dokumen RKU</CardTitle>
                        <CardDescription>
                            Daftar dokumen rencana kebutuhan per unit
                        </CardDescription>
                    </div>
                    <Button asChild>
                        <Link to="/anggaran/rba/rku/tambah">
                            <FiPlus className="mr-2" />
                            Tambah
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <RkuTable />
                </CardContent>
            </Card>
        </div>
    )
}
