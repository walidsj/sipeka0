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
import { formatTanggal } from '@/lib/utils'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import NotFound from '@/app/not-found'

export default function Page() {
    const params = useParams<{ sp3bId: string }>()

    const {
        data: sp3b,
        isError,
        isLoading,
    } = api.sp3b.getById.useQuery(Number(params.sp3bId))

    if (isLoading) return <Loading />

    if (isError) return <NotFound />

    if (!sp3b) return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Detail SP3B</CardTitle>
                <CardDescription>
                    Data untuk detail Surat Perintah Pengesahan Pendapatan dan
                    Belanja
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row items-center gap-4">
                    <img src="/images/icons/research.png" className="h-16" />
                    <div>
                        <CardDescription>Dokumen SP3B</CardDescription>
                        <CardTitle>{sp3b.noDokumen}</CardTitle>
                        <CardDescription>
                            tanggal {formatTanggal(sp3b.tglDokumen)}
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
                                Surat Pernyataan Tanggung Jawab (SPTJB) -
                                Belanja
                            </TableHead>
                            <TableCell>
                                <Button asChild>
                                    <Link to={`cetak-sptjb-belanja`}>
                                        Lihat
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>
                                Surat Pernyataan Tanggung Jawab (SPTJB) -
                                Pendapatan
                            </TableHead>
                            <TableCell>
                                <Button asChild>
                                    <Link to={`cetak-sptjb-pendapatan`}>
                                        Lihat
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>SP3B</TableHead>
                            <TableCell>
                                <Button asChild>
                                    <Link to={`cetak-sp3b`}>Lihat</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
