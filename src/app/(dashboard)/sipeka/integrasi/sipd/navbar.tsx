import { Button } from '@/components/ui/button'
import { NavLink } from 'react-router-dom'
import { HiOutlineBookmarkAlt, HiOutlineClipboardList } from 'react-icons/hi'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

export default function Navbar() {
    return (
        <Card>
            <CardContent className="p-1">
                <nav className="mx-auto flex w-full overflow-x-auto">
                    <Button variant="ghost" asChild>
                        <NavLink to="login">
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
                                        Login
                                    </span>
                                </>
                            )}
                        </NavLink>
                    </Button>
                    <Button variant="ghost" asChild>
                        <NavLink to="profil">
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
                                        Profil SIPD
                                    </span>
                                </>
                            )}
                        </NavLink>
                    </Button>
                    <Button variant="ghost" asChild>
                        <NavLink to="cetak-lra">
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
                                        LRA SIPD
                                    </span>
                                </>
                            )}
                        </NavLink>
                    </Button>
                    <Button variant="ghost" asChild>
                        <NavLink to="tna">
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
                                        TNA
                                    </span>
                                </>
                            )}
                        </NavLink>
                    </Button>
                </nav>
            </CardContent>
        </Card>
    )
}
