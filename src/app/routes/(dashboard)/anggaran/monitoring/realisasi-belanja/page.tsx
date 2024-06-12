import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { api } from '@/web/trpc/react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import MonitoringTable from './table'

export default function Page() {
    const rbaMonitoring = api.dba.getRbaBelanjaMonitoring.useQuery()

    return (
        <Card>
            <CardHeader>
                <CardTitle>Monitoring Realisasi Anggaran</CardTitle>
                <CardDescription>
                    Rincian realisasi anggaran berdasarkan DBA
                </CardDescription>
            </CardHeader>
            {rbaMonitoring.data && (
                <CardContent>
                    <Card>
                        <CardHeader className="flex flex-row gap-5">
                            <img
                                src="/images/icons/contract.png"
                                className="h-20 w-20"
                            />
                            <div className="flex flex-col gap-1">
                                <CardDescription>
                                    RBA yang Aktif Saat Ini
                                </CardDescription>
                                <CardTitle>
                                    {rbaMonitoring.data?.uraian}
                                </CardTitle>
                                <CardDescription>
                                    No. {rbaMonitoring.data?.noDokumen}, tanggal{' '}
                                    {format(
                                        String(rbaMonitoring.data?.tglDokumen),
                                        'dd MMMM yyyy',
                                        { locale: id }
                                    )}
                                </CardDescription>
                            </div>
                        </CardHeader>
                    </Card>
                </CardContent>
            )}

            <CardContent>
                <MonitoringTable />
            </CardContent>
        </Card>
    )
}
