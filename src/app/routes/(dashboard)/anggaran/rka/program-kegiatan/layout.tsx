import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/web/components/ui/breadcrumb'
import { Button } from '@/web/components/ui/button'
import { CardTitle } from '@/web/components/ui/card'
import { cn } from '@/web/lib/utils'
import { FiBriefcase, FiCommand } from 'react-icons/fi'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex flex-col gap-4">
            <div>
                <CardTitle className="text-3xl">Program/Kegiatan</CardTitle>
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
                                <Link to="/anggaran">Anggaran</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to="/anggaran/rka">RKA</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Program/Kegiatan</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex gap-3">
                <Button
                    variant="outline"
                    className={cn(
                        pathname.startsWith(
                            '/anggaran/rka/program-kegiatan/program'
                        ) && 'border-2 border-primary text-primary'
                    )}
                    asChild
                >
                    <Link to="/anggaran/rka/program-kegiatan/program">
                        <FiCommand className="mr-2" />
                        Program
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    className={cn(
                        pathname.startsWith(
                            '/anggaran/rka/program-kegiatan/kegiatan'
                        ) && 'border-2 border-primary text-primary'
                    )}
                    asChild
                >
                    <Link to="/anggaran/rka/program-kegiatan/kegiatan">
                        <FiBriefcase className="mr-2" />
                        Kegiatan
                    </Link>
                </Button>
                <Button
                    variant="outline"
                    className={cn(
                        pathname.startsWith(
                            '/anggaran/rka/program-kegiatan/sub-kegiatan'
                        ) && 'border-2 border-primary text-primary'
                    )}
                    asChild
                >
                    <Link to="/anggaran/rka/program-kegiatan/sub-kegiatan">
                        Sub Kegiatan
                    </Link>
                </Button>
            </div>
            <Outlet />
        </div>
    )
}
