import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { Progress } from '@/web/components/ui/progress'
import { api } from '@/web/trpc/react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import React from 'react'
import { FiGlobe, FiMail, FiPhone, FiPrinter } from 'react-icons/fi'

export default function Dashboard() {
    const profilBlud = api.profilBlud.get.useQuery()

    const realisasiPendapatan = api.pendapatan.getRealisasiAll.useQuery()

    const targetPendapatan = api.pendapatan.getTarget.useQuery()

    const latestDba = api.dba.getLatest.useQuery()

    const targetBelanja = api.belanja.getTarget.useQuery()

    const countDba = api.dba.count.useQuery()

    return (
        <div className="grid grid-cols-4 gap-4">
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
                        <CardTitle>10.150.558.543</CardTitle>
                        <CardDescription className="text-xs">
                            46,14%
                        </CardDescription>
                        <Progress value={46.14} />
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
                    </div>
                </CardHeader>
            </Card>
            <Card className="col-span-2">
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
                                <p className="text-sm">
                                    <span className="mr-3">
                                        <FiPhone className="mr-1 inline-flex" />
                                        {profilBlud.data?.noTelp}
                                    </span>
                                    <span className="mr-3">
                                        <FiPrinter className="mr-1 inline-flex" />
                                        {profilBlud.data?.noFax}
                                    </span>
                                    <br />
                                    <span className="mr-3">
                                        <FiMail className="mr-1 inline-flex" />
                                        {profilBlud.data?.email}
                                    </span>
                                    <span className="mr-3">
                                        <FiGlobe className="mr-1 inline-flex" />
                                        {profilBlud.data?.website}
                                    </span>
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
