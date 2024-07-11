import { Button } from '@/components/ui/button'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FiPlus } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import AktivitasRbaTable from './table'

export default function Page() {
    const params = useParams<{ rkaId: string }>()

    return (
        <div>
            <div className="mb-5 flex flex-row items-center justify-between">
                <CardHeader className="p-0">
                    <CardTitle>Rincian RKA</CardTitle>
                    <CardDescription>
                        Daftar rincian rencana kerja anggaran
                    </CardDescription>
                </CardHeader>
                <Button asChild>
                    <Link
                        to={`/anggaran/rka/dokumen-rka/${params.rkaId}/rincian/tambah`}
                    >
                        <FiPlus className="mr-2" />
                        Tambah
                    </Link>
                </Button>
            </div>
            <AktivitasRbaTable />
        </div>
    )
}
