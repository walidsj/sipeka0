import { Button } from '@/components/ui/button'
import { FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import RkaContentList from './content'

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <div>
                <Button asChild>
                    <Link to="/anggaran/dba/penetapan/tambah">
                        <FiPlus className="mr-2" />
                        Buat Dokumen
                    </Link>
                </Button>
            </div>
            <RkaContentList />
        </div>
    )
}
