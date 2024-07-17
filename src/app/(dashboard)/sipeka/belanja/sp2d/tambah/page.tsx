import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import CreateForm from './form'
import { api } from '@/trpc/react'
import { formatTanggal } from '@/lib/utils'

export default function Page() {
    const latest = api.sp2d.getLatest.useQuery()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Buat Dokumen SP2D</CardTitle>
                <CardDescription>
                    Form untuk menambah dokumen SP2D Belanja
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-5">
                    <div className="w-full max-w-md">
                        <CreateForm />
                    </div>
                    <div className="w-1/2">
                        {latest.data && (
                            <Card className="flex flex-row">
                                <CardHeader className="pr-0">
                                    <img src="/images/icons/idea.png" />
                                </CardHeader>
                                <CardHeader>
                                    <CardDescription className="font-semibold">
                                        Data SP2D Terakhir
                                    </CardDescription>
                                    <CardTitle>
                                        {latest.data.noDokumen}
                                    </CardTitle>
                                    <CardDescription>
                                        tanggal{' '}
                                        {formatTanggal(latest.data.tglDokumen)}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
