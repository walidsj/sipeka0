import { Badge } from '@/web/components/ui/badge'
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
import { cn } from '@/web/lib/utils'
import { api } from '@/web/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { FiChevronsDown, FiEdit, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function RekananTable() {
    const rekanan = api.rekanan.getAll.useQuery(undefined, {
        placeholderData: keepPreviousData,
    })

    const deleteRekanan = api.rekanan.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            toast.success(data.message)
            rekanan.refetch()
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
                    <TableHead>Nama Rekanan</TableHead>
                    <TableHead className="text-center">Jenis</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead>NPWP</TableHead>
                    <TableHead className="w-1" />
                </TableRow>
            </TableHeader>
            <TableBody>
                {rekanan.isLoading && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">
                            Memuat data...
                        </TableCell>
                    </TableRow>
                )}
                {rekanan.isSuccess &&
                    rekanan.data?.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className="text-center">
                                {index + 1}
                            </TableCell>
                            <TableCell>{item.nama}</TableCell>
                            <TableCell className="text-center">
                                {item.jenis}
                            </TableCell>
                            <TableCell className="text-center">
                                <Badge
                                    className={cn(
                                        item.statusRekanan === 'BIASA' &&
                                            'bg-secondary',
                                        item.statusRekanan === 'MOU' &&
                                            'bg-red-400'
                                    )}
                                >
                                    {item.statusRekanan}
                                </Badge>
                            </TableCell>
                            <TableCell>{item.npwp}</TableCell>
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
                                            to={`/lainnya/database/rekanan/${item.id}/edit`}
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
                                                    deleteRekanan.mutate(
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
                {rekanan.isSuccess && rekanan.data?.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            Tidak ada data
                        </TableCell>
                    </TableRow>
                )}
                {rekanan.isError && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            {rekanan.error.message}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
