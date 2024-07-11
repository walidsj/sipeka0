import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { formatTanggal } from '@/lib/utils'
import { api } from '@/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { FiChevronsDown, FiEdit, FiEye, FiTrash } from 'react-icons/fi'
import { HiOutlineDocumentReport } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function Sp3bTable() {
    const utils = api.useUtils()

    const {
        isLoading,
        isError,
        error,
        data: sp3b,
    } = api.sp3b.getAll.useQuery(undefined, {
        placeholderData: keepPreviousData,
    })

    const deleteSp3b = api.sp3b.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.sp3b.invalidate()
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    if (!sp3b) {
        return <div>Data tidak dapat dimuat.</div>
    }

    return (
        <div className="flex flex-col gap-5">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1 text-center">No.</TableHead>
                        <TableHead colSpan={2}>Nomor Dokumen</TableHead>
                        <TableHead>Tanggal Dokumen</TableHead>
                        <TableHead>Periode Pendapatan/Belanja</TableHead>
                        <TableHead className="w-1" />
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {sp3b.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell className="text-center">
                                {index + 1}.
                            </TableCell>
                            <TableCell className="w-1">
                                <div className="h-10 w-10 rounded-full bg-amber-100 p-2">
                                    <HiOutlineDocumentReport className="h-6 w-6 text-amber-500" />
                                </div>
                            </TableCell>
                            <TableCell className="font-semibold">
                                {item.noDokumen}
                            </TableCell>
                            <TableCell className="font-semibold">
                                {formatTanggal(item.tglDokumen)}
                            </TableCell>
                            <TableCell className="font-semibold">
                                {formatTanggal(item.tglMulai)} -{' '}
                                {formatTanggal(item.tglSelesai)}
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
                                        <Link to={`/akuntansi/sp3b/${item.id}`}>
                                            <DropdownMenuItem>
                                                <FiEye className="mr-2" />
                                                Detail
                                            </DropdownMenuItem>
                                        </Link>
                                        <Link
                                            to={`/akuntansi/sp3b/${item.id}/edit`}
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
                                                    deleteSp3b.mutate(item.id)
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
                    {sp3b.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                Tidak ada data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
