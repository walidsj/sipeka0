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
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/web/components/ui/table'
import { api } from '@/web/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import _ from 'lodash'
import React from 'react'
import toast from 'react-hot-toast'
import { FiChevronsDown, FiEdit, FiTrash } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'

export default function RincianRapTable() {
    const params = useParams<{ rbaId: string; aktivitasRbaId: string }>()

    const rincianRba = api.rincianRba.getRapByAktivitasRbaId.useQuery(
        parseInt(params.aktivitasRbaId ?? ''),
        { placeholderData: keepPreviousData }
    )

    const deleteRincianRba = api.rincianRba.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            toast.success(data.message)
            rincianRba.refetch()
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    const groupedData = _.chain(rincianRba.data)
        .groupBy((item) => `${item.rekening?.kode}||${item.rekening?.uraian}`)
        .value()

    let total = 0

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1 text-center">No.</TableHead>
                    <TableHead>Uraian</TableHead>
                    <TableHead className="text-right">Jumlah</TableHead>
                    <TableHead className="w-1" />
                </TableRow>
            </TableHeader>
            <TableBody>
                {rincianRba.isLoading && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">
                            Memuat data...
                        </TableCell>
                    </TableRow>
                )}
                {rincianRba.isSuccess &&
                    groupedData &&
                    Object.keys(groupedData).map((key) => {
                        let totalPerGroup = groupedData[key].reduce(
                            (acc, curr) => acc + Number(curr.jumlah),
                            0
                        )
                        return (
                            <React.Fragment key={key}>
                                <TableRow className="bg-blue-50 hover:bg-blue-50">
                                    <TableCell colSpan={2}>
                                        <span className="mr-3 inline-block font-bold">
                                            {key.split('||')[0]}
                                        </span>
                                        <span className="font-semibold">
                                            {key.split('||')[1]}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right font-medium">
                                        {Number(totalPerGroup).toLocaleString(
                                            'id-ID'
                                        )}
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                                {groupedData[key].map((item, index) => {
                                    total += Number(item.jumlah)
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell className="text-center">
                                                {index + 1}.
                                            </TableCell>
                                            <TableCell>
                                                {item.rap?.uraian}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {Number(
                                                    item.jumlah
                                                ).toLocaleString('id-ID')}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-3">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button variant="outline">
                                                                Aksi{' '}
                                                                <FiChevronsDown className="ml-2" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="start">
                                                            <Link
                                                                to={`/anggaran/rba/penyusunan-rba/${params.rbaId}/aktivitas/${params.aktivitasRbaId}/rincian-rba/${item.id}/edit-rap`}
                                                            >
                                                                <DropdownMenuItem>
                                                                    <FiEdit className="mr-2" />
                                                                    Edit
                                                                </DropdownMenuItem>
                                                            </Link>
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    if (
                                                                        confirm(
                                                                            'Apakah anda yakin menghapus data ini?'
                                                                        )
                                                                    ) {
                                                                        deleteRincianRba.mutate(
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
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </React.Fragment>
                        )
                    })}
                {rincianRba.isSuccess && rincianRba.data?.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">
                            Tidak ada data
                        </TableCell>
                    </TableRow>
                )}
                {rincianRba.isError && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">
                            {rincianRba.error.message}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableHead colSpan={2}>Total</TableHead>
                    <TableHead className="text-right">
                        {Number(total).toLocaleString('id-ID')}
                    </TableHead>
                    <TableHead />
                </TableRow>
            </TableFooter>
        </Table>
    )
}
