import { Button } from '@/web/components/ui/button'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex flex-row">
            <div className="flex min-h-[calc(100svh-138px)] w-72 flex-col border-r bg-background shadow-sm">
                <nav className="w-full">
                    <div className="border-b bg-background px-5 py-5">
                        <h1 className="text-xl font-semibold">Referensi</h1>
                        <p className="text-sm text-slate-500">
                            Data master yang digunakan dalam aplikasi
                        </p>
                    </div>
                    <ul className="flex flex-col">
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn(
                                    'h-12 w-full justify-start rounded-none px-5',
                                    pathname.startsWith(
                                        '/lainnya/referensi/kode-rekening'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                            >
                                <Link to="/lainnya/referensi/kode-rekening">
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
