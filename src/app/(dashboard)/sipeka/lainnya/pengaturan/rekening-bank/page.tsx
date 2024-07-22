import { Button } from '@/components/ui/button'
import { CardDescription, CardTitle } from '@/components/ui/card'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import RekeningBankTable from './table'

export default function PengelolaBlud() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>Rekening Bank</CardTitle>
                    <CardDescription>Daftar Rekening Bank BLUD</CardDescription>
                </div>
                <div>
                    <Button asChild>
                        <Link to="tambah">
                            <FiPlus className="mr-2" />
                            Tambah
                        </Link>
                    </Button>
                </div>
            </div>
            <div>
                <RekeningBankTable />
            </div>
        </div>
    )
}
