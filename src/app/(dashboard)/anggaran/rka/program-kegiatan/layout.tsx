import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FiBriefcase, FiCommand } from 'react-icons/fi'
import { CgWorkAlt } from 'react-icons/cg'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex flex-col gap-5 pt-5">
            <div className="flex gap-3">
                <Button
                    variant="outline"
                    className={cn(
                        pathname.startsWith(
                            '/anggaran/rka/program-kegiatan/program'
                        ) && 'bg-slate-600 text-white'
                    )}
                    asChild
                >
                    <Link to="/anggaran/rka/program-kegiatan/program">
                        <FiCommand className="mr-2" />
                        Program
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    className={cn(
                        pathname.startsWith(
                            '/anggaran/rka/program-kegiatan/kegiatan'
                        ) && 'bg-slate-600 text-white'
                    )}
                    asChild
                >
                    <Link to="/anggaran/rka/program-kegiatan/kegiatan">
                        <FiBriefcase className="mr-2" />
                        Kegiatan
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    className={cn(
                        pathname.startsWith(
                            '/anggaran/rka/program-kegiatan/sub-kegiatan'
                        ) && 'bg-slate-600 text-white'
                    )}
                    asChild
                >
                    <Link to="/anggaran/rka/program-kegiatan/sub-kegiatan">
                        <CgWorkAlt className="mr-2" />
                        Sub Kegiatan
                    </Link>
                </Button>
            </div>
            <Outlet />
        </div>
    )
}
