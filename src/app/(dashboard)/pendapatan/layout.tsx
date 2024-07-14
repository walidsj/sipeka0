import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { HiOutlineClipboardList } from 'react-icons/hi'

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
                                pathname.startsWith('/pendapatan/perekaman') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/pendapatan/perekaman">
                                <HiOutlineClipboardList className="mr-1 h-5 w-5" />
                                <span>Rekam</span>
                            </Link>
                        </Button>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}
