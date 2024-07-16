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
import toast from 'react-hot-toast'
import {
    HiOutlineChevronDown,
    HiOutlineEye,
    HiOutlinePencil,
    HiOutlineTrash,
} from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function SppTable() {
    const utils = api.useUtils()

    const { isLoading, isError, error, data: spp } = api.spp.getAll.useQuery()

    const deleteItem = api.spp.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.spp.invalidate()
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

    if (!spp) return <div>Data tidak dapat dimuat.</div>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1">No.</TableHead>
                    <TableHead>Tanggal Dokumen</TableHead>
                    <TableHead className="text-center">Nomor Dokumen</TableHead>
                    <TableHead className="w-1" />
                </TableRow>
            </TableHeader>
            <TableBody>
                {spp.map((item, index) => (
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
                {spp.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={100} className="text-center">
                            Tidak ada data
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
