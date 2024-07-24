import { Button } from '@/components/ui/button'
import { NavLink, useLocation } from 'react-router-dom'
import { HiOutlineBookmarkAlt, HiOutlineClipboardList } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

export default function Navbar() {
    const { pathname } = useLocation()

    return (
        <Card>
            <CardContent className="p-1">
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
                                        className={cn(
                                            isActive && 'text-primary'
                                        )}
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
                                        className={cn(
                                            isActive && 'text-primary'
                                        )}
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
                                        className={cn(
                                            isActive && 'text-primary'
                                        )}
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
                                        className={cn(
                                            isActive && 'text-primary'
                                        )}
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
                                        className={cn(
                                            isActive && 'text-primary'
                                        )}
                                    >
                                        SP2D
                                    </span>
                                </>
                            )}
                        </NavLink>
                    </Button>
                    <Button variant="ghost" asChild>
                        <NavLink to="buku/kas-umum">
                            <HiOutlineBookmarkAlt
                                className={cn(
                                    'mr-1 h-5 w-5',
                                    pathname.includes('buku') && 'text-primary'
                                )}
                            />
                            <span
                                className={cn(
                                    pathname.includes('buku') && 'text-primary'
                                )}
                            >
                                Buku Bendahara
                            </span>
                        </NavLink>
                    </Button>
                </nav>
            </CardContent>
        </Card>
    )
}
