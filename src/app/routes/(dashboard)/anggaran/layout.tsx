import { Button } from '@/web/components/ui/button'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { RiPagesLine } from 'react-icons/ri'
import { LuBookCopy } from 'react-icons/lu'
import { IoNewspaperOutline } from 'react-icons/io5'
import { BiMoneyWithdraw } from 'react-icons/bi'

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
                                    pathname.startsWith('/anggaran/rba') &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                                asChild
                            >
                                <Link to="/anggaran/rba/penyusunan-rba">
                                    <LuBookCopy className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        RBA
                                    </span>
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'flex h-auto w-full flex-col justify-center gap-1 rounded-none px-8 py-3 text-center',
                                    pathname.startsWith('/anggaran/rka') &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                                asChild
                            >
                                <Link to="/anggaran/rka/program-kegiatan/program">
                                    <RiPagesLine className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        RKA
                                    </span>
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'flex h-auto w-full flex-col justify-center gap-1 rounded-none px-8 py-3 text-center',
                                    pathname.startsWith('/anggaran/dpa') &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                                asChild
                            >
                                <Link to="/anggaran/dpa">
                                    <IoNewspaperOutline className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        DPA
                                    </span>
                                </Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'flex h-auto w-full flex-col justify-center gap-1 rounded-none px-8 py-3 text-center',
                                    pathname.startsWith(
                                        '/anggaran/anggaran-kas'
                                    ) &&
                                        'border-l-4 border-primary bg-slate-50 text-primary'
                                )}
                                asChild
                            >
                                <Link to="/anggaran/anggaran-kas">
                                    <BiMoneyWithdraw className="h-6 w-6" />
                                    <span className="text-wrap text-xs">
                                        Anggaran Kas
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
