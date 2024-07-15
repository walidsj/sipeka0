import { Button } from '@/components/ui/button'
import { NavLink, Outlet } from 'react-router-dom'
import { HiOutlineClipboardList } from 'react-icons/hi'
import { cn } from '@/lib/utils'

export default function Layout() {
    return (
        <div className="flex w-full flex-col gap-4">
            <nav className="mx-auto w-full overflow-x-auto">
                <ul className="flex w-full">
                    <li>
                        <NavLink
                            to="perekaman"
                            className={({ isActive }) =>
                                cn(isActive && 'text-primary')
                            }
                        >
                            <Button variant="ghost">
                                <HiOutlineClipboardList className="mr-1 h-5 w-5" />
                                <span>Rekam</span>
                            </Button>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
