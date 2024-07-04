import { Badge } from '@/web/components/ui/badge'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { Progress } from '@/web/components/ui/progress'
import { useAuth } from '@/web/lib/auth'
import { cn } from '@/web/lib/utils'
import { api } from '@/web/trpc/react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import React from 'react'

export default function Dashboard() {
    const auth = useAuth()

    const profilBlud = api.profilBlud.get.useQuery()

    const realisasiPendapatan = api.pendapatan.getRealisasiAll.useQuery()

    const targetPendapatan = api.pendapatan.getTarget.useQuery()

    const latestPendapatan = api.pendapatan.getLatest.useQuery()

    const latestDba = api.dba.getLatest.useQuery()

    const realisasiBelanja = api.belanja.getRealisasiAll.useQuery()

    const targetBelanja = api.belanja.getTarget.useQuery()

    const latestBelanja = api.belanja.getLatest.useQuery()

    const countDba = api.dba.count.useQuery()

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                        <CardDescription>Profil User Pegawai</CardDescription>
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
                                        auth.user.pegawai.statusPegawai ===
                                            'PPPK' && 'bg-secondary',
                                        auth.user.pegawai.statusPegawai ===
                                            'NON ASN' && 'bg-yellow-500',
                                        auth.user.pegawai.statusPegawai ===
                                            'MOU' && 'bg-red-400'
                                    )}
                                >
                                    {auth.user.pegawai.statusPegawai}
                                </Badge>
                            </React.Fragment>
                        )) || <CardTitle>Profil belum terkoneksi</CardTitle>}
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <img
                        src="/images/icons/document.png"
                        alt="Tanggal DBA"
                        className="h-14 w-14"
                    />
                    <div className="flex w-full flex-col">
                        <CardDescription>DBA Sedang Aktif</CardDescription>
                        <CardTitle>
                            {latestDba.data && latestDba.data.uraian}
                        </CardTitle>
                        <CardDescription className="text-xs">
                            Tanggal{' '}
                            {latestDba.data &&
                                format(
                                    String(latestDba.data.tglDokumen),
                                    'dd MMMM yyyy',
                                    { locale: id }
                                )}
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <img
                        src="/images/icons/compliant.png"
                        alt="Tanggal DBA"
                        className="h-14 w-14"
                    />
                    <div className="flex w-full flex-col">
                        <CardDescription>Penetapan DBA</CardDescription>
                        <CardTitle>
                            {countDba.data &&
                                `${countDba.data.count.toLocaleString('id-ID')} Kali`}
                        </CardTitle>
                        <CardDescription className="text-xs">
                            {countDba.data &&
                                `${countDba.data.count.toLocaleString('id-ID')} DBA telah disahkan`}
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <img
                        src="/images/icons/divided.png"
                        alt="Pagu Belanja"
                        className="h-14 w-14"
                    />
                    <div className="flex w-full flex-col">
                        <CardDescription>Pagu Belanja</CardDescription>
                        <CardTitle>
                            {targetBelanja.data &&
                                Number(targetBelanja.data).toLocaleString(
                                    'id-ID'
                                )}
                        </CardTitle>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <img
                        src="/images/icons/list.png"
                        alt="Target Pendapatan"
                        className="h-14 w-14"
                    />
                    <div className="flex w-full flex-col">
                        <CardDescription>Target Pendapatan</CardDescription>
                        <CardTitle>
                            {targetPendapatan.data &&
                                Number(targetPendapatan.data).toLocaleString(
                                    'id-ID'
                                )}
                        </CardTitle>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <img
                        src="/images/icons/payment.png"
                        alt="Realisasi Belanja"
                        className="h-14 w-14"
                    />
                    <div className="flex w-full flex-col">
                        <CardDescription>Realisasi Belanja</CardDescription>
                        <CardTitle>
                            {realisasiBelanja.data &&
                                Number(realisasiBelanja.data).toLocaleString(
                                    'id-ID'
                                )}
                        </CardTitle>
                        <CardDescription className="text-xs">
                            {targetBelanja.data &&
                                realisasiBelanja.data &&
                                (
                                    Number(
                                        Number(realisasiBelanja.data) /
                                            Number(targetBelanja.data)
                                    ) * 100
                                ).toLocaleString('id-ID', {
                                    maximumFractionDigits: 2,
                                })}
                            %
                        </CardDescription>
                        <Progress
                            value={
                                Number(
                                    Number(realisasiBelanja.data) /
                                        Number(targetBelanja.data)
                                ) * 100
                            }
                        />
                        <CardDescription className="text-xs">
                            Sisa Pagu:{' '}
                            {targetBelanja.data &&
                                realisasiBelanja.data &&
                                Number(
                                    Number(targetBelanja.data) -
                                        Number(realisasiBelanja.data)
                                ).toLocaleString('id-ID')}
                        </CardDescription>
                        <CardDescription className="text-xs">
                            {latestBelanja.data && (
                                <React.Fragment>
                                    Per{' '}
                                    {format(
                                        String(latestBelanja.data?.tglDokumen),
                                        'dd MMMM yyyy',
                                        { locale: id }
                                    )}
                                </React.Fragment>
                            )}
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <img
                        src="/images/icons/salary.png"
                        alt="Realisasi Pendapatan"
                        className="h-14 w-14"
                    />
                    <div className="flex w-full flex-col">
                        <CardDescription>Realisasi Pendapatan</CardDescription>
                        <CardTitle>
                            {realisasiPendapatan.data &&
                                Number(realisasiPendapatan.data).toLocaleString(
                                    'id-ID'
                                )}
                        </CardTitle>
                        <CardDescription className="text-xs">
                            {targetPendapatan.data &&
                                realisasiPendapatan.data &&
                                (
                                    Number(
                                        Number(realisasiPendapatan.data) /
                                            Number(targetPendapatan.data)
                                    ) * 100
                                ).toLocaleString('id-ID', {
                                    maximumFractionDigits: 2,
                                })}
                            %
                        </CardDescription>
                        <Progress
                            value={
                                Number(
                                    Number(realisasiPendapatan.data) /
                                        Number(targetPendapatan.data)
                                ) * 100
                            }
                        />
                        <CardDescription className="text-xs">
                            Sisa Target:{' '}
                            {targetPendapatan.data &&
                                realisasiPendapatan.data &&
                                Number(
                                    Number(targetPendapatan.data) -
                                        Number(realisasiPendapatan.data)
                                ).toLocaleString('id-ID')}
                        </CardDescription>
                        <CardDescription className="text-xs">
                            {latestPendapatan.data && (
                                <React.Fragment>
                                    Per{' '}
                                    {format(
                                        String(
                                            latestPendapatan.data?.tglDokumen
                                        ),
                                        'dd MMMM yyyy',
                                        { locale: id }
                                    )}
                                </React.Fragment>
                            )}
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-start justify-between">
                    <div>
                        <CardDescription className="mb-2">
                            Informasi Profil BLUD
                        </CardDescription>
                        {profilBlud.isSuccess && profilBlud.data && (
                            <React.Fragment>
                                <CardTitle>{profilBlud.data?.nama}</CardTitle>
                                <p className="mb-2 text-sm text-slate-500">
                                    {profilBlud.data?.alamat}
                                </p>
                            </React.Fragment>
                        )}
                        {profilBlud.isSuccess && !profilBlud.data && (
                            <CardTitle>Profil BLUD belum diatur</CardTitle>
                        )}
                    </div>
                    <img src="/images/icons/policy.png" className="h-24" />
                </CardHeader>
            </Card>
        </div>
    )
}
