import { Button } from '@/web/components/ui/button'
import { FiChevronLeft, FiPlus } from 'react-icons/fi'
import { Link, Navigate, useParams } from 'react-router-dom'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { api } from '@/web/trpc/react'
import { Badge } from '@/web/components/ui/badge'
import { cn } from '@/web/lib/utils'
import RincianRabTable from './rab-table'
import RincianRapTable from './rap-table'
import Loading from '@/web/components/loading'

export default function Page() {
    const params = useParams<{ rbaId: string; aktivitasRbaId: string }>()

    const aktivitasRba = api.aktivitasRba.getById.useQuery(
        parseInt(params.aktivitasRbaId ?? '')
    )

    if ((aktivitasRba.isSuccess && !aktivitasRba.data) || aktivitasRba.isError)
        return (
            <Navigate
                to={`/anggaran/rba/penyusunan-rba/${params.rbaId}/aktivitas`}
                replace
            />
        )

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <Button variant="outline" asChild>
                    <Link
                        to={`/anggaran/rba/penyusunan-rba/${params.rbaId}/aktivitas`}
                    >
                        <FiChevronLeft className="mr-2" />
                        Aktivitas
                    </Link>
                </Button>
                <div className="flex flex-col gap-1.5 text-center">
                    <CardTitle>Rincian RBA</CardTitle>
                    <CardDescription>
                        Daftar rincian RBA dalam aktivitas
                    </CardDescription>
                </div>
                {aktivitasRba.data?.jenis === 'BELANJA' && (
                    <Button asChild>
                        <Link
                            to={`/anggaran/rba/penyusunan-rba/${params.rbaId}/aktivitas/${params.aktivitasRbaId}/rincian-rba/rab/tambah`}
                        >
                            <FiPlus className="mr-2" />
                            Tambah Rincian
                        </Link>
                    </Button>
                )}
                {aktivitasRba.data?.jenis === 'PENDAPATAN' && (
                    <Button asChild>
                        <Link
                            to={`/anggaran/rba/penyusunan-rba/${params.rbaId}/aktivitas/${params.aktivitasRbaId}/rincian-rba/rap/tambah`}
                        >
                            <FiPlus className="mr-2" />
                            Tambah Rincian
                        </Link>
                    </Button>
                )}
            </div>
            {aktivitasRba.isLoading && <Loading />}
            {aktivitasRba.data && (
                <Card>
                    <CardHeader>
                        <CardDescription>
                            <Badge
                                className={cn(
                                    aktivitasRba.data?.jenis === 'BELANJA' &&
                                        'bg-red-500',
                                    aktivitasRba.data?.jenis === 'PENDAPATAN' &&
                                        'bg-green-500',
                                    aktivitasRba.data?.jenis === 'PEMBIAYAAN' &&
                                        'bg-yellow-500'
                                )}
                            >
                                {aktivitasRba.data?.jenis}
                            </Badge>
                        </CardDescription>
                        <CardDescription>
                            {aktivitasRba.data?.kode}{' '}
                        </CardDescription>
                        <CardTitle>{aktivitasRba.data?.nama}</CardTitle>
                    </CardHeader>
                </Card>
            )}

            {aktivitasRba.data?.jenis === 'BELANJA' && <RincianRabTable />}
            {aktivitasRba.data?.jenis === 'PENDAPATAN' && <RincianRapTable />}
        </div>
    )
}
