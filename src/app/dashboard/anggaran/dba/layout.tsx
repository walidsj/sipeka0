import { Button } from '@/components/ui/button'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Link, Outlet } from 'react-router-dom'

export default function ProfilLayout() {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="flex w-full flex-col lg:min-h-[calc(100svh-138px)] lg:w-72">
                <nav className="w-full">
                    <CardHeader>
                        <CardTitle>Dokumen Bisnis dan Anggaran</CardTitle>
                        <CardDescription>
                            Rencana bisnis dan anggaran BLUD yang telah disahkan
                            dan ditetapkan untuk dilaksanakan
                        </CardDescription>
                    </CardHeader>
                    <ul className="flex w-full flex-row overflow-x-auto lg:flex-col">
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-12 w-full justify-start rounded-none px-6'
                                )}
                            >
                                <Link to="penetapan">Penetapan</Link>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    )
}
