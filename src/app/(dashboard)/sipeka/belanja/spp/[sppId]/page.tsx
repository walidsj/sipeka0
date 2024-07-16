import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Link, useParams } from 'react-router-dom'
import { api } from '@/trpc/react'
import Loading from '@/components/loading'

import NotFound from '@/app/not-found'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { formatTanggal } from '@/lib/utils'

export default function EditPage() {
    const params = useParams<{ sppId: string }>()

    const {
        data: spp,
        isError,
        isLoading,
    } = api.spp.getById.useQuery(Number(params.sppId))

    if (isLoading) return <Loading />

    if (isError) return <NotFound />

    if (!spp) return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Detail SPP</CardTitle>
                <CardDescription>Data untuk detail SPP</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row items-center gap-4">
                    <img src="/images/icons/research.png" className="h-16" />
                    <div>
                        <CardDescription>Dokumen SPP</CardDescription>
                        <CardTitle>{spp.noDokumen}</CardTitle>
                        <CardDescription>
                            tanggal {formatTanggal(spp.tglDokumen)}
                        </CardDescription>
                    </div>
                </div>
            </CardContent>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableHead>Surat Pengantar</TableHead>
                            <TableCell>
                                <Button asChild>
                                    <Link to={`cetak-surat-pengantar`}>
                                        Lihat
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>
                                Surat Permintaan Pembayaran (SPP)
                            </TableHead>
                            <TableCell>
                                <Button asChild>
                                    <Link to={`cetak-spp`}>Lihat</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>
                                Surat Permintaan Pembayaran (SPP) Rincian
                            </TableHead>
                            <TableCell>
                                <Button asChild>
                                    <Link to={`cetak-spp-rincian`}>Lihat</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
