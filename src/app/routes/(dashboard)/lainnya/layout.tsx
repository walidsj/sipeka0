import { Button } from '@/web/components/ui/button'
import { cn } from '@/web/lib/utils'
import { FiBookOpen, FiDatabase, FiSettings, FiUsers } from 'react-icons/fi'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function DashboardLayout() {
    const { pathname } = useLocation()

    return (
        <div className="flex w-full flex-row">
            <div className="flex min-h-[calc(100svh-138px)] w-28 flex-col bg-background shadow">
                <nav>
                    <ul className="flex w-full flex-col">
                        <li>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'flex h-auto w-full flex-col justify-center gap-1 rounded-none px-8 py-3 text-center',
                                    pathname.startsWith('/lainnya/database') &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                                asChild
                            >
                                <Link to="/lainnya/database/pegawai">
                                    <FiDatabase className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Database
                                    </span>
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'flex h-auto w-full flex-col justify-center gap-1 rounded-none px-8 py-3 text-center',
                                    pathname.startsWith(
                                        '/lainnya/pengaturan'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                                asChild
                            >
                                <Link to="/lainnya/pengaturan/profil-blud">
                                    <FiSettings className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Pengaturan
                                    </span>
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'flex h-auto w-full flex-col justify-center gap-1 rounded-none px-8 py-3 text-center',
                                    pathname.startsWith('/lainnya/referensi') &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                                asChild
                            >
                                <Link to="/lainnya/referensi/kode-rekening">
                                    <FiBookOpen className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Referensi
                                    </span>
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'flex h-auto w-full flex-col justify-center gap-1 rounded-none px-8 py-3 text-center',
                                    pathname.startsWith('/lainnya/user') &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                                asChild
                            >
                                <Link to="/lainnya/user">
                                    <FiUsers className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Manajemen User
                                    </span>
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    )
}
