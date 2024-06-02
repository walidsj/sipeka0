import { Button } from '@/web/components/ui/button'
import { CardDescription, CardTitle } from '@/web/components/ui/card'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import PengelolaBludTable from './table'

export default function PengelolaBlud() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Penetapan Pengelola BLUD</CardTitle>
                    <CardDescription>
                        Daftar pegawai yang berperan sebagai pengelola BLUD
                    </CardDescription>
                </div>
                <div>
                    <Button asChild>
                        <Link to="/lainnya/pengaturan/pengelola-blud/tambah">
                            <FiPlus className="mr-2" />
                            Tambah
                        </Link>
                    </Button>
                </div>
            </div>
            <div>
                <PengelolaBludTable />
            </div>
        </div>
    )
}
