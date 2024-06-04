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

export default function LaboratoriumTable() {
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
                    <TableHead>Penyedia</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal Invoice/Faktur</TableHead>
                    <TableHead>No. Invoice/Faktur</TableHead>
                    <TableHead>Uraian</TableHead>
                    <TableHead>Nilai Total</TableHead>
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
                    <TableCell>PT. EH SYAM</TableCell>
                    <TableCell>
                        <Badge className="bg-green-500">Belum Terbayar</Badge>
                    </TableCell>
                    <TableCell>04 Juni 2024</TableCell>
                    <TableCell>9203193801293</TableCell>
                    <TableCell>
                        Pembelian reagen kimia untuk keperluan laboratorium
                    </TableCell>
                    <TableCell className="text-nowrap">Rp 25.000.000</TableCell>
                    <TableCell>
                        <div className="flex gap-3">
                            <Button asChild className="bg-secondary">
                                <Link to="/pengadaan/permohonan-rutin/farmasi/1/rincian">
                                    Rincian
                                    <FiArrowRight className="ml-2" />
                                </Link>
                            </Button>
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
        </Table>
    )
}
