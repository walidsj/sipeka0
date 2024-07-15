import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { FiArrowRight, FiExternalLink } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { FaBolt, FaLeaf, FaLock, FaShareAlt } from 'react-icons/fa'

export default function Home() {
    return (
        <div className="flex w-full flex-col">
            <div className="flex flex-col items-center justify-between gap-5 rounded-lg px-5 py-16 md:flex-row md:gap-16 md:px-8 lg:px-10 xl:px-12">
                <div className="pb-0 md:pb-20">
                    <div className="mb-10 flex items-center justify-center gap-2 md:justify-start">
                        <div className="h-5 w-5 rounded-full bg-red-500" />
                        <div className="h-5 w-5 rounded-full bg-yellow-500" />
                        <div className="h-5 w-5 rounded-full bg-green-500" />
                        <div className="h-5 w-5 rounded-full bg-blue-500" />
                    </div>
                    <h1 className="mb-10 text-center text-4xl font-extrabold md:text-left md:text-5xl lg:text-6xl">
                        Sistem Informasi Keuangan RSJD Atma Husada Mahakam
                    </h1>
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Card className="flex flex-col">
                            <CardHeader className="flex-1">
                                <CardTitle>
                                    Sistem Informasi Pengelolaan Keuangan
                                    (SIPEKA)
                                </CardTitle>
                                <CardDescription>
                                    Manajemen Keuangan RSJD Atma Husada Mahakam
                                    Prov. Kaltim dalam Satu Aplikasi
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex gap-2">
                                <Button asChild size="lg">
                                    <Link to="/login">
                                        SIPEKA
                                        <FiArrowRight className="ml-3 h-5 w-5" />
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="ghost">
                                    <Link to="/panduan" target="_blank">
                                        Panduan
                                        <FiExternalLink className="ml-3 h-5 w-5" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                        <Card className="flex flex-col">
                            <CardHeader className="flex-1">
                                <CardTitle>MyAtma</CardTitle>
                                <CardDescription>
                                    Sistem Informasi Keuangan Pegawai RSJD Atma
                                    Husada Mahakam Prov. Kaltim
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button asChild size="lg">
                                    <Link to="/myatma">
                                        MyAtma
                                        <FiArrowRight className="ml-3 h-5 w-5" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className="relative flex-shrink-0 md:max-w-md lg:max-w-lg">
                    <Card className="absolute left-5 top-20 flex flex-row items-center gap-1 px-2 py-1 text-xs font-semibold shadow-lg sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                        <FaBolt className="h-4 w-4 text-primary sm:h-5 sm:w-5" />{' '}
                        Akses Mudah
                    </Card>
                    <Card className="absolute left-0 top-56 flex h-12 w-12 flex-row items-center p-3 shadow-lg md:h-14 md:w-14 lg:h-16 lg:w-16">
                        <img src="/images/logo-sipeka.svg" />
                    </Card>
                    <Card className="md:2-12 absolute left-20 top-48 flex h-10 w-10 flex-row items-center p-2 shadow-lg md:h-12 lg:h-14 lg:w-14">
                        <img src="/images/logo-rsjdahm.webp" />
                    </Card>
                    <Card className="absolute bottom-10 left-10 flex flex-row items-center gap-1 px-2 py-1 text-xs font-semibold shadow-lg sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                        <FaLock className="h-3 w-3 text-primary sm:h-4 sm:w-4" />{' '}
                        Aman dan Terstandar
                    </Card>
                    <Card className="absolute bottom-48 right-0 flex flex-row items-center gap-1 px-2 py-1 text-xs font-semibold shadow-lg sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                        <FaLeaf className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                        Ramah Lingkungan
                    </Card>
                    <Card className="absolute bottom-24 right-14 flex flex-row items-center gap-1 px-2 py-1 text-xs font-semibold shadow-lg sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                        <FaShareAlt className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                        Integrasi Data
                    </Card>
                    <img
                        src="/images/hero-bu.png"
                        alt="Hero Image - Sopia Lena"
                        className="h-auto"
                    />
                </div>
            </div>
        </div>
    )
}
