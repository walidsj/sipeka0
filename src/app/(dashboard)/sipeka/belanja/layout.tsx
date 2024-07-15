import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { HiOutlineBookmarkAlt, HiOutlineClipboardList } from 'react-icons/hi'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex w-full flex-col gap-4">
            <nav className="mx-auto w-full overflow-x-auto">
                <ul className="flex w-full">
                    <li>
                        <Button variant="ghost" asChild>
                            <NavLink to="perekaman">
                                <HiOutlineClipboardList className="mr-1 h-5 w-5" />
                                <span>Rekam</span>
                            </NavLink>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('lpj-belanja') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <NavLink to="lpj-belanja">
                                <HiOutlineBookmarkAlt className="mr-1 h-5 w-5" />
                                <span>LPJ Belanja</span>
                            </NavLink>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('buku') && 'text-primary'
                            )}
                            asChild
                        >
                            <NavLink to="buku/kas-umum">
                                <HiOutlineBookmarkAlt className="mr-1 h-5 w-5" />
                                <span>Buku Bendahara</span>
                            </NavLink>
                        </Button>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
