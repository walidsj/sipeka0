import Loading from '@/web/components/loading'
import { Badge } from '@/web/components/ui/badge'
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
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/web/components/ui/table'
import { cn, formatAngka, formatTanggal } from '@/web/lib/utils'
import { api } from '@/web/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { FiChevronsDown, FiEdit, FiSearch, FiTrash } from 'react-icons/fi'
import { Link, useSearchParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

export default function BelanjaTable() {
    const utils = api.useUtils()

    const [searchParams, setSearchParams] = useSearchParams({
        search: '',
        page: '1',
        pageSize: '10',
    })

    const [searchValue] = useDebounce(searchParams.get('search') ?? '', 300)

    const {
        data: belanja,
        isLoading,
        isPending,
        isError,
        error,
    } = api.belanja.getAll.useQuery(
        {
            search: searchValue,
            page: Number(searchParams.get('page')),
            pageSize: Number(searchParams.get('pageSize')),
        },
        { placeholderData: keepPreviousData }
    )

    const deleteBelanja = api.belanja.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            toast.success(data.message)
            utils.belanja.invalidate()
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

    const totalBelanjaTable = belanja?.data.reduce(
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
                    <SelectTrigger className="w-20">
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
                        <TableHead colSpan={2}>Nomor Dokumen</TableHead>
                        <TableHead>Tanggal Dokumen</TableHead>
                        <TableHead>Kode Rekening</TableHead>
                        <TableHead>Uraian</TableHead>
                        <TableHead className="text-center">
                            Metode Pembayaran
                        </TableHead>
                        <TableHead className="text-right">Jumlah</TableHead>
                        <TableHead className="w-1" />
                    </TableRow>
                </TableHeader>
                <TableBody className={cn(isPending && 'opacity-50')}>
                    {belanja?.data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-center">
                                {formatAngka(
                                    belanja.meta.pagination.firstRow + index
                                )}
                                .
                            </TableCell>
                            <TableCell className="w-14">
                                <img
                                    src="/images/icons/buy.png"
                                    alt="sell"
                                    className="h-10 w-10"
                                />
                            </TableCell>
                            <TableCell className="text-center font-semibold">
                                {item.noDokumen}
                            </TableCell>
                            <TableCell className="font-semibold">
                                {formatTanggal(item.tglDokumen)}
                            </TableCell>
                            <TableCell>
                                <p className="font-medium">
                                    {item.rab?.uraian}
                                </p>
                                <p className="text-sm text-slate-500">
                                    {item.rab?.kodeRekening}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {item.rekening?.uraian}
                                </p>
                            </TableCell>
                            <TableCell className="font-semibold">
                                {item.uraian}
                            </TableCell>
                            <TableCell className="text-center font-semibold">
                                <Badge
                                    className={cn(
                                        item.metodePembayaran === 'TUNAI' &&
                                            'bg-green-500',
                                        item.metodePembayaran === 'TRANSFER' &&
                                            'bg-blue-500'
                                    )}
                                >
                                    {item.metodePembayaran}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                                {formatAngka(item.jumlah)}
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
                                            to={`/belanja/perekaman/${item.id}/edit`}
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
                                                    deleteBelanja.mutate(
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
                    {belanja?.data.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={9} className="text-center">
                                Tidak ada data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={7}>Total</TableCell>
                        <TableCell className="text-right">
                            {Number(totalBelanjaTable).toLocaleString('id-ID')}
                        </TableCell>
                        <TableCell />
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={7}>Total Keseluruhan</TableCell>
                        <TableCell className="text-right">
                            {formatAngka(belanja?.totalSum)}
                        </TableCell>
                        <TableCell />
                    </TableRow>
                </TableFooter>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => {
                                Number(searchParams.get('page')) > 1 &&
                                    searchParams.set(
                                        'page',
                                        String(
                                            Number(searchParams.get('page')) - 1
                                        )
                                    )
                                setSearchParams(searchParams)
                            }}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => {
                                searchParams.set(
                                    'page',
                                    String(Number(searchParams.get('page')) + 1)
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
