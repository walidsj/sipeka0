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
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import React from 'react'
import { cn } from '@/lib/utils'
import { useDebounce } from 'use-debounce'
import { Input } from '@/components/ui/input'
import { keepPreviousData } from '@tanstack/react-query'
import { Spinner } from '@/components/ui/spinner'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'

export default function RbaPicker({
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

    const rbaSelected = api.rba.getById.useQuery(selected!, {
        enabled: !!selected,
        placeholderData: keepPreviousData,
    })

    const [search, setSearch] = React.useState<string>('')
    const [searchValue] = useDebounce(search, 300)

    const rba = api.rba.getAll.useQuery(
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
                            {rbaSelected.isSuccess && rbaSelected.data && (
                                <div className="flex items-center gap-3">
                                    <img
                                        src="/images/icons/contract.png"
                                        alt="contract"
                                        className="h-10 w-10"
                                    />
                                    <div className="flex flex-col text-left">
                                        <span className="line-clamp-1">
                                            {rbaSelected.data.uraian}
                                        </span>
                                        <span className="line-clamp-1 text-xs text-slate-500">
                                            {rbaSelected.data.noDokumen} (
                                            {format(
                                                String(
                                                    rbaSelected.data.tglDokumen
                                                ),
                                                'dd MMMM yyyy',
                                                { locale: id }
                                            )}
                                            )
                                        </span>
                                    </div>
                                </div>
                            )}
                            {rbaSelected.isLoading && (
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
                    <DialogTitle>Pilih Item RBA</DialogTitle>
                    <DialogDescription>
                        Referensi RBA untuk transaksi
                    </DialogDescription>
                </DialogHeader>
                <Input
                    placeholder="Cari rba..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="max-h-96 overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1">No.</TableHead>
                                <TableHead>Uraian RBA</TableHead>
                                <TableHead>No. Dokumen</TableHead>
                                <TableHead>Tanggal</TableHead>
                                <TableHead className="w-1">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rba.isLoading && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <Spinner />
                                    </TableCell>
                                </TableRow>
                            )}
                            {rba.isSuccess &&
                                rba.data?.map((item, index) => (
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
                                        <TableCell className="font-semibold">
                                            {item.uraian}
                                        </TableCell>
                                        <TableCell>{item.noDokumen}</TableCell>
                                        <TableCell>
                                            {format(
                                                String(item.tglDokumen),
                                                'dd MMMM yyyy',
                                                { locale: id }
                                            )}
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
                            {rba.isSuccess && rba.data?.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
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
