import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import RekananTable from './table'

export default function Page() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>Daftar Rekanan</CardTitle>
                    <CardDescription>
                        Daftar rekanan yang bertransaksi dengan BLUD
                    </CardDescription>
                </div>
                <div>
                    <Button asChild>
                        <Link to="tambah">
                            <FiPlus className="mr-2" />
                            Tambah
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <RekananTable />
            </CardContent>
        </Card>
    )
}
