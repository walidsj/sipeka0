import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { api } from '@/web/trpc/react'
import Loading from '@/web/components/loading'

import toast from 'react-hot-toast'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu'
import { Button } from '@/web/components/ui/button'
import {
    HiOutlineChevronDown,
    HiOutlinePencil,
    HiOutlinePlus,
    HiOutlinePrinter,
    HiOutlineTrash,
} from 'react-icons/hi'
import BelanjaEmptyLpjTable from './table'

export default function EditPage() {
    const params = useParams<{ lpjBelanjaId: string }>()
    const utils = api.useUtils()
    const navigate = useNavigate()

    const {
        data: lpjBelanja,
        isError,
        isLoading,
    } = api.lpjBelanja.getById.useQuery(Number(params.lpjBelanjaId))

    const deleteItem = api.lpjBelanja.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            navigate('/belanja/buku/lpj-belanja')
            utils.lpjBelanja.invalidate()
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    if (isLoading) return <Loading />

    if (isError) return <Navigate to={`/belanja/buku/lpj-belanja`} replace />

    if (!lpjBelanja)
        return <Navigate to={`/belanja/buku/lpj-belanja`} replace />

    return (
        <Card>
            <div className="mb-5 flex flex-row items-center justify-between px-6 pt-6">
                <CardHeader className="p-0">
                    <CardTitle>Detail Lpj Belanja</CardTitle>
                    <CardDescription>
                        Data untuk detail lpj Belanja
                    </CardDescription>
                </CardHeader>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Aksi <HiOutlineChevronDown className="ml-2" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <Link
                            to={`/belanja/buku/lpj-belanja/${params.lpjBelanjaId}/tambah-belanja`}
                        >
                            <DropdownMenuItem>
                                <HiOutlinePlus className="mr-2" />
                                Tambah Belanja
                            </DropdownMenuItem>
                        </Link>
                        <Link
                            to={`/belanja/buku/lpj-belanja/${params.lpjBelanjaId}/edit`}
                        >
                            <DropdownMenuItem>
                                <HiOutlinePencil className="mr-2" />
                                Edit
                            </DropdownMenuItem>
                        </Link>

                        <Link
                            to={`/belanja/buku/lpj-belanja/${params.lpjBelanjaId}/cetak`}
                        >
                            <DropdownMenuItem>
                                <HiOutlinePrinter className="mr-2" />
                                Cetak
                            </DropdownMenuItem>
                        </Link>

                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                if (
                                    confirm(
                                        'Apakah anda yakin menghapus data ini?'
                                    )
                                ) {
                                    deleteItem.mutate(
                                        Number(params.lpjBelanjaId)
                                    )
                                }
                            }}
                            className="text-red-500"
                        >
                            <HiOutlineTrash className="mr-2" />
                            Hapus
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <CardContent>
                <BelanjaEmptyLpjTable />
            </CardContent>
        </Card>
    )
}
