import { Button } from '@/web/components/ui/button'
import { Card } from '@/web/components/ui/card'
import { cn } from '@/web/lib/utils'
import React from 'react'
import { Helmet } from 'react-helmet'
import { FaHeart } from 'react-icons/fa6'
import {
    FiArrowRight,
    FiChevronDown,
    FiExternalLink,
    FiLock,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { AiOutlineThunderbolt } from 'react-icons/ai'
import { RiShareLine } from 'react-icons/ri'
import { GiThreeLeaves } from 'react-icons/gi'

const list = [
    {
        name: 'Agus Sutrasno',
        role: 'Pengadminstrasi Keuangan',
        image: '/images/teams/agus.png',
        team: ['Perbendaharaan'],
    },
    {
        name: 'Aulan Nawal, A.Md.Ak',
        role: 'Pengelola Akuntansi',
        image: '/images/teams/aulan.png',
        team: ['Akuntansi', 'Tim Efektif'],
    },
    {
        name: 'Fitria Handayani, S.Si',
        role: 'Analis Aplikasi dan Pengelola Data Keuangan',
        image: '/images/teams/fitri.png',
        team: ['Perbendaharaan', 'Tim Efektif'],
    },
    {
        name: 'Ika Trisna Rahayu, SE',
        role: 'Analis Laporan Keuangan',
        image: '/images/teams/ika.png',
        team: ['Akuntansi', 'Tim Efektif'],
    },
    {
        name: 'Maya Lestari, SE',
        role: 'Analis Aplikasi dan Pengelola Data Keuangan',
        image: '/images/teams/maya.png',
        team: ['Perbendaharaan', 'Tim Efektif'],
    },
    {
        name: 'Milenia Febrianti, A.Md.Pnl',
        role: 'Pengelola Data Transaksi',
        image: '/images/teams/milenia.png',
        team: ['Verifikasi'],
    },
    {
        name: 'M. Wahid Arian, S.ST',
        role: 'Analis Laporan Keuangan',
        image: '/images/teams/wahid.png',
        team: ['Akuntansi', 'Tim Efektif'],
    },
    {
        name: 'Moh. Walid Arkham Sani, A.Md.Pnl.',
        role: 'Pengelola Data Transaksi',
        image: '/images/teams/walid.png',
        team: ['Perbendaharaan', 'Tim Efektif'],
    },
    {
        name: 'Riandy, S.Kep',
        role: 'Bendahara Pengeluaran',
        image: '/images/teams/riandy.png',
        team: ['Perbendaharaan'],
    },
    {
        name: 'Rajak',
        role: 'Pengadministrasi Keuangan',
        image: '/images/teams/rajak.png',
        team: ['Perbendaharaan'],
    },
    {
        name: 'Supriyatun',
        role: 'Bendahara Penerimaan',
        image: '/images/teams/supriyatun.png',
        team: ['Perbendaharaan'],
    },
    {
        name: 'Arif Mahar Setiabdi, S.Ak',
        role: 'Pengadministrasi Sarana & Prasarana',
        image: '/images/teams/arif.png',
        team: ['Tim Efektif'],
    },
    {
        name: 'Dhea Ananda Aryanti,SKM',
        role: 'Pengadministrasi Umum',
        image: '/images/teams/dhea.png',
        team: ['Tim Efektif'],
    },
    {
        name: 'M.Alfie Fadhillah Munanda',
        role: 'Pranata Komputer',
        image: '/images/teams/fadil.png',
        team: ['Tim Efektif'],
    },
    {
        name: 'Mardiyono, A.Md.Farm',
        role: 'Asisten Apoteker',
        image: '/images/teams/mardiyono.png',
        team: ['Tim Efektif'],
    },
    {
        name: 'Risca Eka Rahayu A.Md.AK.',
        role: 'Pranata Lakber Mahir',
        image: '/images/teams/risca.png',
        team: ['Tim Efektif'],
    },
]

export default function Home() {
    const [team, setTeam] = React.useState('Semua')

    return (
        <div className="flex w-full flex-col">
            <Helmet>
                <title>
                    SIPEKA - Sistem Informasi Pengelolaan Keuangan BLUD
                </title>
            </Helmet>
            <div className="flex flex-col items-center justify-between gap-5 rounded-lg bg-white px-5 py-16 md:flex-row md:gap-16 md:px-8 lg:px-10 xl:px-12">
                <div className="pb-0 md:pb-20">
                    <div className="mb-5 flex items-center justify-center gap-2 md:justify-start">
                        <div className="h-5 w-5 rounded-full bg-red-500" />
                        <div className="h-5 w-5 rounded-full bg-yellow-500" />
                        <div className="h-5 w-5 rounded-full bg-green-500" />
                        <div className="h-5 w-5 rounded-full bg-blue-500" />
                    </div>
                    <h1 className="mb-5 text-center text-4xl font-extrabold md:text-left md:text-5xl lg:text-6xl">
                        Sistem Informasi Pengelolaan Keuangan
                    </h1>
                    <h2 className="mb-10 text-center text-xl font-semibold md:text-left md:text-2xl lg:text-3xl">
                        Manajemen Keuangan RSJD Atma Husada Mahakam Prov. Kaltim
                        dalam Satu Aplikasi
                    </h2>
                    <div className="flex flex-col items-center justify-center gap-2 sm:flex-row md:justify-start">
                        <Button asChild size="lg">
                            <Link to="/login">
                                Akses Sekarang
                                <FiArrowRight className="ml-3 h-5 w-5" />
                            </Link>
                        </Button>
                        <Button asChild size="lg" variant="ghost">
                            <Link to="/panduan" target="_blank">
                                Panduan
                                <FiExternalLink className="ml-3 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="relative flex-shrink-0 md:max-w-md lg:max-w-lg">
                    <Card className="absolute left-5 top-20 flex flex-row items-center gap-1 px-2 py-1 text-xs font-semibold shadow-lg sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                        <AiOutlineThunderbolt className="h-4 w-4 text-primary sm:h-5 sm:w-5" />{' '}
                        Akses Mudah
                    </Card>
                    <Card className="absolute left-0 top-56 flex h-12 w-12 flex-row items-center p-3 shadow-lg md:h-14 md:w-14 lg:h-16 lg:w-16">
                        <img src="/images/logo-sipeka.svg" />
                    </Card>
                    <Card className="md:2-12 absolute left-20 top-48 flex h-10 w-10 flex-row items-center p-2 shadow-lg md:h-12 lg:h-14 lg:w-14">
                        <img src="/images/logo-rsjdahm.webp" />
                    </Card>
                    {/* <Card className="md:2-12 absolute right-5 top-16 flex h-10 w-10 flex-row items-center p-3 shadow-lg md:h-12 lg:h-14 lg:w-14">
                        <img src="/images/logo-kaltimprov.webp" />
                    </Card> */}
                    <Card className="absolute bottom-10 left-10 flex flex-row items-center gap-1 px-2 py-1 text-xs font-semibold shadow-lg sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                        <FiLock className="h-3 w-3 text-primary sm:h-4 sm:w-4" />{' '}
                        Aman dan Terstandar
                    </Card>
                    <Card className="absolute bottom-40 right-8 flex flex-row items-center gap-1 px-2 py-1 text-xs font-semibold shadow-lg sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                        <RiShareLine className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                        Integrasi Data
                    </Card>
                    <Card className="absolute right-0 top-52 flex flex-row items-center gap-1 px-2 py-1 text-xs font-semibold shadow-lg sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                        <GiThreeLeaves className="h-4 w-4 text-primary sm:h-5 sm:w-5" />
                        Ramah Lingkungan
                    </Card>
                    <img
                        src="/images/hero-bu.png"
                        alt="Hero Image - Sopia Lena"
                        className="h-auto"
                    />
                </div>
            </div>
            <div className="z-10 flex flex-row items-center justify-center">
                <Button
                    variant="outline"
                    className="-mb-5 rounded-xl shadow-lg"
                >
                    <FiChevronDown className="h-8 w-8" />
                </Button>
            </div>
            <div className="flex flex-col-reverse gap-10 bg-secondary px-5 py-16 text-white md:px-8 lg:px-10 xl:px-12">
                <div className="-mt-5 flex flex-row items-center justify-start gap-5 md:justify-center">
                    <img
                        src="/images/teams/bu-lena.png"
                        className="mb-2 h-auto max-w-24 md:max-w-32 lg:max-w-40"
                    />
                    <div>
                        <h6 className="text-base font-bold md:text-lg lg:text-xl">
                            Sopia Lena, SE, M.Si
                        </h6>
                        <p className="text-sm">
                            Kepala Bagian Keuangan dan Akuntansi
                        </p>
                    </div>
                </div>
                <div className="text-left md:text-center">
                    <h2 className="text-xl font-semibold md:text-center md:text-2xl lg:text-3xl">
                        Tentang Kami
                    </h2>
                    <p className="mb-8 text-3xl font-extrabold tracking-wide md:text-center md:text-4xl lg:text-5xl">
                        Keuangan dan Akuntansi RSJD AHM
                    </p>
                    <p className="md:mx-auto md:max-w-3xl">
                        Bagian Keuangan dan Akuntansi mempunyai tugas menyusun
                        rencana kerja, mengawasi dan mengevaluasi pelayanan
                        penyimpanan uang, pembuatan dokumen, pembuatan daftar
                        gaji, bendahara, casemix, dan penyusunan klaim pasien di
                        Rumah Sakit.
                    </p>
                </div>
            </div>
            <div className="py-16">
                <h2 className="px-5 text-xl font-semibold md:px-8 md:text-2xl lg:px-10 lg:text-3xl xl:px-12">
                    Perkenalkan
                </h2>
                <h2 className="mb-8 px-5 text-3xl font-extrabold tracking-wide md:px-8 md:text-4xl lg:px-10 lg:text-5xl xl:px-12">
                    Tim Kami
                </h2>
                <div className="overflow-auto">
                    <div className="flex gap-3 px-5 text-sm md:px-8 lg:px-10 xl:px-12">
                        <Button
                            variant="outline"
                            className={cn(
                                team === 'Semua' &&
                                    'border-2 border-primary text-primary'
                            )}
                            onClick={() => setTeam('Semua')}
                        >
                            Semua
                        </Button>
                        <Button
                            variant="outline"
                            className={cn(
                                team === 'Perbendaharaan' &&
                                    'border-2 border-primary text-primary'
                            )}
                            onClick={() => setTeam('Perbendaharaan')}
                        >
                            Perbendaharaan
                        </Button>
                        <Button
                            variant="outline"
                            className={cn(
                                team === 'Akuntansi' &&
                                    'border-2 border-primary text-primary'
                            )}
                            onClick={() => setTeam('Akuntansi')}
                        >
                            Akuntansi
                        </Button>
                        <Button
                            variant="outline"
                            className={cn(
                                team === 'Verifikasi' &&
                                    'border-2 border-primary text-primary'
                            )}
                            onClick={() => setTeam('Verifikasi')}
                        >
                            JPK Center
                        </Button>
                        <Button
                            variant="outline"
                            className={cn(
                                team === 'Tim Efektif' &&
                                    'border-2 border-primary text-primary'
                            )}
                            onClick={() => setTeam('Tim Efektif')}
                        >
                            Tim Efektif
                        </Button>
                    </div>
                </div>
                <div
                    className={cn(
                        'px-5 pt-10 md:px-8 lg:px-10 xl:px-12',
                        team === 'Semua'
                            ? 'grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'
                            : 'grid grid-cols-3 gap-10 md:grid-cols-4 lg:grid-cols-5'
                    )}
                >
                    {list
                        .filter((item) => {
                            if (team === 'Semua') {
                                return true
                            }
                            return item.team.includes(team)
                        })
                        .map((item, index) => (
                            <div
                                key={index}
                                className={cn(
                                    team === 'Semua'
                                        ? 'flex flex-row items-center justify-start gap-3'
                                        : 'flex flex-col justify-start gap-3 text-center'
                                )}
                            >
                                <img
                                    src={item.image}
                                    className={cn(
                                        'rounded-full',
                                        team === 'Semua'
                                            ? 'h-20 w-20'
                                            : 'mx-auto'
                                    )}
                                />
                                <div>
                                    <h5
                                        className={cn(
                                            'font-bold',
                                            team === 'Semua'
                                                ? 'text-xs md:text-sm'
                                                : 'text-xs md:text-lg'
                                        )}
                                    >
                                        {item.name}
                                    </h5>
                                    <p
                                        className={cn(
                                            team === 'Semua'
                                                ? 'text-xs md:text-sm'
                                                : 'text-xs md:text-sm'
                                        )}
                                    >
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <footer className="flex flex-col justify-between gap-5 bg-primary px-5 py-5 text-sm text-white md:flex-row md:px-8 lg:px-10 xl:px-12">
                <p>
                    &copy;{new Date().getFullYear()} by RSJD Atma Husada Mahakam
                </p>
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
