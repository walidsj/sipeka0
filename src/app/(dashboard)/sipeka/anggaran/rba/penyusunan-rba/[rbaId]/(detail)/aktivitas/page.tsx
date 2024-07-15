import { Button } from '@/components/ui/button'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import AktivitasTable from './table'
import { CardDescription, CardTitle } from '@/components/ui/card'

export default function Page() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>Aktivitas</CardTitle>
                    <CardDescription>
                        Daftar aktivitas BLUD dalam RBA
                    </CardDescription>
                </div>
                <Button asChild>
                    <Link to="tambah">
                        <FiPlus className="mr-2" />
                        Tambah
                    </Link>
                </Button>
            </div>
            <AktivitasTable />
        </div>
    )
}
