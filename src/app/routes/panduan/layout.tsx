import { cn } from '@/web/lib/utils'
import { Helmet } from 'react-helmet'
import { FaHeart } from 'react-icons/fa6'
import { FiArrowRight } from 'react-icons/fi'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function () {
    const { pathname } = useLocation()

    return (
        <div className="flex flex-row gap-5 py-8">
            <Helmet>
                <title>Panduan - SIPEKA</title>
            </Helmet>
            <div className="w-96 border-r px-5 md:pl-8 lg:pl-10 xl:pl-12">
                <div className="flex flex-col gap-3 font-semibold">
                    <Link
                        to="/panduan"
                        className={cn(
                            'flex items-center justify-between',
                            pathname === '/panduan' && 'text-primary'
                        )}
                    >
                        Pendahuluan
                        {pathname === '/panduan' && <FiArrowRight />}
                    </Link>
                    <Link
                        to="/panduan/pengenalan"
                        className={cn(
                            'flex items-center justify-between',
                            pathname === '/panduan/pengenalan' && 'text-primary'
                        )}
                    >
                        Pengenalan Aplikasi
                        {pathname === '/panduan/pengenalan' && <FiArrowRight />}
                    </Link>
                    <Link
                        to="/panduan/faq"
                        className={cn(
                            'flex items-center justify-between',
                            pathname === '/panduan/faq' && 'text-primary'
                        )}
                    >
                        FAQ
                        {pathname === '/panduan/faq' && <FiArrowRight />}
                    </Link>
                </div>
            </div>
            <Outlet />
            <footer className="flex w-96 flex-col gap-5 border-l px-5 text-xs text-slate-500 md:pr-8 lg:pr-10 xl:pr-12">
                <p>&copy;{new Date().getFullYear()} RSJD Atma Husada Mahakam</p>
                <p>
                    Build with{' '}
                    <FaHeart className="inline-block h-5 w-5 text-red-500" />,
                    <img
                        src="/images/icons/react.png"
                        className="inline-block h-5"
                    />
                    ,{' '}
                    <img
                        src="/images/icons/tailwind.png"
                        className="inline-block h-5"
                    />{' '}
                    , and{' '}
                    <img
                        src="/images/icons/hono.png"
                        className="inline-block h-5"
                    />
                </p>
            </footer>
        </div>
    )
}
