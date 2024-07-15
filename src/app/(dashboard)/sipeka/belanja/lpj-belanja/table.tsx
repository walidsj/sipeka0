import Loading from '@/components/loading'
import { Badge } from '@/components/ui/badge'
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
import { formatAngka, formatTanggal } from '@/lib/utils'
import { api } from '@/trpc/react'
import toast from 'react-hot-toast'
import {
    HiOutlineChevronDown,
    HiOutlineEye,
    HiOutlinePencil,
    HiOutlineTrash,
} from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function LpjBelanjaTable() {
    const utils = api.useUtils()

    const {
        isLoading,
        isError,
        error,
        data: lpjBelanja,
    } = api.lpjBelanja.getAll.useQuery()

    const deleteItem = api.lpjBelanja.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.lpjBelanja.invalidate()
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    if (isLoading) return <Loading />

    if (isError) {
        return <div>{error.message}</div>
    }

    if (!lpjBelanja) return <div>Data tidak dapat dimuat.</div>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1">No.</TableHead>
                    <TableHead>Tanggal Dokumen</TableHead>
                    <TableHead className="text-center">Nomor Dokumen</TableHead>
                    <TableHead>Uraian</TableHead>
                    <TableHead className="text-center">Jenis</TableHead>
                    <TableHead className="text-right">Jumlah</TableHead>
                    <TableHead className="w-1" />
                </TableRow>
            </TableHeader>
            <TableBody>
                {lpjBelanja.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-center">
                            {index + 1}.
                        </TableCell>
                        <TableCell className="font-semibold">
                            {formatTanggal(item.tglDokumen)}
                        </TableCell>
                        <TableCell className="text-center font-semibold">
                            {item.noDokumen}
                        </TableCell>
                        <TableCell className="font-semibold">
                            {item.uraian}
                        </TableCell>
                        <TableCell className="text-center">
                            {item.jenis === 'GU' && <Badge>GU</Badge>}
                            {item.jenis === 'LS' && (
                                <Badge className="bg-green-500">LS</Badge>
                            )}
                            {item.jenis === 'TU' && (
                                <Badge className="bg-yellow-500">TU</Badge>
                            )}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                            {formatAngka(
                                item.belanja.reduce(
                                    (acc, curr) => acc + Number(curr.jumlah),
                                    0
                                )
                            )}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        Aksi{' '}
                                        <HiOutlineChevronDown className="ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <Link to={`${item.id}`}>
                                        <DropdownMenuItem>
                                            <HiOutlineEye className="mr-2" />
                                            Detail
                                        </DropdownMenuItem>
                                    </Link>
                                    <Link to={`${item.id}/edit`}>
                                        <DropdownMenuItem>
                                            <HiOutlinePencil className="mr-2" />
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
                                                deleteItem.mutate(item.id)
                                            }
                                        }}
                                        className="text-red-500"
                                    >
                                        <HiOutlineTrash className="mr-2" />
                                        Hapus
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
                {lpjBelanja.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            Tidak ada data
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
