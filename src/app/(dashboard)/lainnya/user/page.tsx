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
import UserTable from './table'
import { useAuth } from '@/lib/auth'

export default function Page() {
    const auth = useAuth()

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>Daftar User</CardTitle>
                    <CardDescription>
                        Daftar user yang terdaftar di sistem
                    </CardDescription>
                </div>
                {auth.user?.role === 'ADMIN' && (
                    <div>
                        <Button asChild>
                            <Link to="/lainnya/user/tambah">
                                <FiPlus className="mr-2" />
                                Tambah
                            </Link>
                        </Button>
                    </div>
                )}
            </CardHeader>
            <CardContent>
                <UserTable />
            </CardContent>
        </Card>
    )
}
