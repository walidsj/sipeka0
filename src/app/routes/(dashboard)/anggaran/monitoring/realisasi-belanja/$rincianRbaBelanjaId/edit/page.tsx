import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { Navigate, useParams } from 'react-router-dom'
import EditForm from './form'
import { api } from '@/web/trpc/react'
import { FiChevronsRight } from 'react-icons/fi'
import { Label } from '@/web/components/ui/label'
import { Input } from '@/web/components/ui/input'

export default function EditPage() {
    const params = useParams<{
        rincianRbaBelanjaId: string
    }>()

    const rincianRbaBelanja = api.rincianRbaBelanja.getById.useQuery(
        parseInt(params.rincianRbaBelanjaId ?? '')
    )

    if (
        (rincianRbaBelanja.isSuccess && !rincianRbaBelanja.data) ||
        rincianRbaBelanja.isError
    )
        return (
            <Navigate to={`/anggaran/monitoring/realisasi-belanja`} replace />
        )

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <CardTitle>Edit Pagu</CardTitle>
                <CardDescription>
                    Akses cepat untuk mengubah data pagu
                </CardDescription>
            </div>
            <div className="flex flex-row gap-5">
                <Card className="max-w-lg">
                    <CardHeader>
                        <div className="space-y-1">
                            <Label>Satuan</Label>
                            <Input
                                disabled
                                value={
                                    rincianRbaBelanja.data?.satuan ?? undefined
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Volume</Label>
                            <Input
                                disabled
                                value={
                                    Number(
                                        rincianRbaBelanja.data?.volume
                                    ).toLocaleString('id-ID') ?? undefined
                                }
                            />
                        </div>
                        <div className="space-y-1">
                            <Label>Harga</Label>
                            <Input
                                disabled
                                value={`Rp ${
                                    Number(
                                        rincianRbaBelanja.data?.harga
                                    ).toLocaleString('id-ID') ?? undefined
                                }`}
                            />
                        </div>
                        <div className="text-right">
                            <Label>Jumlah</Label>
                            <p className="text-lg font-semibold">
                                {Number(
                                    Number(rincianRbaBelanja.data?.volume) *
                                        Number(rincianRbaBelanja.data?.harga)
                                ).toLocaleString('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                })}
                            </p>
                        </div>
                    </CardHeader>
                </Card>
                <div>
                    <FiChevronsRight className="text-7xl text-gray-400" />
                    <div className="text-center text-gray-400">Menjadi</div>
                </div>
                {rincianRbaBelanja.isSuccess && rincianRbaBelanja.data && (
                    <EditForm data={rincianRbaBelanja.data} />
                )}
            </div>
        </div>
    )
}
