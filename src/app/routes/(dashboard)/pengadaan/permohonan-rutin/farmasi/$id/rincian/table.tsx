import { Button } from '@/web/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/web/components/ui/table'
import { api } from '@/web/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { FiArrowRight, FiChevronsDown, FiEdit, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { id } from 'date-fns/locale'
import { Badge } from '@/web/components/ui/badge'

export default function FarmasiTable() {
    const rku = api.rku.getAll.useQuery(
        {},
        { placeholderData: keepPreviousData }
    )

    const deleteRku = api.rku.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            toast.success(data.message)
            rku.refetch()
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1 text-center">No.</TableHead>
                    <TableHead>Item</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Satuan</TableHead>
                    <TableHead>Harga Satuan</TableHead>
                    <TableHead>Harga Total</TableHead>
                    <TableHead className="w-1" />
                </TableRow>
            </TableHeader>
            <TableBody>
                {rku.isLoading && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            Memuat data...
                        </TableCell>
                    </TableRow>
                )}
                <TableRow>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell>Bodrexin (5000gr)</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>tablet</TableCell>
                    <TableCell className="text-nowrap text-right">
                        Rp 5.023.129
                    </TableCell>
                    <TableCell className="text-nowrap text-right">
                        Rp 5.023.129
                    </TableCell>
                    <TableCell>
                        <div className="flex gap-3">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        Aksi <FiChevronsDown className="ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <Link to={`/anggaran/rba/rku/edit`}>
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
                                                // deleteRku.mutate(item.id)
                                            }
                                        }}
                                        className="text-red-500"
                                    >
                                        <FiTrash className="mr-2" />
                                        Hapus
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="text-center">1</TableCell>
                    <TableCell>Oskadon</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>tablet</TableCell>
                    <TableCell className="text-nowrap text-right">
                        Rp 5.000.000
                    </TableCell>
                    <TableCell className="text-nowrap text-right">
                        Rp 10.000.000
                    </TableCell>
                    <TableCell>
                        <div className="flex gap-3">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        Aksi <FiChevronsDown className="ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <Link to={`/anggaran/rba/rku/edit`}>
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
                                                // deleteRku.mutate(item.id)
                                            }
                                        }}
                                        className="text-red-500"
                                    >
                                        <FiTrash className="mr-2" />
                                        Hapus
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </TableCell>
                </TableRow>
                {rku.isSuccess && rku.data?.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            Tidak ada data
                        </TableCell>
                    </TableRow>
                )}
                {rku.isError && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            {rku.error.message}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5} className="text-right">
                        Total
                    </TableCell>
                    <TableCell className="text-nowrap text-right">
                        Rp 15.023.129
                    </TableCell>
                    <TableCell />
                </TableRow>
            </TableFooter>
        </Table>
    )
}
