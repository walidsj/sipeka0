import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import {
    SelectItem,
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { formatAngka } from '@/lib/utils'
import { api } from '@/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import _ from 'lodash'
import React from 'react'
import toast from 'react-hot-toast'
import { FiChevronsDown, FiEdit, FiSearch, FiTrash } from 'react-icons/fi'
import { Link, useSearchParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

export default function RabTable() {
    const utils = api.useUtils()

    const [searchParams, setSearchParams] = useSearchParams({
        search: '',
        page: '1',
        pageSize: '10',
    })

    const [searchValue] = useDebounce(searchParams.get('search') ?? '', 300)

    const {
        isLoading,
        isError,
        error,
        data: rab,
    } = api.rab.getAll.useQuery(
        {
            search: searchValue ?? '',
            page: Number(searchParams.get('page') ?? 1),
            pageSize: Number(searchParams.get('pageSize') ?? 10),
        },
        { placeholderData: keepPreviousData }
    )

    const deleteRab = api.rab.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.rab.invalidate()
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    if (!rab) {
        return <div>Data tidak dapat dimuat.</div>
    }

    const groupedData = _.chain(rab.data)
        .groupBy((item) => `${item.rekening?.kode}||${item.rekening?.uraian}`)
        .value()

    let globalIndex = 0

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center gap-5">
                <Select
                    value={searchParams.get('pageSize') ?? '10'}
                    onValueChange={(val) => {
                        searchParams.set('pageSize', val)
                        searchParams.set('page', '1')
                        setSearchParams(searchParams)
                    }}
                >
                    <SelectTrigger className="w-20 font-semibold">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center justify-center px-3">
                        <FiSearch className="text-gray-400" />
                    </div>
                    <Input
                        className="pl-10"
                        placeholder="Cari data..."
                        value={searchParams.get('search') ?? ''}
                        onChange={(e) => {
                            searchParams.set('search', e.target.value)
                            searchParams.set('page', '1')
                            setSearchParams(searchParams)
                        }}
                    />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1 text-center">No.</TableHead>
                        <TableHead colSpan={2}>Uraian</TableHead>
                        <TableHead>Sumber Dana</TableHead>
                        <TableHead>Unit Kerja</TableHead>
                        <TableHead className="w-1" />
                    </TableRow>
                </TableHeader>
                {groupedData && (
                    <TableBody>
                        {Object.keys(groupedData).map((key) => (
                            <React.Fragment key={key}>
                                <TableRow>
                                    <TableCell colSpan={6}>
                                        <span className="mr-3 inline-block font-bold">
                                            {key.split('||')[0]}
                                        </span>
                                        <span className="font-semibold">
                                            {key.split('||')[1]}
                                        </span>
                                    </TableCell>
                                </TableRow>
                                {groupedData[key].map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="text-center">
                                            {Number(
                                                rab.meta.pagination.firstRow
                                            ) +
                                                ++globalIndex -
                                                1}
                                            .
                                        </TableCell>
                                        <TableCell className="w-14">
                                            <img
                                                src="/images/icons/bill.png"
                                                alt="bill"
                                                className="h-10 w-10"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <p className="font-semibold">
                                                {item.uraian}
                                            </p>
                                            {item.spesifikasi && (
                                                <p className="mt-1 text-xs text-gray-500">
                                                    <span className="mr-1 inline-block font-medium text-primary">
                                                        Spesifikasi :
                                                    </span>{' '}
                                                    {item.spesifikasi}
                                                </p>
                                            )}
                                        </TableCell>
                                        <TableCell>{item.sumberDana}</TableCell>
                                        <TableCell>
                                            {item.unitKerja?.nama}
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
                    </TableBody>
                )}
                {rab.data.length === 0 && (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                Tidak ada data
                            </TableCell>
                        </TableRow>
                    </TableBody>
                )}
                <TableCaption>
                    Menampilkan data {formatAngka(rab.meta.pagination.firstRow)}
                    -{formatAngka(rab.meta.pagination.lastRow)} dari{' '}
                    {formatAngka(rab.meta.pagination.dataFiltered)}/
                    {formatAngka(rab.meta.pagination.dataTotal)} data.
                </TableCaption>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            disabled={Number(rab.meta.pagination.page) === 1}
                            onClick={() => {
                                Number(rab.meta.pagination.page) > 1 &&
                                    searchParams.set(
                                        'page',
                                        String(
                                            Number(rab.meta.pagination.page) - 1
                                        )
                                    )
                                setSearchParams(searchParams)
                            }}
                        />
                    </PaginationItem>
                    <Select
                        value={String(rab.meta.pagination.page) ?? '1'}
                        onValueChange={(val) => {
                            searchParams.set('page', val)
                            setSearchParams(searchParams)
                        }}
                    >
                        <SelectTrigger className="w-20 font-semibold">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {Array.from(
                                {
                                    length: Number(
                                        rab.meta.pagination.pageCount
                                    ),
                                },
                                (_, i) => i + 1
                            ).map((page) => (
                                <SelectItem key={page} value={String(page)}>
                                    {page}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <PaginationItem>
                        <PaginationNext
                            disabled={
                                Number(rab.meta.pagination.page) ===
                                Number(rab.meta.pagination.pageCount)
                            }
                            onClick={() => {
                                Number(rab.meta.pagination.page) <
                                    Number(rab.meta.pagination.pageCount) &&
                                    searchParams.set(
                                        'page',
                                        String(
                                            Number(rab.meta.pagination.page) + 1
                                        )
                                    )
                                setSearchParams(searchParams)
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
