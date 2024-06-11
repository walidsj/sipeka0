import Loading from '@/web/components/loading'
import { Badge } from '@/web/components/ui/badge'
import { Button } from '@/web/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/web/components/ui/table'
import { cn } from '@/web/lib/utils'
import { api } from '@/web/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import _ from 'lodash'
import React from 'react'
import toast from 'react-hot-toast'
import { FiChevronsDown, FiTrash } from 'react-icons/fi'
import { useParams } from 'react-router-dom'

export default function AktivitasRbaTable() {
    const params = useParams<{ rkaId: string }>()

    const aktivitasRba = api.rka.getAktivitasByRbaId.useQuery(
        Number(params.rkaId),
        { placeholderData: keepPreviousData }
    )

    const deleteAktivitasRba = api.rka.deleteAktivitasByRbaId.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            toast.success(data.message)
            aktivitasRba.refetch()
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    const groupedData = _.chain(aktivitasRba.data)
        .groupBy(
            (item) =>
                `${item.subKegiatanRka?.kode}||${item.subKegiatanRka?.nama}`
        )
        .value()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1 text-center">No.</TableHead>
                    <TableHead>Kode Aktivitas</TableHead>
                    <TableHead>Nama Aktivitas</TableHead>
                    <TableHead className="text-center">Jenis</TableHead>
                    <TableHead className="w-1" />
                </TableRow>
            </TableHeader>
            <TableBody>
                {aktivitasRba.isLoading && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            <Loading />
                        </TableCell>
                    </TableRow>
                )}
                {aktivitasRba.isSuccess &&
                    groupedData &&
                    Object.keys(groupedData).map((key) => (
                        <React.Fragment key={key}>
                            <TableRow className="bg-blue-50 hover:bg-blue-50">
                                <TableCell colSpan={5}>
                                    <span className="mr-3 inline-block font-bold">
                                        {key.split('||')[0]}
                                    </span>
                                    <span className="font-semibold">
                                        {key.split('||')[1]}
                                    </span>
                                </TableCell>
                            </TableRow>
                            {groupedData[key].map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell className="text-center">
                                        {index + 1}.
                                    </TableCell>
                                    <TableCell>{item.kode}</TableCell>
                                    <TableCell className="font-semibold">
                                        {item.nama}
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Badge
                                            className={cn(
                                                item.jenis === 'BELANJA' &&
                                                    'bg-red-500',
                                                item.jenis === 'PENDAPATAN' &&
                                                    'bg-green-500',
                                                item.jenis === 'PEMBIAYAAN' &&
                                                    'bg-yellow-500'
                                            )}
                                        >
                                            {item.jenis}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline">
                                                    Aksi{' '}
                                                    <FiChevronsDown className="ml-2" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="start">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                'Apakah anda yakin menghapus data ini?'
                                                            )
                                                        ) {
                                                            deleteAktivitasRba.mutate(
                                                                item.id
                                                            )
                                                        }
                                                    }}
                                                    className="text-red-500"
                                                >
                                                    <FiTrash className="mr-2" />
                                                    Hapus
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </React.Fragment>
                    ))}
                {aktivitasRba.isSuccess && aktivitasRba.data?.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            Tidak ada data
                        </TableCell>
                    </TableRow>
                )}
                {aktivitasRba.isError && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            {aktivitasRba.error.message}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
