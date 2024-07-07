import { Card } from '@/web/components/ui/card'
import { cn } from '@/web/lib/utils'
import { HiOutlineBookOpen, HiOutlineDocumentAdd } from 'react-icons/hi'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex w-full flex-row gap-4">
            <div className="flex min-h-[calc(100svh-138px)] w-28 flex-col">
                <nav>
                    <ul className="flex w-full flex-col gap-4">
                        <li>
                            <Link to="/belanja/buku/lpj-belanja">
                                <Card
                                    className={cn(
                                        'flex flex-col items-center gap-1 px-3 py-2 text-center font-semibold',
                                        pathname.startsWith(
                                            '/belanja/buku/lpj-belanja'
                                        ) && 'text-primary'
                                    )}
                                >
                                    <HiOutlineDocumentAdd className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        LPJ Belanja
                                    </span>
                                </Card>
                            </Link>
                        </li>
                        <li>
                            <Link to="/belanja/buku/bku">
                                <Card
                                    className={cn(
                                        'flex flex-col items-center gap-1 px-3 py-2 text-center font-semibold',
                                        pathname.startsWith(
                                            '/belanja/buku/bku'
                                        ) && 'text-primary'
                                    )}
                                >
                                    <HiOutlineBookOpen className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        BKU
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
