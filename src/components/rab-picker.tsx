import { Button } from '@/components/ui/button'
import { api } from '@/trpc/react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import React from 'react'
import { cn, formatAngka } from '@/lib/utils'
import { useDebounce } from 'use-debounce'
import { Input } from '@/components/ui/input'
import { keepPreviousData } from '@tanstack/react-query'
import { Spinner } from '@/components/ui/spinner'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { FiSearch } from 'react-icons/fi'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

export default function RabPicker({
    value,
    onValueChange,
    defaultValue,
}: {
    value?: number | undefined
    onValueChange?: (value: number | undefined) => void
    defaultValue?: number
}) {
    const [selected, setSelected] = React.useState<number | undefined>(
        value ?? defaultValue ?? 0
    )

    const rabSelected = api.rab.getById.useQuery(selected!, {
        enabled: !!selected,
        placeholderData: keepPreviousData,
    })

    const [pagination, setPagination] = React.useState({
        search: '',
        page: '1',
        pageSize: '10',
    })

    const [searchValue] = useDebounce(pagination.search ?? '', 300)

    const {
        isLoading,
        isError,
        error,
        data: rab,
    } = api.rab.getAll.useQuery(
        {
            search: searchValue ?? '',
            page: Number(pagination.page ?? 1),
            pageSize: Number(pagination.pageSize ?? 10),
        },
        { placeholderData: keepPreviousData }
    )

    if (isLoading) {
        return <Spinner />
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    if (!rab) {
        return <div>Data tidak dapat dimuat.</div>
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        'w-full justify-start bg-slate-100 text-sm font-normal',
                        selected && 'h-auto min-h-12'
                    )}
                >
                    {selected !== undefined && (
                        <div>
                            {rabSelected.isSuccess && rabSelected.data && (
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/images/icons/bill.png"
                                        alt="bill"
                                        className="h-10 w-10"
                                    />
                                    <div className="flex flex-col text-left">
                                        <span className="line-clamp-1">
                                            {rabSelected.data.uraian}
                                        </span>
                                        <span className="line-clamp-1 text-xs text-green-500">
                                            {rabSelected.data.spesifikasi}
                                        </span>
                                        <span className="line-clamp-1 text-xs text-slate-500">
                                            {rabSelected.data.kodeRekening}
                                        </span>
                                    </div>
                                </div>
                            )}
                            {rabSelected.isLoading && (
                                <div className="flex items-center gap-3">
                                    <Spinner />
                                </div>
                            )}
                        </div>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Pilih Item RAB</DialogTitle>
                    <DialogDescription>
                        Referensi RAB untuk transaksi
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-row items-center gap-5">
                    <Select
                        value={pagination.pageSize ?? '10'}
                        onValueChange={(val) =>
                            setPagination((prev) => ({
                                ...prev,
                                pageSize: val,
                                page: '1',
                            }))
                        }
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
                            value={pagination.search ?? ''}
                            onChange={(e) =>
                                setPagination((prev) => ({
                                    ...prev,
                                    search: e.target.value,
                                    page: '1',
                                }))
                            }
                        />
                    </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1">No.</TableHead>
                                <TableHead className="w-48">
                                    Kode Rekening
                                </TableHead>
                                <TableHead>Uraian RAB</TableHead>
                                <TableHead className="w-1">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rab.data.map((item, index) => (
                                <TableRow
                                    key={index}
                                    className={cn(
                                        selected === item.id &&
                                            'bg-yellow-100 hover:bg-yellow-200'
                                    )}
                                >
                                    <TableCell className="text-center">
                                        {rab.meta.pagination.firstRow + index}.
                                    </TableCell>
                                    <TableCell>
                                        <p>{item.rekening?.kode}</p>
                                        <p className="text-xs text-slate-500">
                                            {item.rekening?.uraian}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <p className="font-semibold">
                                            {item.uraian}
                                        </p>
                                        <p className="text-sm">
                                            {item.spesifikasi}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        {selected === item.id ? (
                                            <Button
                                                variant="destructive"
                                                onClick={() => {
                                                    setSelected(undefined)
                                                    onValueChange?.(undefined)
                                                }}
                                            >
                                                Batal
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setSelected(item.id)
                                                    onValueChange?.(item.id)
                                                }}
                                            >
                                                Pilih
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {rab.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center"
                                    >
                                        Tidak ada data
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TableCaption>
                    Menampilkan data {formatAngka(rab.meta.pagination.firstRow)}
                    -{formatAngka(rab.meta.pagination.lastRow)} dari{' '}
                    {formatAngka(rab.meta.pagination.dataFiltered)}/
                    {formatAngka(rab.meta.pagination.dataTotal)} data.
                </TableCaption>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                disabled={
                                    Number(rab.meta.pagination.page) === 1
                                }
                                onClick={() => {
                                    Number(rab.meta.pagination.page) > 1 &&
                                        setPagination((prev) => ({
                                            ...prev,
                                            page: String(
                                                Number(
                                                    rab.meta.pagination.page
                                                ) - 1
                                            ),
                                        }))
                                }}
                            />
                        </PaginationItem>
                        <Select
                            value={String(rab.meta.pagination.page) ?? '1'}
                            onValueChange={(val) => {
                                setPagination((prev) => ({
                                    ...prev,
                                    page: val,
                                }))
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
                                        setPagination((prev) => ({
                                            ...prev,
                                            page: String(
                                                Number(
                                                    rab.meta.pagination.page
                                                ) + 1
                                            ),
                                        }))
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </DialogContent>
        </Dialog>
    )
}
