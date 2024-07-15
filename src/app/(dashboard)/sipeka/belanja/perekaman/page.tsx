import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import BelanjaTable from './table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { FiPlus } from 'react-icons/fi'

export default function Page() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>Daftar Perekaman Belanja</CardTitle>
                    <CardDescription>Data perekaman belanja</CardDescription>
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
                <BelanjaTable />
            </CardContent>
        </Card>
    )
}
