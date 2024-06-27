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
                    <h2 className="text-xl font-extrabold">Dasar</h2>
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
                        to="/panduan/tech-stack"
                        className={cn(
                            'flex items-center justify-between',
                            pathname === '/panduan/tech-stack' && 'text-primary'
                        )}
                    >
                        Tech Stack
                        {pathname === '/panduan/tech-stack' && <FiArrowRight />}
                    </Link>
                    <Link
                        to="/panduan/login"
                        className={cn(
                            'flex items-center justify-between',
                            pathname === '/panduan/login' && 'text-primary'
                        )}
                    >
                        Akses Masuk
                        {pathname === '/panduan/login' && <FiArrowRight />}
                    </Link>
                    <Link
                        to="/panduan/pendaftaran"
                        className={cn(
                            'flex items-center justify-between',
                            pathname === '/panduan/pendaftaran' &&
                                'text-primary'
                        )}
                    >
                        Pendaftaran Akun
                        {pathname === '/panduan/pendaftaran' && (
                            <FiArrowRight />
                        )}
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
                    {/* <h2 className="mt-3 text-xl font-extrabold">Anggaran</h2>
                    <Link
                        to="/panduan/rba"
                        className={cn(
                            'flex items-center justify-between',
                            pathname === '/panduan/rba' && 'text-primary'
                        )}
                    >
                        RBA
                        {pathname === '/panduan/rba' && <FiArrowRight />}
                    </Link>
                    <Link
                        to="/panduan/rka"
                        className={cn(
                            'flex items-center justify-between',
                            pathname === '/panduan/rka' && 'text-primary'
                        )}
                    >
                        RKA
                        {pathname === '/panduan/rka' && <FiArrowRight />}
                    </Link>
                    <Link
                        to="/panduan/dba"
                        className={cn(
                            'flex items-center justify-between',
                            pathname === '/panduan/dba' && 'text-primary'
                        )}
                    >
                        DBA
                        {pathname === '/panduan/dba' && <FiArrowRight />}
                    </Link>
                    <Link
                        to="/panduan/monitoring"
                        className={cn(
                            'flex items-center justify-between',
                            pathname === '/panduan/monitoring' && 'text-primary'
                        )}
                    >
                        Monitoring
                        {pathname === '/panduan/monitoring' && <FiArrowRight />}
                    </Link> */}
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
