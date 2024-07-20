import { Button } from '@/components/ui/button'
import { Card, CardDescription } from '@/components/ui/card'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { FaBolt, FaLeaf, FaLock, FaShareAlt } from 'react-icons/fa'
import { FlipWords } from '@/components/ui/flip-words'
import {
    Card3dContent,
    Card3d,
    Card3dItem,
    Card3dHeader,
} from '@/components/ui/card-3d'

export default function Home() {
    const words = ['newest', 'secure', 'modern']

    return (
        <div className="flex w-full flex-col">
            <div className="flex flex-col items-center justify-between gap-5 rounded-lg px-5 py-14 md:flex-row md:gap-16 md:px-8 lg:px-10 xl:px-12">
                <div className="w-full">
                    <div className="mb-10 flex">
                        <div className="text-4xl font-extrabold">
                            We've built <span className="text-blue-500">a</span>
                            <FlipWords
                                className="text-blue-500"
                                words={words}
                            />{' '}
                            <br />
                            financial information system for you
                        </div>
                    </div>
                    {/* <h1 className="mb-10 text-center text-2xl font-extrabold md:text-left md:text-3xl lg:text-4xl">
                        Sistem Informasi Keuangan
                        <br />
                        RSJD Atma Husada Mahakam
                    </h1> */}
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <Card3d>
                            <Card3dHeader>
                                <Card3dItem translateZ={30}>
                                    <div>
                                        <img
                                            src="/images/logo-sipeka-full-long.svg"
                                            className="h-10"
                                        />
                                    </div>
                                </Card3dItem>
                                <Card3dItem translateZ={40}>
                                    <CardDescription>
                                        Manajemen Keuangan BLUD RSJD Atma Husada
                                        Mahakam
                                    </CardDescription>
                                </Card3dItem>
                            </Card3dHeader>
                            <Card3dContent>
                                <Card3dItem translateZ={30}>
                                    <Button asChild size="lg">
                                        <Link to="__DASHBOARD_PREFIX__">
                                            Akses
                                            <FiArrowRight className="ml-3 h-5 w-5 shrink-0" />
                                        </Link>
                                    </Button>
                                </Card3dItem>
                            </Card3dContent>
                        </Card3d>
                        <Card3d>
                            <Card3dHeader>
                                <Card3dItem translateZ={30}>
                                    <div>
                                        <img
                                            src="/images/logo-myatma.svg"
                                            className="h-10"
                                        />
                                    </div>
                                </Card3dItem>
                                <Card3dItem translateZ={40}>
                                    <CardDescription>
                                        Sistem Informasi Keuangan Pegawai RSJD
                                        Atma Husada Mahakam
                                    </CardDescription>
                                </Card3dItem>
                            </Card3dHeader>
                            <Card3dContent>
                                <Card3dItem translateZ={30}>
                                    <Button asChild size="lg">
                                        <Link to="__CLIENT_PREFIX__">
                                            Akses
                                            <FiArrowRight className="ml-3 h-5 w-5 shrink-0" />
                                        </Link>
                                    </Button>
                                </Card3dItem>
                            </Card3dContent>
                        </Card3d>
                    </div>
                </div>
                <div className="relative flex-shrink-0 md:max-w-md lg:max-w-lg">
                    <Card className="absolute left-5 top-20 flex flex-row items-center gap-1 px-2 py-1 text-xs font-semibold sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                        <FaBolt className="h-4 w-4 text-primary sm:h-5 sm:w-5" />{' '}
                        Akses Mudah
                    </Card>
                    <Card className="absolute left-0 top-56 flex h-12 w-12 flex-row items-center p-3 md:h-14 md:w-14 lg:h-16 lg:w-16">
                        <img src="/images/logo-sipeka.svg" />
                    </Card>
                    <Card className="md:2-12 absolute left-20 top-48 flex h-10 w-10 flex-row items-center p-2 md:h-12 lg:h-14 lg:w-14">
                        <img src="/images/logo-rsjdahm.webp" />
                    </Card>
                    <Card className="absolute bottom-10 left-10 flex flex-row items-center gap-1 px-2 py-1 text-xs font-semibold sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                        <FaLock className="h-3 w-3 text-primary sm:h-4 sm:w-4" />{' '}
                        Aman dan Terstandar
                    </Card>
                    <Card className="absolute bottom-48 right-0 flex flex-row items-center gap-1 px-2 py-1 text-xs font-semibold sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                        <FaLeaf className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                        Ramah Lingkungan
                    </Card>
                    <Card className="absolute bottom-24 right-14 flex flex-row items-center gap-1 px-2 py-1 text-xs font-semibold sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
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
