import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className="flex w-full flex-col gap-4 md:flex-row">
            <div className="flex flex-col md:min-h-[calc(100svh-138px)] md:w-28">
                <nav>
                    <ul className="flex w-full flex-row gap-4 md:flex-col">
                        <li>
                            <NavLink to="kas-umum">
                                {({ isActive }) => (
                                    <Card
                                        className={cn(
                                            'flex flex-col items-center gap-1 px-3 py-2 text-center font-semibold',
                                            isActive && 'text-primary'
                                        )}
                                    >
                                        <HiOutlineBookOpen className="h-6 w-6" />
                                        <span className="text-wrap text-xs">
                                            Buku Kas Umum
                                        </span>
                                    </Card>
                                )}
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="buku-pajak">
                                {({ isActive }) => (
                                    <Card
                                        className={cn(
                                            'flex flex-col items-center gap-1 px-3 py-2 text-center font-semibold',
                                            isActive && 'text-primary'
                                        )}
                                    >
                                        <HiOutlineBookOpen className="h-6 w-6" />
                                        <span className="text-wrap text-xs">
                                            Buku Pajak
                                        </span>
                                    </Card>
                                )}
                            </NavLink>
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
