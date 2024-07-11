import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { FiBookOpen, FiDatabase, FiSettings, FiUsers } from 'react-icons/fi'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex w-full flex-row gap-4">
            <div className="flex min-h-[calc(100svh-138px)] w-28 flex-col">
                <nav>
                    <ul className="flex w-full flex-col gap-4">
                        <li>
                            <Link to="/lainnya/database/unit-kerja">
                                <Card
                                    className={cn(
                                        'flex flex-col items-center gap-1 px-3 py-2 text-center font-semibold',
                                        pathname.startsWith(
                                            '/lainnya/database'
                                        ) && 'text-primary'
                                    )}
                                >
                                    <FiDatabase className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Database
                                    </span>
                                </Card>
                            </Link>
                        </li>
                        <li>
                            <Link to="/lainnya/pengaturan/profil-blud">
                                <Card
                                    className={cn(
                                        'flex flex-col items-center gap-1 px-3 py-2 text-center font-semibold',
                                        pathname.startsWith(
                                            '/lainnya/pengaturan'
                                        ) && 'text-primary'
                                    )}
                                >
                                    <FiSettings className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Pengaturan
                                    </span>
                                </Card>
                            </Link>
                        </li>
                        <li>
                            <Link to="/lainnya/referensi/kode-rekening/1">
                                <Card
                                    className={cn(
                                        'flex flex-col items-center gap-1 px-3 py-2 text-center font-semibold',
                                        pathname.startsWith(
                                            '/lainnya/referensi'
                                        ) && 'text-primary'
                                    )}
                                >
                                    <FiBookOpen className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Referensi
                                    </span>
                                </Card>
                            </Link>
                        </li>
                        <li>
                            <Link to="/lainnya/user">
                                <Card
                                    className={cn(
                                        'flex flex-col items-center gap-1 px-3 py-2 text-center font-semibold',
                                        pathname.startsWith('/lainnya/user') &&
                                            'text-primary'
                                    )}
                                >
                                    <FiUsers className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Manajemen User
                                    </span>
                                </Card>
                            </Link>
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
