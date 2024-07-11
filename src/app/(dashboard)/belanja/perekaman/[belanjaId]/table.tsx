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
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { formatAngka } from '@/lib/utils'
import { api } from '@/trpc/react'
import toast from 'react-hot-toast'
import { FiChevronsDown, FiEdit, FiTrash } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'

export default function PotonganTable() {
    const params = useParams<{ belanjaId: string }>()
    const utils = api.useUtils()

    const {
        isLoading,
        isError,
        error,
        data: potongan,
    } = api.belanja.getPotonganByBelanjaId.useQuery(Number(params.belanjaId))

    const deletePotongan = api.belanja.deletePotonganById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.belanja.invalidate()
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

    if (!potongan) return <div>Data tidak dapat dimuat.</div>

    const totalPotongan = potongan.reduce(
        (acc, item) => acc + Number(item.jumlah),
        0
    )

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-1">No.</TableHead>
                    <TableHead>Jenis Potongan</TableHead>
                    <TableHead>Kode Billing</TableHead>
                    <TableHead>Kode NTPN</TableHead>
                    <TableHead>Nominal</TableHead>
                    <TableHead className="w-1" />
                </TableRow>
            </TableHeader>
            <TableBody>
                {potongan.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="text-center">
                            {index + 1}.
                        </TableCell>
                        <TableCell>{item.jenis}</TableCell>
                        <TableCell>{item.billing}</TableCell>
                        <TableCell>{item.ntpn}</TableCell>
                        <TableCell className="text-right">
                            {formatAngka(item.jumlah)}
                        </TableCell>
                        <TableCell>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">
                                        Aksi <FiChevronsDown className="ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    <Link
                                        to={`/belanja/perekaman/${params.belanjaId}/potongan/${item.id}/edit`}
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
                                                deletePotongan.mutate(item.id)
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
                {potongan.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center">
                            Tidak ada data
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total Potongan</TableCell>
                    <TableCell className="text-right">
                        {formatAngka(totalPotongan)}
                    </TableCell>
                    <TableCell />
                </TableRow>
            </TableFooter>
        </Table>
    )
}
