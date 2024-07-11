import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { HiOutlineBookmarkAlt, HiOutlineClipboardList } from 'react-icons/hi'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex w-full flex-col gap-4">
            <nav className="mx-auto w-full overflow-x-auto">
                <ul className="flex w-full">
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('/belanja/perekaman') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/belanja/perekaman">
                                <HiOutlineClipboardList className="mr-1 h-5 w-5" />
                                <span>Rekam Belanja</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('/belanja/lpj-belanja') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/belanja/lpj-belanja">
                                <HiOutlineBookmarkAlt className="mr-1 h-5 w-5" />
                                <span>LPJ Belanja</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('/belanja/buku') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/belanja/buku/bku">
                                <HiOutlineBookmarkAlt className="mr-1 h-5 w-5" />
                                <span>Buku Bendahara</span>
                            </Link>
                        </Button>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
