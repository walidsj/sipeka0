import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { api } from '@/web/trpc/react'
import React from 'react'
import { FiGlobe, FiMail, FiPhone, FiPrinter } from 'react-icons/fi'

export default function Dashboard() {
    const profilBlud = api.profilBlud.get.useQuery()

    return (
        <div className="grid grid-cols-4 gap-4">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                    <img
                        src="/images/icons/divided.png"
                        alt="Pagu Belanja"
                        className="h-14 w-14"
                    />
                    <div className="flex flex-col gap-1">
                        <CardTitle>20.000.000.000</CardTitle>
                        <CardDescription>Pagu Belanja</CardDescription>
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
                    <div className="flex flex-col gap-1">
                        <CardTitle>20.000.000.000</CardTitle>
                        <CardDescription>Realisasi Belanja</CardDescription>
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
                    <div className="flex flex-col gap-1">
                        <CardTitle>20.000.000.000</CardTitle>
                        <CardDescription>Target Pendapatan</CardDescription>
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
                    <div className="flex flex-col gap-1">
                        <CardTitle>20.000.000.000</CardTitle>
                        <CardDescription>Realisasi Pendapatan</CardDescription>
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
