import { Button } from '@/web/components/ui/button'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { LuBookCopy } from 'react-icons/lu'
import { PiHandDepositBold } from 'react-icons/pi'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex w-full flex-row">
            <div className="flex min-h-[calc(100svh-138px)] w-28 flex-col bg-background shadow">
                <nav>
                    <ul className="flex w-full flex-col">
                        <li>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'flex h-auto w-full flex-col justify-center gap-1 rounded-none px-8 py-3 text-center',
                                    pathname.startsWith(
                                        '/pengadaan/permohonan'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                                asChild
                            >
                                <Link to="/pengadaan/permohonan/farmasi">
                                    <PiHandDepositBold className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Permohonan
                                    </span>
                                </Link>
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
