import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { Button } from '@/web/components/ui/button'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'
import Sp3bTable from './table'

export default function Page() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>Daftar SP3B</CardTitle>
                    <CardDescription>
                        Data surat perintah pengesahan pendapatan dan belanja
                        (SP3B)
                    </CardDescription>
                </div>
                <div>
                    <Button asChild>
                        <Link to="/akuntansi/sp3b/tambah">
                            <FiPlus className="mr-2" />
                            Buat
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Sp3bTable />
            </CardContent>
        </Card>
    )
}
