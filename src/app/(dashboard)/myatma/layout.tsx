import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/lib/auth'
import { cn } from '@/lib/utils'
import React from 'react'
import { HiOutlineChartBar, HiOutlineShoppingBag } from 'react-icons/hi'
import { NavLink, Outlet } from 'react-router-dom'

export default function DashboardLayout() {
    const auth = useAuth()

    return (
        <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
            <Card>
                <CardHeader className="block">
                    {(auth.user?.pegawai && (
                        <React.Fragment>
                            <CardTitle>
                                {auth.user.pegawai.gelarDepan &&
                                    `${auth.user.pegawai.gelarDepan} `}
                                {auth.user.pegawai.nama}
                                {auth.user.pegawai.gelarBelakang &&
                                    `, ${auth.user.pegawai.gelarBelakang}`}
                            </CardTitle>
                            <p className="text-sm text-slate-500">
                                {auth.user.pegawai.jabatan}
                            </p>
                            <Badge
                                className={cn(
                                    'mb-5',
                                    auth.user.pegawai.statusPegawai ===
                                        'PPPK' && 'bg-secondary',
                                    auth.user.pegawai.statusPegawai ===
                                        'NON ASN' && 'bg-yellow-500',
                                    auth.user.pegawai.statusPegawai === 'MOU' &&
                                        'bg-red-400'
                                )}
                            >
                                {auth.user.pegawai.statusPegawai}
                            </Badge>
                        </React.Fragment>
                    )) || <CardTitle>Profil belum terkoneksi</CardTitle>}
                </CardHeader>
            </Card>
            <nav className="mx-auto flex w-full gap-3 overflow-x-auto py-5">
                <NavLink to="." end>
                    {({ isActive }) => (
                        <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                            <div
                                className={cn(
                                    'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                    isActive &&
                                        'bg-primary text-primary-foreground'
                                )}
                            >
                                <HiOutlineChartBar />
                            </div>
                            Rekapitulasi
                        </Card>
                    )}
                </NavLink>
                <NavLink to="gaji">
                    {({ isActive }) => (
                        <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                            <div
                                className={cn(
                                    'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                    isActive &&
                                        'bg-primary text-primary-foreground'
                                )}
                            >
                                <HiOutlineShoppingBag />
                            </div>
                            Gaji
                        </Card>
                    )}
                </NavLink>
                <NavLink to="gaji">
                    {({ isActive }) => (
                        <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                            <div
                                className={cn(
                                    'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                    isActive &&
                                        'bg-primary text-primary-foreground'
                                )}
                            >
                                <HiOutlineShoppingBag />
                            </div>
                            Tunjangan
                        </Card>
                    )}
                </NavLink>
                <NavLink to="gaji">
                    {({ isActive }) => (
                        <Card className="flex flex-row items-center py-2 pl-3 pr-5 font-semibold">
                            <div
                                className={cn(
                                    'mr-2 flex items-center justify-center rounded-full p-2 text-primary transition-all',
                                    isActive &&
                                        'bg-primary text-primary-foreground'
                                )}
                            >
                                <HiOutlineShoppingBag />
                            </div>
                            Jasa Pelayanan
                        </Card>
                    )}
                </NavLink>
            </nav>
            <Outlet />
        </div>
    )
}
