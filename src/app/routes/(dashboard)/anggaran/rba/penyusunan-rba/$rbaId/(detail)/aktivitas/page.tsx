import { Button } from '@/web/components/ui/button'
import { FiPlus } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import AktivitasTable from './table'
import { CardDescription, CardTitle } from '@/web/components/ui/card'

export default function Page() {
    const params = useParams<{ rbaId: string }>()
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
                    <Link
                        to={`/anggaran/rba/penyusunan-rba/${params.rbaId}/aktivitas/tambah`}
                    >
                        <FiPlus className="mr-2" />
                        Tambah
                    </Link>
                </Button>
            </div>
            <AktivitasTable />
        </div>
    )
}
