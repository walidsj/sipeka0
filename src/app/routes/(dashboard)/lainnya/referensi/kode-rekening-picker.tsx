import { FiCode } from 'react-icons/fi'
import { Button } from '@/web/components/ui/button'
import { api } from '@/web/trpc/react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/web/components/ui/dialog'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/web/components/ui/table'
import React from 'react'
import { cn, formatAngka } from '@/web/lib/utils'
import { useDebounce } from 'use-debounce'
import { Input } from '@/web/components/ui/input'
import { keepPreviousData } from '@tanstack/react-query'
import Loading from '@/web/components/loading'
import { useSearchParams } from 'react-router-dom'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/web/components/ui/pagination'

export default function KodeRekeningPicker({
    value,
    onValueChange,
    defaultValue,
    params,
}: {
    value?: string | undefined
    onValueChange?: (value: string | undefined) => void
    defaultValue?: string
    params?: { searchKode: string }
}) {
    const [selected, setSelected] = React.useState<string | undefined>(
        value ?? defaultValue ?? ''
    )

    const kodeRekeningSelected = api.kodeRekening.getByKode.useQuery(
        { kode: selected!, level: '6' },
        { enabled: !!selected, placeholderData: keepPreviousData }
    )

    const [searchParams, setSearchParams] = useSearchParams({
        search: '',
        page: '1',
        pageSize: '10',
    })

    const [searchValue] = useDebounce(searchParams.get('search') ?? '', 300)

    const [level] = React.useState<'1' | '2' | '3' | '4' | '5' | '6'>('6')

    const {
        isLoading,
        isError,
        error,
        data: rekening,
    } = api.kodeRekening.getAll.useQuery(
        {
            searchKode: params?.searchKode,
            level: level,
            search: searchValue,
            page: searchParams.get('page')
                ? Number(searchParams.get('page'))
                : 1,
            pageSize: searchParams.get('pageSize')
                ? Number(searchParams.get('pageSize'))
                : 10,
        },
        { placeholderData: keepPreviousData }
    )

    if (isLoading) return <Loading />

    if (isError) return <div>{error.message}</div>

    if (!rekening) return <div>Data tidak dapat dimuat.</div>

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        'w-full justify-start rounded-lg text-sm font-normal',
                        selected && 'h-auto min-h-12'
                    )}
                >
                    {selected !== undefined && (
                        <div>
                            {kodeRekeningSelected.isSuccess &&
                                kodeRekeningSelected.data && (
                                    <div className="flex items-center gap-3">
                                        <FiCode className="h-5 w-5 text-primary" />
                                        <div className="flex flex-col text-left">
                                            <span className="line-clamp-1">
                                                {kodeRekeningSelected.data.kode}
                                            </span>
                                            <span className="line-clamp-1 text-xs text-slate-500">
                                                {
                                                    kodeRekeningSelected.data
                                                        .uraian
                                                }
                                            </span>
                                        </div>
                                    </div>
                                )}
                            {kodeRekeningSelected.isLoading && (
                                <div className="flex items-center gap-3">
                                    <Loading />
                                </div>
                            )}
                        </div>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Pilih Kode Rekening</DialogTitle>
                    <DialogDescription>
                        Data referensi kode rekening
                    </DialogDescription>
                </DialogHeader>
                <Input
                    placeholder="Cari kodeRekening..."
                    value={searchParams.get('search') ?? ''}
                    onChange={(e) =>
                        setSearchParams((prev) => {
                            prev.set('search', e.target.value)
                            return prev
                        })
                    }
                />
                <div className="max-h-96 overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1">No.</TableHead>
                                <TableHead>Kode Rekening</TableHead>
                                <TableHead>Uraian</TableHead>
                                <TableHead className="w-1">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rekening.data?.map((item, index) => (
                                <TableRow
                                    key={index}
                                    className={cn(
                                        selected === item.kode &&
                                            'bg-yellow-100 hover:bg-yellow-200'
                                    )}
                                >
                                    <TableCell className="text-center">
                                        {formatAngka(
                                            rekening.meta.pagination.firstRow +
                                                index
                                        )}
                                        .
                                    </TableCell>
                                    <TableCell>{item.kode}</TableCell>
                                    <TableCell>{item.uraian}</TableCell>
                                    <TableCell>
                                        {selected === item.kode ? (
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
                                                    setSelected(item.kode)
                                                    onValueChange?.(item.kode)
                                                }}
                                            >
                                                Pilih
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {rekening.data?.length === 0 && (
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
                        <TableCaption>
                            Menampilkan data{' '}
                            {formatAngka(rekening.meta.pagination.firstRow)}-
                            {formatAngka(rekening.meta.pagination.lastRow)} dari
                            total{' '}
                            {formatAngka(rekening.meta.pagination.dataTotal)}{' '}
                            data.
                        </TableCaption>
                    </Table>
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => {
                                    Number(rekening.meta.pagination.page) > 1 &&
                                        searchParams.set(
                                            'page',
                                            String(
                                                Number(
                                                    rekening.meta.pagination
                                                        .page
                                                ) - 1
                                            )
                                        )
                                    setSearchParams(searchParams)
                                }}
                            />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => {
                                    Number(rekening.meta.pagination.page) <
                                        Number(
                                            rekening.meta.pagination.pageCount
                                        ) &&
                                        searchParams.set(
                                            'page',
                                            String(
                                                Number(
                                                    rekening.meta.pagination
                                                        .page
                                                ) + 1
                                            )
                                        )
                                    setSearchParams(searchParams)
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </DialogContent>
        </Dialog>
    )
}
