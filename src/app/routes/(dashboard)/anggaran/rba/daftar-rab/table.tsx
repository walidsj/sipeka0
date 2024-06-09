import { Button } from '@/web/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu'
import { Input } from '@/web/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/web/components/ui/table'
import { api } from '@/web/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import _ from 'lodash'
import React from 'react'
import toast from 'react-hot-toast'
import { FiChevronsDown, FiEdit, FiSearch, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

export default function RabTable() {
    const [search, setSearch] = React.useState('')
    const [searchValue] = useDebounce(search, 300)

    const rab = api.rab.getAll.useQuery(
        { search: searchValue },
        { placeholderData: keepPreviousData }
    )

    const deleteRab = api.rab.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            toast.success(data.message)
            rab.refetch()
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    const groupedData = _.chain(rab.data)
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
                        <TableHead>Uraian</TableHead>
                        <TableHead>Sumber Dana</TableHead>
                        <TableHead className="w-1" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rab.isLoading && (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center">
                                Memuat data...
                            </TableCell>
                        </TableRow>
                    )}
                    {rab.isSuccess &&
                        groupedData &&
                        Object.keys(groupedData).map((key) => (
                            <React.Fragment key={key}>
                                <TableRow className="bg-blue-50 hover:bg-blue-50">
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
                                        <TableCell>
                                            <p>{item.uraian}</p>
                                            {item.spesifikasi && (
                                                <p className="mt-1 text-xs text-gray-500">
                                                    <span className="mr-1 inline-block text-green-500">
                                                        Spesifikasi :
                                                    </span>{' '}
                                                    {item.spesifikasi}
                                                </p>
                                            )}
                                        </TableCell>
                                        <TableCell>{item.sumberDana}</TableCell>
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
                                                        to={`/anggaran/rba/daftar-rab/${item.id}/edit`}
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
                                                                deleteRab.mutate(
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
                    {rab.isSuccess && rab.data?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                Tidak ada data
                            </TableCell>
                        </TableRow>
                    )}
                    {rab.isError && (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                {rab.error.message}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
