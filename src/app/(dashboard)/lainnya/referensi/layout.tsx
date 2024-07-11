import { Button } from '@/components/ui/button'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex flex-row">
            <div className="flex min-h-[calc(100svh-138px)] w-72 flex-col">
                <nav className="w-full">
                    <CardHeader>
                        <CardTitle>Referensi</CardTitle>
                        <CardDescription>
                            Data master yang digunakan dalam aplikasi
                        </CardDescription>
                    </CardHeader>
                    <ul className="flex flex-col">
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-12 w-full justify-start rounded-none px-6',
                                    pathname.startsWith(
                                        '/lainnya/referensi/kode-rekening'
                                    ) && 'text-primary'
                                )}
                            >
                                <Link to="/lainnya/referensi/kode-rekening/1">
                                    Kode Rekening
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex w-full flex-col gap-5 px-8 py-5">
                <Outlet />
            </div>
        </div>
    )
}
