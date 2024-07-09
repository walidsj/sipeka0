import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import CreateForm from './form'
import { api } from '@/web/trpc/react'
import { formatTanggal } from '@/web/lib/utils'

export default function Page() {
    const recentData = api.lpjBelanja.getLatest.useQuery()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Rekam Lpj Belanja Baru</CardTitle>
                <CardDescription>
                    Form untuk rekam realisasi lpj Belanja baru
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-5">
                    <div className="w-full max-w-md">
                        <CreateForm />
                    </div>
                    <div className="w-1/2">
                        {recentData.data && (
                            <Card className="flex flex-row">
                                <CardHeader className="pr-0">
                                    <img src="/images/icons/idea.png" />
                                </CardHeader>
                                <CardHeader>
                                    <CardDescription className="font-semibold">
                                        Data Lpj Belanja Terakhir
                                    </CardDescription>
                                    <CardTitle>
                                        {recentData.data.noDokumen}
                                    </CardTitle>
                                    <CardDescription>
                                        {recentData.data.uraian}
                                    </CardDescription>
                                    <CardDescription>
                                        tanggal{' '}
                                        {formatTanggal(
                                            recentData.data.tglDokumen
                                        )}
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
