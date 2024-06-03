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

export default function RbaTable() {
    const rba = api.rba.getAll.useQuery(
        {},
        { placeholderData: keepPreviousData }
    )

    const deleteRba = api.rba.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            toast.success(data.message)
            rba.refetch()
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
                    <TableHead>Tanggal</TableHead>
                    <TableHead>No. Dokumen</TableHead>
                    <TableHead>Uraian</TableHead>
                    <TableHead className="w-1" />
                </TableRow>
            </TableHeader>
            <TableBody>
                {rba.isLoading && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            Memuat data...
                        </TableCell>
                    </TableRow>
                )}
                {rba.isSuccess &&
                    rba.data?.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className="text-center">
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                {format(
                                    String(item.tglDokumen),
                                    'dd MMMM yyyy',
                                    { locale: id }
                                )}
                            </TableCell>
                            <TableCell>{item.noDokumen}</TableCell>
                            <TableCell>{item.uraian}</TableCell>
                            <TableCell>
                                <div className="flex gap-3">
                                    <Button asChild className="bg-secondary">
                                        <Link
                                            to={`/anggaran/rba/penyusunan-rba/${item.id}/aktivitas`}
                                        >
                                            Aktivitas
                                            <FiArrowRight className="ml-2" />
                                        </Link>
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">
                                                Aksi{' '}
                                                <FiChevronsDown className="ml-2" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="start">
                                            <Link
                                                to={`/anggaran/rba/penyusunan-rba/${item.id}/edit`}
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
                                                        deleteRba.mutate(
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
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                {rba.isSuccess && rba.data?.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            Tidak ada data
                        </TableCell>
                    </TableRow>
                )}
                {rba.isError && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            {rba.error.message}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
