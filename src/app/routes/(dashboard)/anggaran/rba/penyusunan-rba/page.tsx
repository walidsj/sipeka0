import { Button } from '@/web/components/ui/button'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import RbaContentList from './content'

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <div>
                <Button asChild>
                    <Link to="/anggaran/rba/penyusunan-rba/tambah">
                        <FiPlus className="mr-2" />
                        Buat Dokumen RBA
                    </Link>
                </Button>
            </div>
            <RbaContentList />
        </div>
    )
}
