import { Button } from '@/components/ui/button'
import { FiPlus } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { api } from '@/trpc/react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import RincianRabTable from './rab-table'
import RincianRapTable from './rap-table'
import Loading from '@/components/loading'
import NotFound from '@/app/not-found'

export default function Page() {
    const params = useParams<{ rbaId: string; aktivitasRbaId: string }>()

    const aktivitasRba = api.aktivitasRba.getById.useQuery(
        parseInt(params.aktivitasRbaId ?? '')
    )

    if ((aktivitasRba.isSuccess && !aktivitasRba.data) || aktivitasRba.isError)
        return <NotFound />

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                    <CardTitle>Rincian RBA</CardTitle>
                    <CardDescription>
                        Daftar rincian RBA dalam aktivitas
                    </CardDescription>
                </div>
                {aktivitasRba.data?.jenis === 'BELANJA' && (
                    <Button asChild>
                        <Link to="rab/tambah">
                            <FiPlus className="mr-2" />
                            Tambah Rincian
                        </Link>
                    </Button>
                )}
                {aktivitasRba.data?.jenis === 'PENDAPATAN' && (
                    <Button asChild>
                        <Link to="rap/tambah">
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
