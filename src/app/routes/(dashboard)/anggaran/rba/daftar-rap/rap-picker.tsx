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
import Loading from '@/web/components/loading'

export default function RapPicker({
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

    const rapSelected = api.rap.getById.useQuery(selected!, {
        enabled: !!selected,
        placeholderData: keepPreviousData,
    })

    const [search, setSearch] = React.useState<string>('')
    const [searchValue] = useDebounce(search, 300)

    const rap = api.rap.getAll.useQuery(
        { search: searchValue },
        { placeholderData: keepPreviousData }
    )

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
                            {rapSelected.isSuccess && rapSelected.data && (
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/images/icons/sell.png"
                                        alt="sell"
                                        className="h-10 w-10"
                                    />
                                    <div className="flex flex-col text-left">
                                        <span className="line-clamp-1">
                                            {rapSelected.data.uraian}
                                        </span>
                                        <span className="line-clamp-1 text-xs text-slate-500">
                                            {rapSelected.data.kodeRekening}
                                        </span>
                                    </div>
                                </div>
                            )}
                            {rapSelected.isLoading && (
                                <div className="flex items-center gap-3">
                                    <Loading />
                                </div>
                            )}
                        </div>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Pilih Item RAP</DialogTitle>
                    <DialogDescription>
                        Referensi RAP untuk transaksi
                    </DialogDescription>
                </DialogHeader>
                <Input
                    placeholder="Cari rap..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="max-h-96 overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1">No.</TableHead>
                                <TableHead className="w-48">
                                    Kode Rekening
                                </TableHead>
                                <TableHead>Uraian</TableHead>
                                <TableHead className="w-1">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rap.isSuccess &&
                                rap.data?.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        className={cn(
                                            selected === item.id &&
                                                'bg-yellow-100 hover:bg-yellow-200'
                                        )}
                                    >
                                        <TableCell className="text-center">
                                            {index + 1}.
                                        </TableCell>
                                        <TableCell>
                                            <p>{item.kodeRekening}</p>
                                            <p className="text-xs text-slate-500">
                                                {item.uraianRekening}
                                            </p>
                                        </TableCell>
                                        <TableCell className="font-semibold">
                                            {item.uraian}
                                        </TableCell>
                                        <TableCell>
                                            {selected === item.id ? (
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
                            {rap.isSuccess && rap.data?.length === 0 && (
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
