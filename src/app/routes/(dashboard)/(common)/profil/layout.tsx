import { Button } from '@/web/components/ui/button'
import { Card, CardHeader } from '@/web/components/ui/card'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function ProfilLayout() {
    const { pathname } = useLocation()

    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader>
                    <nav className="mb-3 w-full border-b">
                        <ul className="flex">
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname === '/profil' &&
                                            'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="/profil">Update Profil</Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname === '/profil/ganti-password' &&
                                            'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="/profil/ganti-password">
                                        Ganti Password
                                    </Link>
                                </Button>
                            </li>
                        </ul>
                    </nav>
                    <Outlet />
                </CardHeader>
            </Card>
        </div>
    )
}
