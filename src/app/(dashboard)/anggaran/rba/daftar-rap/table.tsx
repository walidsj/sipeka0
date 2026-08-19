import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { api } from '@/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import _ from 'lodash'
import React from 'react'
import toast from 'react-hot-toast'
import { FiChevronsDown, FiEdit, FiSearch, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

export default function RapTable() {
    const [search, setSearch] = React.useState('')
    const [searchValue] = useDebounce(search, 300)

    const rap = api.rap.getAll.useQuery(
        { search: searchValue },
        { placeholderData: keepPreviousData, suspense: true }
    )

    const deleteRap = api.rap.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            toast.success(data.message)
            rap.refetch()
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    const groupedData = _.chain(rap.data)
        .groupBy((item) => `${item.kodeRekening}||${item.uraianRekening}`)
        .value()

    return (
        <div className="flex flex-col gap-5">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center justify-center px-3">
                    <FiSearch className="text-gray-400" />
                </div>
                <Input
                    className="max-w-80 pl-10"
                    placeholder="Cari data..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1 text-center">No.</TableHead>
                        <TableHead colSpan={2}>Uraian</TableHead>
                        <TableHead className="w-1" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rap.isSuccess &&
                        groupedData &&
                        Object.keys(groupedData).map((key) => (
                            <React.Fragment key={key}>
                                <TableRow>
                                    <TableCell colSpan={4}>
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
                                        <TableCell className="w-14">
                                            <img
                                                src="/images/icons/sell.png"
                                                alt="sell"
                                                className="h-10 w-10"
                                            />
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            {item.uraian}
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
                                                    <Link
                                                        to={`${item.id}/edit`}
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
                                                                deleteRap.mutate(
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
                    {rap.isSuccess && rap.data?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                Tidak ada data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
