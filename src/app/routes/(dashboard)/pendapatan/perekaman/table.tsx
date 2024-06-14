import Loading from '@/web/components/loading'
import { Button } from '@/web/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu'
import { Input } from '@/web/components/ui/input'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/web/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/web/components/ui/select'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/web/components/ui/table'
import { formatAngka } from '@/web/lib/utils'
import { api } from '@/web/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import toast from 'react-hot-toast'
import { FiChevronsDown, FiEdit, FiSearch, FiTrash } from 'react-icons/fi'
import { Link, useSearchParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

export default function PendapatanTable() {
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
        data: pendapatan,
    } = api.pendapatan.getAll.useQuery(
        {
            search: searchValue,
            page: Number(searchParams.get('page')),
            pageSize: Number(searchParams.get('pageSize')),
        },
        { placeholderData: keepPreviousData }
    )

    const deletePendapatan = api.pendapatan.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.pendapatan.invalidate()
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

    if (!pendapatan) {
        return <div>Data tidak dapat dimuat.</div>
    }

    const totalPendapatan = pendapatan.data?.reduce(
        (acc, item) => acc + Number(item.jumlah),
        0
    )

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center gap-5">
                <Select
                    value={searchParams.get('pageSize') ?? ''}
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
                        <TableHead colSpan={2}>Tanggal</TableHead>
                        <TableHead>Kode Rekening</TableHead>
                        <TableHead>Uraian</TableHead>
                        <TableHead className="text-right">Jumlah</TableHead>
                        <TableHead className="w-1" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {pendapatan.data.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className="text-center">
                                {formatAngka(
                                    pendapatan.meta.pagination.firstRow + index
                                )}
                                .
                            </TableCell>
                            <TableCell className="w-14">
                                <img
                                    src="/images/icons/stamp.png"
                                    alt="sell"
                                    className="h-10 w-10"
                                />
                            </TableCell>
                            <TableCell className="w-32 font-semibold">
                                {format(
                                    String(item.tglDokumen),
                                    'dd MMMM yyyy',
                                    {
                                        locale: id,
                                    }
                                )}
                            </TableCell>
                            <TableCell className="w-60">
                                <p className="font-medium">
                                    {item.rap?.uraian}
                                </p>
                                <p className="text-sm text-slate-500">
                                    {item.rap?.kodeRekening}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {item.rekening?.uraian}
                                </p>
                            </TableCell>
                            <TableCell className="font-semibold">
                                {item.keterangan}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                                {Number(item.jumlah).toLocaleString('id-ID')}
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
                                            to={`/pendapatan/perekaman/${item.id}/edit`}
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
                                                    deletePendapatan.mutate(
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
                    {pendapatan.data.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                Tidak ada data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell className="text-right">
                            {formatAngka(totalPendapatan)}
                        </TableCell>
                        <TableCell />
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={5}>Total Keseluruhan</TableCell>
                        <TableCell className="text-right">
                            {formatAngka(pendapatan.totalSum)}
                        </TableCell>
                        <TableCell />
                    </TableRow>
                </TableFooter>
                <TableCaption>
                    Menampilkan data {pendapatan.meta.pagination.firstRow}-
                    {pendapatan.meta.pagination.lastRow} dari total{' '}
                    {pendapatan.meta.pagination.dataTotal} data.
                </TableCaption>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => {
                                Number(pendapatan.meta.pagination.page) > 1 &&
                                    searchParams.set(
                                        'page',
                                        String(
                                            Number(
                                                pendapatan.meta.pagination.page
                                            ) - 1
                                        )
                                    )
                                setSearchParams(searchParams)
                            }}
                        />
                    </PaginationItem>
                    <Select
                        value={String(pendapatan.meta.pagination.page) ?? '1'}
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
                                        pendapatan.meta.pagination.pageCount
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
                            onClick={() => {
                                Number(pendapatan.meta.pagination.page) <
                                    Number(
                                        pendapatan.meta.pagination.pageCount
                                    ) &&
                                    searchParams.set(
                                        'page',
                                        String(
                                            Number(searchParams.get('page')) + 1
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
