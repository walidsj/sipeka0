import { Button } from '@/components/ui/button'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import React from 'react'
import { FiArrowRight, FiExternalLink } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { FaBolt, FaLeaf, FaLock, FaShareAlt } from 'react-icons/fa'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

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
                <div className="px-5 md:px-8 lg:px-10 xl:px-12">
                    <h2 className="text-center text-xl font-semibold text-green-500 md:text-2xl lg:text-3xl">
                        Testimoni
                    </h2>
                    <p className="mb-8 text-center text-3xl font-extrabold tracking-wide md:text-4xl lg:text-5xl">
                        Dukungan
                    </p>
                    <div className="px-10">
                        <Carousel>
                            <CarouselContent>
                                <CarouselItem className="lg:basis-1/2 xl:basis-1/3">
                                    <Card>
                                        <CardHeader className="flex gap-5">
                                            <p>
                                                Aplikasi SIPEKA yang dikhususkan
                                                untuk anggaran BLUD sangat kami
                                                harapkan untuk membantu RS dalam
                                                hal penggunaan aplikasi SIPD-RI
                                                yang belum support ke anggaran
                                                BLUD. Semoga Aplikasi SIPEKA
                                                bisa menjawab kekosongan
                                                Aplikasi SIPD-RI terhadap BLUD
                                                RS.
                                            </p>
                                            <div className="flex items-center gap-5">
                                                <Avatar className="h-16 w-16">
                                                    <AvatarImage src="/images/testimoni/drindah.png" />
                                                </Avatar>
                                                <div>
                                                    <CardTitle>
                                                        dr. Indah Puspitasari,
                                                        MARS
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Direktur RSJD Atma
                                                        Husada Mahakam
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </CarouselItem>

                                <CarouselItem className="lg:basis-1/2 xl:basis-1/3">
                                    <Card>
                                        <CardHeader className="flex gap-5">
                                            <p>
                                                SIPEKA diharapkan sebagai
                                                jembatan, pendukung atau
                                                pendamping SIPD RI untuk
                                                penatausahaan keuangan dalam
                                                satu aplikasi khususnya di
                                                RSJDAHM semoga aplikasi ini
                                                bermanfaat tidak hanya di
                                                RSJDAHM tetapi dapat
                                                diaplikasikan atau
                                                diimplementasikan di semua Rumah
                                                Sakit Daerah lainnya Semoga
                                                bermanfaat… Semoga sukses…
                                            </p>
                                            <div className="flex items-center gap-5">
                                                <Avatar className="h-16 w-16">
                                                    <AvatarImage src="/images/testimoni/yudhis.png" />
                                                </Avatar>
                                                <div>
                                                    <CardTitle>
                                                        Adji Yudhistira, SE,
                                                        M.Si
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Sekretaris BPKAD Prov.
                                                        Kaltim
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </CarouselItem>
                                <CarouselItem className="lg:basis-1/2 xl:basis-1/3">
                                    <Card>
                                        <CardHeader className="flex gap-5">
                                            <p>
                                                Tampilan bagus, puas
                                                hasilnya,sangat membantu proses
                                                pembukuan dan Laporan Keuangan
                                                BLUD tepat waktu, cepat
                                                akselarasinya, output mudah
                                                dibaca dan dimengerti, dan
                                                membantu dalam pengambilan
                                                keputusan serta diharapkan
                                                aplikasi ini juga bisa diakses
                                                oleh Inspektorat Daerah dalam
                                                melakukan Reviu BLUD
                                            </p>
                                            <div className="flex items-center gap-5">
                                                <Avatar className="h-16 w-16">
                                                    <AvatarImage src="/images/testimoni/herynordi.png" />
                                                </Avatar>
                                                <div>
                                                    <CardTitle>
                                                        H. Hery Nordi, SE
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Sekretaris Inspektorat
                                                        Prov. Kaltim
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </CarouselItem>
                                <CarouselItem className="lg:basis-1/2 xl:basis-1/3">
                                    <Card>
                                        <CardHeader className="flex gap-5">
                                            <p>
                                                Saya sangat mendukung Aksi
                                                Perubahan ini. Semoga dapat
                                                bermanfaat terhadap organisasi
                                                RSJD Atma Husada Mahakaam.
                                            </p>
                                            <div className="flex items-center gap-5">
                                                <Avatar className="h-16 w-16">
                                                    <AvatarImage src="/images/testimoni/drjaya.png" />
                                                </Avatar>
                                                <div>
                                                    <CardTitle>
                                                        Dr. dr. H. Jaya
                                                        Mualimin, MARS, Sp.KJ,
                                                        M.Kes, MARS
                                                    </CardTitle>
                                                    <CardDescription>
                                                        Kepala Dinas Kesehatan
                                                        Prov. Kaltim
                                                    </CardDescription>
                                                </div>
                                            </div>
                                        </CardHeader>
                                    </Card>
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
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
                                team === 'Semua' && 'bg-slate-600 text-white'
                            )}
                            onClick={() => setTeam('Semua')}
                        >
                            Semua
                        </Button>
                        <Button
                            variant="outline"
                            className={cn(
                                team === 'Perbendaharaan' &&
                                    'bg-slate-600 text-white'
                            )}
                            onClick={() => setTeam('Perbendaharaan')}
                        >
                            Perbendaharaan
                        </Button>
                        <Button
                            variant="outline"
                            className={cn(
                                team === 'Akuntansi' &&
                                    'bg-slate-600 text-white'
                            )}
                            onClick={() => setTeam('Akuntansi')}
                        >
                            Akuntansi
                        </Button>
                        <Button
                            variant="outline"
                            className={cn(
                                team === 'Verifikasi' &&
                                    'bg-slate-600 text-white'
                            )}
                            onClick={() => setTeam('Verifikasi')}
                        >
                            JPK Center
                        </Button>
                        <Button
                            variant="outline"
                            className={cn(
                                team === 'Tim Efektif' &&
                                    'bg-slate-600 text-white'
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
        </div>
    )
}
