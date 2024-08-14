import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Kode Rekening</CardTitle>
                    <CardDescription>
                        Sesuai dengan Permendagri 90/2019, Kepmendagri 050-5889/2021, dan Kepmendagri
                        900.1.15.5-1317/2023
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <nav className="mb-3 w-full border-b">
                        <ul className="flex">
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname === '1' && 'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="1">Akun</Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname === '2' && 'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="2">Kelompok</Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname === '3' && 'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="3">Jenis</Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname === '4' && 'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="4">Objek</Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname === '5' && 'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="5">Rincian Objek</Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname === '6' && 'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="6">Sub Rincian Objek</Link>
                                </Button>
                            </li>
                        </ul>
                    </nav>
                    <Outlet />
                </CardContent>
            </Card>
        </div>
    )
}
