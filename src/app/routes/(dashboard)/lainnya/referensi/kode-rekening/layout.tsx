import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/web/components/ui/breadcrumb'
import { Button } from '@/web/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex flex-col gap-5">
            <div>
                <CardTitle className="text-3xl">Kode Rekening</CardTitle>
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
                            <BreadcrumbLink asChild>
                                <Link to="/lainnya/referensi">Referensi</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Kode Rekening</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Daftar Kode Rekening</CardTitle>
                    <CardDescription>
                        Sesuai dengan Permendagri 90/2019 dan Kepmendagri
                        051-5889/2021
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
                                        pathname ===
                                            '/lainnya/referensi/kode-rekening/1' &&
                                            'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="/lainnya/referensi/kode-rekening/1">
                                        Akun
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname ===
                                            '/lainnya/referensi/kode-rekening/2' &&
                                            'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="/lainnya/referensi/kode-rekening/2">
                                        Kelompok
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname ===
                                            '/lainnya/referensi/kode-rekening/3' &&
                                            'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="/lainnya/referensi/kode-rekening/3">
                                        Jenis
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname ===
                                            '/lainnya/referensi/kode-rekening/4' &&
                                            'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="/lainnya/referensi/kode-rekening/4">
                                        Objek
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname ===
                                            '/lainnya/referensi/kode-rekening/5' &&
                                            'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="/lainnya/referensi/kode-rekening/5">
                                        Rincian Objek
                                    </Link>
                                </Button>
                            </li>
                            <li>
                                <Button
                                    asChild
                                    variant="ghost"
                                    className={cn(
                                        'h-12 rounded-none',
                                        pathname ===
                                            '/lainnya/referensi/kode-rekening/6' &&
                                            'border-b-4 border-primary text-primary'
                                    )}
                                >
                                    <Link to="/lainnya/referensi/kode-rekening/6">
                                        Sub Rincian Objek
                                    </Link>
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
