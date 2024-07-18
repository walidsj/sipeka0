import { Button } from '@/components/ui/button'
import { NavLink, Outlet } from 'react-router-dom'
import { HiOutlineBookmarkAlt, HiOutlineClipboardList } from 'react-icons/hi'
import { cn } from '@/lib/utils'

export default function Layout() {
    return (
        <div className="flex w-full flex-col gap-4">
            <nav className="mx-auto flex w-full overflow-x-auto">
                <Button variant="ghost" asChild>
                    <NavLink to="perekaman">
                        {({ isActive }) => (
                            <>
                                <HiOutlineClipboardList
                                    className={cn(
                                        'mr-1 h-5 w-5',
                                        isActive && 'text-primary'
                                    )}
                                />
                                <span
                                    className={cn(isActive && 'text-primary')}
                                >
                                    Rekam
                                </span>
                            </>
                        )}
                    </NavLink>
                </Button>
                <Button variant="ghost" asChild>
                    <NavLink to="lpj-belanja">
                        {({ isActive }) => (
                            <>
                                <HiOutlineBookmarkAlt
                                    className={cn(
                                        'mr-1 h-5 w-5',
                                        isActive && 'text-primary'
                                    )}
                                />
                                <span
                                    className={cn(isActive && 'text-primary')}
                                >
                                    LPJ Belanja
                                </span>
                            </>
                        )}
                    </NavLink>
                </Button>
                <Button variant="ghost" asChild>
                    <NavLink to="spp">
                        {({ isActive }) => (
                            <>
                                <HiOutlineBookmarkAlt
                                    className={cn(
                                        'mr-1 h-5 w-5',
                                        isActive && 'text-primary'
                                    )}
                                />
                                <span
                                    className={cn(isActive && 'text-primary')}
                                >
                                    SPP
                                </span>
                            </>
                        )}
                    </NavLink>
                </Button>
                <Button variant="ghost" asChild>
                    <NavLink to="spm">
                        {({ isActive }) => (
                            <>
                                <HiOutlineBookmarkAlt
                                    className={cn(
                                        'mr-1 h-5 w-5',
                                        isActive && 'text-primary'
                                    )}
                                />
                                <span
                                    className={cn(isActive && 'text-primary')}
                                >
                                    SPM
                                </span>
                            </>
                        )}
                    </NavLink>
                </Button>
                <Button variant="ghost" asChild>
                    <NavLink to="sp2d">
                        {({ isActive }) => (
                            <>
                                <HiOutlineBookmarkAlt
                                    className={cn(
                                        'mr-1 h-5 w-5',
                                        isActive && 'text-primary'
                                    )}
                                />
                                <span
                                    className={cn(isActive && 'text-primary')}
                                >
                                    SP2D
                                </span>
                            </>
                        )}
                    </NavLink>
                </Button>
                <Button variant="ghost" asChild>
                    <NavLink to="buku/kas-umum">
                        {({ isActive }) => (
                            <>
                                <HiOutlineBookmarkAlt
                                    className={cn(
                                        'mr-1 h-5 w-5',
                                        isActive && 'text-primary'
                                    )}
                                />
                                <span
                                    className={cn(isActive && 'text-primary')}
                                >
                                    Buku Bendahara
                                </span>
                            </>
                        )}
                    </NavLink>
                </Button>
            </nav>
            <Outlet />
        </div>
    )
}
