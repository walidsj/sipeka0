import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex w-full flex-row gap-4">
            <div className="flex min-h-[calc(100svh-138px)] w-28 flex-col">
                <nav>
                    <ul className="flex w-full flex-col gap-4">
                        <li>
                            <Link to="/belanja/buku/kas-umum">
                                <Card
                                    className={cn(
                                        'flex flex-col items-center gap-1 px-3 py-2 text-center font-semibold',
                                        pathname.startsWith(
                                            '/belanja/buku/kas-umum'
                                        ) && 'text-primary'
                                    )}
                                >
                                    <HiOutlineBookOpen className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Buku Kas Umum
                                    </span>
                                </Card>
                            </Link>
                        </li>
                        <li>
                            <Link to="/belanja/buku/buku-pajak">
                                <Card
                                    className={cn(
                                        'flex flex-col items-center gap-1 px-3 py-2 text-center font-semibold',
                                        pathname.startsWith(
                                            '/belanja/buku/buku-pajak'
                                        ) && 'text-primary'
                                    )}
                                >
                                    <HiOutlineBookOpen className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Buku Pajak
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
