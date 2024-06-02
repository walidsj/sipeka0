import { FiCreditCard } from 'react-icons/fi'
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

export default function BankPicker({
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

    const bankSelected = api.bank.getById.useQuery(selected!, {
        enabled: !!selected,
        placeholderData: keepPreviousData,
    })

    const [search, setSearch] = React.useState<string>('')
    const [searchValue] = useDebounce(search, 300)

    const bank = api.bank.getAll.useQuery(
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
                        'w-full justify-start rounded-xl text-sm font-normal',
                        selected && 'h-14'
                    )}
                >
                    {selected !== undefined && (
                        <div>
                            {bankSelected.isSuccess && bankSelected.data && (
                                <div className="flex items-center gap-3">
                                    <FiCreditCard className="h-5 w-5 text-primary" />
                                    <div className="flex flex-col text-left">
                                        <span className="line-clamp-1">
                                            {bankSelected.data.nama}
                                        </span>
                                        <span className="line-clamp-1 text-xs text-slate-500">
                                            {bankSelected.data.kode}
                                        </span>
                                    </div>
                                </div>
                            )}
                            {bankSelected.isLoading && (
                                <div className="flex items-center gap-3">
                                    <FiCreditCard className="h-5 w-5 text-primary" />
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
                    <DialogTitle>Pilih Bank</DialogTitle>
                    <DialogDescription>
                        Referensi bank untuk transaksi
                    </DialogDescription>
                </DialogHeader>
                <Input
                    placeholder="Cari bank..."
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="max-h-96 overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-1">No.</TableHead>
                                <TableHead>Nama Bank</TableHead>
                                <TableHead className="text-center">
                                    Kode Bank
                                </TableHead>
                                <TableHead className="w-1">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bank.isSuccess &&
                                bank.data?.map((item, index) => (
                                    <TableRow
                                        key={index}
                                        className={cn(
                                            (value === item.id ||
                                                defaultValue === item.id) &&
                                                'bg-yellow-100 hover:bg-yellow-200'
                                        )}
                                    >
                                        <TableCell className="text-center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{item.nama}</TableCell>
                                        <TableCell className="text-center">
                                            {item.kode}
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
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    )
}
