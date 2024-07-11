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
    const recentData = api.belanja.getLatest.useQuery()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Rekam Belanja Baru</CardTitle>
                <CardDescription>
                    Form untuk rekam realisasi belanja baru
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
                                        Data Belanja Terakhir
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
