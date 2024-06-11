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
import { FiChevronsDown, FiEdit, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { id } from 'date-fns/locale'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import Loading from '@/web/components/loading'

export default function DbaContentList() {
    const dba = api.dba.getAll.useQuery(
        {},
        { placeholderData: keepPreviousData }
    )

    const deleteDba = api.dba.deleteById.useMutation({
        onMutate() {
            toast.loading('Menghapus data...')
        },
        onSuccess(data) {
            toast.dismiss()
            toast.success(data.message)
            dba.refetch()
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    return (
        <div className="grid grid-cols-3 gap-5">
            {dba.isLoading && (
                <div className="col-span-3">
                    <Loading />
                </div>
            )}
            {dba.isSuccess &&
                dba.data?.map((item, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <div className="mb-2">
                                <img
                                    src="/images/icons/documentation.png"
                                    className="h-14"
                                    alt="DBA"
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
                            <p className="rounded-lg border border-yellow-300 bg-yellow-50 p-2 text-xs text-black">
                                RBA: {item.rba?.noDokumen}
                                <br />
                                Tanggal:{' '}
                                {format(
                                    String(item.rba?.tglDokumen),
                                    'dd MMMM yyyy',
                                    { locale: id }
                                )}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="flex gap-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">
                                            Aksi{' '}
                                            <FiChevronsDown className="ml-2" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="start">
                                        <Link
                                            to={`/anggaran/dba/penetapan/${item.id}/edit`}
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
                                                    deleteDba.mutate(item.id)
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
            {dba.isSuccess && dba.data?.length === 0 && (
                <div className="col-span-3">Tidak ada data</div>
            )}
            {dba.isError && (
                <div className="col-span-3">{dba.error.message}</div>
            )}
        </div>
    )
}
