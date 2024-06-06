import { Button } from '@/web/components/ui/button'
import { cn } from '@/web/lib/utils'
import React from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

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
            <div className="rounded-lg bg-white px-8 pb-28 pt-20">
                <h2 className="text-5xl">Selamat datang di </h2>
                <h1 className="text-7xl font-bold">
                    Sistem Informasi Pengelolaan Keuangan
                </h1>
                <h1 className="text-7xl font-bold">
                    Keuangan RSJD Atma Husada Mahakam
                </h1>
                <div className="flex gap-2">
                    <Button asChild size="lg">
                        <Link to="/login">
                            Mulai Sekarang
                            <FiArrowRight className="ml-3 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" className="bg-emerald-500">
                        <a href="https://wa.me/6285172277277">
                            <FaWhatsapp className="mr-2 h-5 w-5" />
                            Hubungi Admin
                        </a>
                    </Button>
                </div>
            </div>
            <h2 className="p-8 pt-10 text-center text-6xl font-extrabold">
                Meet Our Team!
            </h2>
            <div className="mx-auto flex gap-3 px-8">
                <Button
                    variant="outline"
                    className={cn(
                        team === 'Semua' && 'border border-primary text-primary'
                    )}
                    onClick={() => setTeam('Semua')}
                >
                    Semua
                </Button>
                <Button
                    variant="outline"
                    className={cn(
                        team === 'Perbendaharaan' &&
                            'border border-primary text-primary'
                    )}
                    onClick={() => setTeam('Perbendaharaan')}
                >
                    Perbendaharaan
                </Button>
                <Button
                    variant="outline"
                    className={cn(
                        team === 'Akuntansi' &&
                            'border border-primary text-primary'
                    )}
                    onClick={() => setTeam('Akuntansi')}
                >
                    Akuntansi
                </Button>
                <Button
                    variant="outline"
                    className={cn(
                        team === 'Verifikasi' &&
                            'border border-primary text-primary'
                    )}
                    onClick={() => setTeam('Verifikasi')}
                >
                    JPK Center
                </Button>
                <Button
                    variant="outline"
                    className={cn(
                        team === 'Tim Efektif' &&
                            'border border-primary text-primary'
                    )}
                    onClick={() => setTeam('Tim Efektif')}
                >
                    Tim Efektif
                </Button>
            </div>
            <div className="px-28 py-10">
                <div
                    className={cn(
                        team === 'Semua'
                            ? 'grid grid-cols-4 gap-3'
                            : 'grid grid-cols-6 gap-5'
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
                                            ? 'w-h-20 h-20'
                                            : 'mx-auto h-44 w-44'
                                    )}
                                />
                                <div>
                                    <h5
                                        className={cn(
                                            'font-bold',
                                            team === 'Semua'
                                                ? 'text-sm'
                                                : 'text-lg'
                                        )}
                                    >
                                        {item.name}
                                    </h5>
                                    <p
                                        className={cn(
                                            team === 'Semua'
                                                ? 'text-xs'
                                                : 'text-sm'
                                        )}
                                    >
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="bg-slate-500 p-8"></div>
        </div>
    )
}
