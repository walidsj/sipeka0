import { Button } from '@/components/ui/button'
import { Card, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Link, Outlet } from 'react-router-dom'

export default function ProfilLayout() {
    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardHeader>
                    <nav className="mb-5 w-full border-b">
                        <ul className="flex">
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn('h-12 rounded-none')}
                                >
                                    <Link to="profil-blud">Profil BLUD</Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn('h-12 rounded-none')}
                                >
                                    <Link to="pengelola-blud">
                                        Pengelola BLUD
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn('h-12 rounded-none')}
                                >
                                    <Link to="rekening-bank">
                                        Rekening Bank
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
