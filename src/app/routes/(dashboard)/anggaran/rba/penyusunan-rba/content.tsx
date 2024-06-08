import { Button } from '@/web/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu'
import { api } from '@/web/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'
import { FiArrowRight, FiChevronsDown, FiEdit, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { id } from 'date-fns/locale'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'

export default function RbaContentList() {
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
        <div className="grid grid-cols-3 gap-5">
            {rba.isLoading && <div className="col-span-3">Memuat data...</div>}
            {rba.isSuccess &&
                rba.data?.map((item, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <div className="mb-2">
                                <img
                                    src="/images/icons/contract.png"
                                    className="h-14"
                                    alt="RBA"
                                />
                            </div>
                            <CardTitle>{item.uraian}</CardTitle>
                            <CardDescription>
                                No. {item.noDokumen} tanggal{' '}
                                {format(
                                    String(item.tglDokumen),
                                    'dd MMMM yyyy',
                                    {
                                        locale: id,
                                    }
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-3">
                                <Button asChild className="bg-secondary">
                                    <Link
                                        to={`/anggaran/rba/penyusunan-rba/${item.id}/aktivitas`}
                                    >
                                        Rincian
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
                                                    deleteRba.mutate(item.id)
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
                        </CardContent>
                    </Card>
                ))}
            {rba.isSuccess && rba.data?.length === 0 && (
                <div className="col-span-3">Tidak ada data</div>
            )}
            {rba.isError && (
                <div className="col-span-3">{rba.error.message}</div>
            )}
        </div>
    )
}
