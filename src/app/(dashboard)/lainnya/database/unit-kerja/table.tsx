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
import { api } from '@/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { FiChevronsDown, FiEdit, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function UnitKerjaTable() {
    const unitKerja = api.unitKerja.getAll.useQuery(
        {},
        { placeholderData: keepPreviousData }
    )

    const deleteUnitKerja = api.unitKerja.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            toast.success(data.message)
            unitKerja.refetch()
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
                    <TableHead colSpan={2}>Nama Unit Kerja</TableHead>
                    <TableHead className="w-1" />
                </TableRow>
            </TableHeader>
            <TableBody>
                {unitKerja.isLoading && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">
                            <Loading />
                        </TableCell>
                    </TableRow>
                )}
                {unitKerja.isSuccess &&
                    unitKerja.data?.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell className="text-center">
                                {index + 1}.
                            </TableCell>
                            <TableCell className="w-14">
                                <img
                                    src="/images/icons/briefcase.png"
                                    alt="unit kerja"
                                    className="h-10 w-10"
                                />
                            </TableCell>
                            <TableCell className="font-semibold">
                                {item.nama}
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
                                            to={`/lainnya/database/unit-kerja/${item.id}/edit`}
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
                                                    deleteUnitKerja.mutate(
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
                {unitKerja.isSuccess && unitKerja.data?.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">
                            Tidak ada data
                        </TableCell>
                    </TableRow>
                )}
                {unitKerja.isError && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center">
                            {unitKerja.error.message}
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}
