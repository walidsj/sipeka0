import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/web/components/ui/breadcrumb'
import { Button } from '@/web/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/web/components/ui/card'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function ProfilLayout() {
    const { pathname } = useLocation()

    return (
        <div className="flex flex-col gap-5 px-8 py-5">
            <div>
                <CardTitle className="text-3xl">Pengaturan</CardTitle>
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/home">Home</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/lainnya">Modul Lainnya</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Pengaturan</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <Card>
                <CardHeader>
                    <nav className="mb-5 w-full border-b">
                        <ul className="flex">
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname ===
                                            '/lainnya/pengaturan/profil-blud' &&
                                            'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="/lainnya/pengaturan/profil-blud">
                                        Profil BLUD
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname.startsWith(
                                            '/lainnya/pengaturan/pengelola-blud'
                                        ) &&
                                            'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="/lainnya/pengaturan/pengelola-blud">
                                        Pengelola BLUD
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
