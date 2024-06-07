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
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/web/components/ui/table'
import React from 'react'
import { cn } from '@/web/lib/utils'
import { useDebounce } from 'use-debounce'
import { Input } from '@/web/components/ui/input'
import { keepPreviousData } from '@tanstack/react-query'

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

    const [search, setSearch] = React.useState<string>('')
    const [searchValue] = useDebounce(search, 300)
    const [level] = React.useState<'1' | '2' | '3' | '4' | '5' | '6'>('6')
    const [page] = React.useState<number>(1)
    const [perPage] = React.useState<number>(10)

    const kodeRekening = api.kodeRekening.getAll.useQuery(
        {
            search: searchValue,
            searchKode: params?.searchKode,
            level: level,
            page: page,
            perPage: perPage,
        },
        { placeholderData: keepPreviousData }
    )

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        'w-full justify-start rounded-xl text-sm font-normal',
                        selected && 'h-14'
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
                                    <FiCode className="h-5 w-5 text-primary" />
                                    <div className="flex flex-col text-left">
                                        <span>Loading...</span>
                                    </div>
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
                    onChange={(e) => setSearch(e.target.value)}
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
                            {kodeRekening.isSuccess &&
                                kodeRekening.data?.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        className={cn(
                                            selected === item.kode &&
                                                'bg-yellow-100 hover:bg-yellow-200'
                                        )}
                                    >
                                        <TableCell className="text-center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{item.kode}</TableCell>
                                        <TableCell>{item.uraian}</TableCell>
                                        <TableCell>
                                            {selected === item.kode ? (
                                                <Button
                                                    variant="destructive"
                                                    onClick={() => {
                                                        setSelected(undefined)
                                                        onValueChange?.(
                                                            undefined
                                                        )
                                                    }}
                                                >
                                                    Batal
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="outline"
                                                    onClick={() => {
                                                        setSelected(item.kode)
                                                        onValueChange?.(
                                                            item.kode
                                                        )
                                                    }}
                                                >
                                                    Pilih
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {kodeRekening.isSuccess &&
                                kodeRekening.data?.length === 0 && (
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
            </DialogContent>
        </Dialog>
    )
}
