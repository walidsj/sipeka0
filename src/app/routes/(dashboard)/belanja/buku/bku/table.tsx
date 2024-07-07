import Loading from '@/web/components/loading'
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
import { cn, formatAngka, formatTanggal } from '@/web/lib/utils'
import { api } from '@/web/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

export default function BkuTable() {
    const utils = api.useUtils()

    const [searchParams, setSearchParams] = useSearchParams({
        search: '',
        page: '1',
        pageSize: '10',
        startDate: '',
        endDate: '',
        showPotonganColumn: '',
    })

    const [searchValue] = useDebounce(searchParams.get('search') ?? '', 300)

    const {
        isLoading,
        isError,
        error,
        data: belanja,
    } = api.belanja.getAll.useQuery(
        {
            search: searchValue ?? '',
            page: Number(searchParams.get('page') ?? 1),
            pageSize: Number(searchParams.get('pageSize') ?? 10),
            startDate: searchParams.get('startDate')
                ? new Date(searchParams.get('startDate')!)
                : undefined,
            endDate: searchParams.get('endDate')
                ? new Date(searchParams.get('endDate')!)
                : undefined,
        },
        { placeholderData: keepPreviousData }
    )

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    if (!belanja) {
        return <div>Data tidak dapat dimuat.</div>
    }

    const totalBelanjaTable = belanja.data?.reduce(
        (acc, item) => acc + Number(item.jumlah),
        0
    )

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center gap-5">
                <div className="flex gap-2">
                    <Input
                        value={searchParams.get('startDate') ?? ''}
                        type="date"
                        onChange={(e) => {
                            searchParams.set('page', '1')
                            searchParams.set('startDate', e.target.value)
                            setSearchParams(searchParams)
                        }}
                    />
                    <Input
                        type="date"
                        value={searchParams.get('endDate') ?? ''}
                        onChange={(e) => {
                            searchParams.set('page', '1')
                            searchParams.set('endDate', e.target.value)
                            setSearchParams(searchParams)
                        }}
                    />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1 text-center">No.</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Nomor Bukti</TableHead>
                        <TableHead>Kode Rekening</TableHead>
                        <TableHead>Uraian</TableHead>
                        <TableHead>Penerimaan</TableHead>
                        <TableHead>Pengeluaran</TableHead>
                        <TableHead>Saldo</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {belanja.data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-center">
                                {formatAngka(
                                    belanja.meta.pagination.firstRow + index
                                )}
                                .
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
                            <TableCell className="text-right font-semibold">
                                {formatAngka(item.jumlah)}
                            </TableCell>
                        </TableRow>
                    ))}
                    {belanja.data.length === 0 && (
                        <TableRow>
                            <TableCell
                                colSpan={
                                    searchParams.get('showPotonganColumn')
                                        ? 11
                                        : 9
                                }
                                className="text-center"
                            >
                                Tidak ada data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={7}>Total</TableCell>
                        <TableCell
                            className={cn(
                                'text-right',
                                searchParams.get('showPotonganColumn') &&
                                    'border-r'
                            )}
                        >
                            {formatAngka(totalBelanjaTable)}
                        </TableCell>
                        <TableCell />
                        {searchParams.get('showPotonganColumn') && (
                            <>
                                <TableCell />
                                <TableCell />
                            </>
                        )}
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={7}>Total Keseluruhan</TableCell>
                        <TableCell
                            className={cn(
                                'text-right',
                                searchParams.get('showPotonganColumn') &&
                                    'border-r'
                            )}
                        >
                            {formatAngka(belanja.totalSum)}
                        </TableCell>
                        <TableCell />
                        {searchParams.get('showPotonganColumn') && (
                            <>
                                <TableCell />
                                <TableCell />
                            </>
                        )}
                    </TableRow>
                </TableFooter>
                <TableCaption>
                    Menampilkan data{' '}
                    {formatAngka(belanja.meta.pagination.firstRow)}-
                    {formatAngka(belanja.meta.pagination.lastRow)} dari{' '}
                    {formatAngka(belanja.meta.pagination.dataFiltered)}/
                    {formatAngka(belanja.meta.pagination.dataTotal)} data.
                </TableCaption>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            disabled={
                                Number(belanja.meta.pagination.page) === 1
                            }
                            onClick={() => {
                                Number(belanja.meta.pagination.page) > 1 &&
                                    searchParams.set(
                                        'page',
                                        String(
                                            Number(
                                                belanja.meta.pagination.page
                                            ) - 1
                                        )
                                    )
                                setSearchParams(searchParams)
                            }}
                        />
                    </PaginationItem>
                    <Select
                        value={String(belanja.meta.pagination.page) ?? '1'}
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
                                        belanja.meta.pagination.pageCount
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
                                Number(belanja.meta.pagination.page) ===
                                Number(belanja.meta.pagination.pageCount)
                            }
                            onClick={() => {
                                Number(belanja.meta.pagination.page) <
                                    Number(belanja.meta.pagination.pageCount) &&
                                    searchParams.set(
                                        'page',
                                        String(
                                            Number(
                                                belanja.meta.pagination.page
                                            ) + 1
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
