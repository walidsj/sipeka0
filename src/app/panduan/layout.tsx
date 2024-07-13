import { cn } from '@/lib/utils'
import { FaHeart } from 'react-icons/fa6'
import { FiArrowRight } from 'react-icons/fi'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
    const { pathname } = useLocation()

    return (
        <div className="flex flex-row gap-5 py-8">
            <div className="w-96 px-5 md:pl-8 lg:pl-10 xl:pl-12">
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
                        {pathname === '/panduan' && (
                            <FiArrowRight className="h-5 w-5" />
                        )}
                    </Link>
                    <Link
                        to="/panduan/pengenalan"
                        className={cn(
                            'flex items-center justify-between',
                            pathname === '/panduan/pengenalan' && 'text-primary'
                        )}
                    >
                        Pengenalan Aplikasi
                        {pathname === '/panduan/pengenalan' && (
                            <FiArrowRight className="h-5 w-5" />
                        )}
                    </Link>
                    <Link
                        to="/panduan/tech-stack"
                        className={cn(
                            'flex items-center justify-between',
                            pathname === '/panduan/tech-stack' && 'text-primary'
                        )}
                    >
                        Tech Stack
                        {pathname === '/panduan/tech-stack' && (
                            <FiArrowRight className="h-5 w-5" />
                        )}
                    </Link>
                    <Link
                        to="/panduan/login"
                        className={cn(
                            'flex items-center justify-between',
                            pathname === '/panduan/login' && 'text-primary'
                        )}
                    >
                        Akses Masuk
                        {pathname === '/panduan/login' && (
                            <FiArrowRight className="h-5 w-5" />
                        )}
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
                            <FiArrowRight className="h-5 w-5" />
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
                        {pathname === '/panduan/faq' && (
                            <FiArrowRight className="h-5 w-5" />
                        )}
                    </Link>
                </div>
            </div>
            <div className="w-full">
                <Outlet />
            </div>
            <footer className="flex w-96 flex-col gap-5 px-5 text-xs text-slate-500 md:pr-8 lg:pr-10 xl:pr-12">
                <p>&copy;{new Date().getFullYear()} RSJD Atma Husada Mahakam</p>
                <p>
                    Build with{' '}
                    <FaHeart className="inline-block h-5 w-5 text-red-500" />
                </p>
            </footer>
        </div>
    )
}
