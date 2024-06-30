import { Button } from '@/web/components/ui/button'
import { cn } from '@/web/lib/utils'
import { Link, Outlet, useLocation } from 'react-router-dom'
import {
    HiOutlineBookmarkAlt,
    HiOutlineClipboardList,
    HiOutlineDocumentText,
    HiOutlineSave,
    HiOutlineSwitchHorizontal,
} from 'react-icons/hi'
import { Helmet } from 'react-helmet'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex w-full flex-col">
            <Helmet>
                <title>Belanja - SIPEKA</title>
            </Helmet>
            <nav className="mx-auto w-full overflow-x-auto md:px-3 lg:px-5 xl:px-8">
                <ul className="flex w-full">
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('/belanja/perekaman') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/belanja/perekaman">
                                <HiOutlineClipboardList className="mr-1 h-5 w-5" />
                                <span>Rekam Belanja</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('/belanja/panjar') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/belanja/panjar">
                                <HiOutlineSave className="mr-1 h-5 w-5" />
                                <span>Panjar</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('/belanja/tagihan') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/belanja/tagihan">
                                <HiOutlineSwitchHorizontal className="mr-1 h-5 w-5" />
                                <span>Tagihan</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('/belanja/buku') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/belanja/buku">
                                <HiOutlineBookmarkAlt className="mr-1 h-5 w-5" />
                                <span>Buku Bendahara</span>
                            </Link>
                        </Button>
                    </li>
                    <li>
                        <Button
                            variant="ghost"
                            className={cn(
                                pathname.startsWith('/belanja/laporan') &&
                                    'text-primary'
                            )}
                            asChild
                        >
                            <Link to="/belanja/laporan">
                                <HiOutlineDocumentText className="mr-1 h-5 w-5" />
                                <span>Laporan</span>
                            </Link>
                        </Button>
                    </li>
                </ul>
            </nav>
            <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
                <Outlet />
            </div>
        </div>
    )
}
