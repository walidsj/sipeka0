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
import BankTable from './table'

export default function Bank() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Daftar Bank</CardTitle>
                    <CardDescription>
                        Daftar referensi bank untuk transaksi BLUD
                    </CardDescription>
                </div>
                <div>
                    <Button asChild>
                        <Link to="/lainnya/database/bank/tambah">
                            <FiPlus className="mr-2" />
                            Tambah
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <BankTable />
            </CardContent>
        </Card>
    )
}
