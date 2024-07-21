import { Link, Outlet } from 'react-router-dom'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { api } from '@/trpc/react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function Layout() {
    const rbaMonitoring = api.dba.getRbaBelanjaMonitoring.useQuery()
    const unclassifiedBelanja =
        api.belanja.getUnclassifiedBelanjaByRba.useQuery()

    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardHeader>
                    <CardTitle>Monitoring Realisasi Belanja</CardTitle>
                    <CardDescription>
                        Rincian realisasi belanja berdasarkan DBA
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
                                        No. {rbaMonitoring.data?.noDokumen},
                                        tanggal{' '}
                                        {format(
                                            String(
                                                rbaMonitoring.data?.tglDokumen
                                            ),
                                            'dd MMMM yyyy',
                                            { locale: id }
                                        )}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </CardContent>
                )}
                <nav className="mb-3 w-full border-b px-6">
                    <ul className="flex">
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn('h-12 rounded-none')}
                            >
                                <Link to="realisasi-belanja">Realisasi</Link>
                            </Button>
                        </li>
                        <li>
                            <Button
                                asChild
                                variant="ghost"
                                className={cn('h-12 rounded-none')}
                            >
                                <Link to="realisasi-belanja/tidak-terklasifikasi">
                                    Belanja Tidak Terklasifikasi
                                    {unclassifiedBelanja.data &&
                                        unclassifiedBelanja.data?.length >
                                            0 && (
                                            <span className="ml-2 rounded-full bg-red-500 px-2 text-sm text-white">
                                                {
                                                    unclassifiedBelanja.data
                                                        ?.length
                                                }
                                            </span>
                                        )}
                                </Link>
                            </Button>
                        </li>
                    </ul>
                </nav>
                <Outlet />
            </Card>
        </div>
    )
}
