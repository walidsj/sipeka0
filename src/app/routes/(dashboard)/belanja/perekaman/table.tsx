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
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/web/components/ui/table'
import { cn } from '@/web/lib/utils'
import { api } from '@/web/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import _ from 'lodash'
import React from 'react'
import toast from 'react-hot-toast'
import { FiChevronsDown, FiEdit, FiSearch, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

export default function BelanjaTable() {
    const [search, setSearch] = React.useState('')
    const [searchValue] = useDebounce(search, 300)

    const utils = api.useUtils()

    const belanja = api.belanja.getAll.useQuery(
        { search: searchValue },
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

    const totalBelanja = belanja.data?.reduce(
        (acc, item) => acc + Number(item.jumlah),
        0
    )

    return (
        <div className="flex flex-col gap-5">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center justify-center px-3">
                    <FiSearch className="text-gray-400" />
                </div>
                <Input
                    className="max-w-80 pl-10"
                    placeholder="Cari data..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
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
                <TableBody>
                    {belanja.isLoading && (
                        <TableRow>
                            <TableCell colSpan={9} className="text-center">
                                <Loading />
                            </TableCell>
                        </TableRow>
                    )}
                    {belanja.isSuccess &&
                        belanja.data?.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell className="text-center">
                                    {index + 1}.
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
                                    {format(
                                        String(item.tglDokumen),
                                        'dd MMMM yyyy',
                                        {
                                            locale: id,
                                        }
                                    )}
                                </TableCell>
                                <TableCell>
                                    <p className="font-semibold">
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
                                            item.metodePembayaran ===
                                                'TRANSFER' && 'bg-blue-500'
                                        )}
                                    >
                                        {item.metodePembayaran}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                    {Number(item.jumlah).toLocaleString(
                                        'id-ID'
                                    )}
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
                    {belanja.isSuccess && belanja.data?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={9} className="text-center">
                                Tidak ada data
                            </TableCell>
                        </TableRow>
                    )}
                    {belanja.isError && (
                        <TableRow>
                            <TableCell colSpan={9} className="text-center">
                                {belanja.error.message}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={7}>Total</TableCell>
                        <TableCell className="text-right">
                            {Number(totalBelanja).toLocaleString('id-ID')}
                        </TableCell>
                        <TableCell />
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
