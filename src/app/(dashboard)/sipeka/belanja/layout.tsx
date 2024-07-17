import { Button } from '@/components/ui/button'
import { NavLink, Outlet } from 'react-router-dom'
import { HiOutlineBookmarkAlt, HiOutlineClipboardList } from 'react-icons/hi'

export default function Layout() {
    return (
        <div className="flex w-full flex-col gap-4">
            <nav className="mx-auto flex w-full overflow-x-auto">
                <Button variant="ghost" asChild>
                    <NavLink to="perekaman">
                        <HiOutlineClipboardList className="mr-1 h-5 w-5" />
                        <span>Rekam</span>
                    </NavLink>
                </Button>
                <Button variant="ghost" asChild>
                    <NavLink to="lpj-belanja">
                        <HiOutlineBookmarkAlt className="mr-1 h-5 w-5" />
                        <span>LPJ Belanja</span>
                    </NavLink>
                </Button>
                <Button variant="ghost" asChild>
                    <NavLink to="spp">
                        <HiOutlineBookmarkAlt className="mr-1 h-5 w-5" />
                        <span>SPP</span>
                    </NavLink>
                </Button>
                <Button variant="ghost" asChild>
                    <NavLink to="spm">
                        <HiOutlineBookmarkAlt className="mr-1 h-5 w-5" />
                        <span>SPM</span>
                    </NavLink>
                </Button>
                <Button variant="ghost" asChild>
                    <NavLink to="sp2d">
                        <HiOutlineBookmarkAlt className="mr-1 h-5 w-5" />
                        <span>SP2D</span>
                    </NavLink>
                </Button>
                <Button variant="ghost" asChild>
                    <NavLink to="buku/kas-umum">
                        <HiOutlineBookmarkAlt className="mr-1 h-5 w-5" />
                        <span>Buku Bendahara</span>
                    </NavLink>
                </Button>
            </nav>
            <Outlet />
        </div>
    )
}
