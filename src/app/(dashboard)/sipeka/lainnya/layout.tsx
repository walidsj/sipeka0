import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { FiBookOpen, FiDatabase, FiSettings, FiUsers } from 'react-icons/fi'
import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className="flex w-full flex-col gap-4 lg:flex-row">
            <div className="flex w-full flex-row overflow-x-auto lg:min-h-[calc(100svh-138px)] lg:w-28 lg:overflow-hidden">
                <nav className="flex flex-row gap-4 lg:flex-col">
                    <NavLink to="database/unit-kerja">
                        {({ isActive }) => (
                            <Card
                                className={cn(
                                    'flex flex-col items-center gap-1 px-3 py-2 text-center font-semibold',
                                    isActive && 'text-primary'
                                )}
                            >
                                <FiDatabase className="h-6 w-6" />
                                <span className="text-wrap text-xs">
                                    Database
                                </span>
                            </Card>
                        )}
                    </NavLink>
                    <NavLink to="pengaturan/profil-blud">
                        {({ isActive }) => (
                            <Card
                                className={cn(
                                    'flex flex-col items-center gap-1 px-3 py-2 text-center font-semibold',
                                    isActive && 'text-primary'
                                )}
                            >
                                <FiSettings className="h-6 w-6" />
                                <span className="text-wrap text-xs">
                                    Pengaturan
                                </span>
                            </Card>
                        )}
                    </NavLink>
                    <NavLink to="referensi/kode-rekening/1">
                        {({ isActive }) => (
                            <Card
                                className={cn(
                                    'flex flex-col items-center gap-1 px-3 py-2 text-center font-semibold',
                                    isActive && 'text-primary'
                                )}
                            >
                                <FiBookOpen className="h-6 w-6" />
                                <span className="text-wrap text-xs">
                                    Referensi
                                </span>
                            </Card>
                        )}
                    </NavLink>
                    <NavLink to="user">
                        {({ isActive }) => (
                            <Card
                                className={cn(
                                    'flex flex-col items-center gap-1 px-3 py-2 text-center font-semibold',
                                    isActive && 'text-primary'
                                )}
                            >
                                <FiUsers className="h-6 w-6" />
                                <span className="text-wrap text-xs">
                                    Manajemen User
                                </span>
                            </Card>
                        )}
                    </NavLink>
                </nav>
            </div>
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    )
}
