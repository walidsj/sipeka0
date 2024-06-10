import Loading from '@/web/components/loading'
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
import { FiArrowRight, FiChevronsDown, FiEdit, FiTrash } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'

export default function AktivitasTable() {
    const params = useParams<{ rbaId: string }>()

    const aktivitasRba = api.aktivitasRba.getByRbaId.useQuery(
        parseInt(params.rbaId ?? ''),
        { placeholderData: keepPreviousData }
    )

    const deleteAktivitasRba = api.aktivitasRba.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            toast.success(data.message)
            aktivitasRba.refetch()
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
                    <TableHead>Kode</TableHead>
                    <TableHead>Nama Aktivitas</TableHead>
                    <TableHead className="text-center">Jenis</TableHead>
                    <TableHead className="w-1" />
                </TableRow>
            </TableHeader>
            <TableBody>
                {aktivitasRba.isLoading && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            <Loading />
                        </TableCell>
                    </TableRow>
                )}
                {aktivitasRba.isSuccess &&
                    aktivitasRba.data?.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className="text-center">
                                {index + 1}.
                            </TableCell>
                            <TableCell>{item.kode}</TableCell>
                            <TableCell className="font-semibold">
                                {item.nama}
                            </TableCell>
                            <TableCell className="text-center">
                                <Badge
                                    className={cn(
                                        item.jenis === 'BELANJA' &&
                                            'bg-red-500',
                                        item.jenis === 'PENDAPATAN' &&
                                            'bg-green-500',
                                        item.jenis === 'PEMBIAYAAN' &&
                                            'bg-yellow-500'
                                    )}
                                >
                                    {item.jenis}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-3">
                                    <Button asChild className="bg-secondary">
                                        <Link
                                            to={`/anggaran/rba/penyusunan-rba/${params.rbaId}/aktivitas/${item.id}/rincian-rba`}
                                        >
                                            Rincian RBA
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
                                                to={`/anggaran/rba/penyusunan-rba/${params.rbaId}/aktivitas/${item.id}/edit`}
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
                                                        deleteAktivitasRba.mutate(
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
                {aktivitasRba.isSuccess && aktivitasRba.data?.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            Tidak ada data
                        </TableCell>
                    </TableRow>
                )}
                {aktivitasRba.isError && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            {aktivitasRba.error.message}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
