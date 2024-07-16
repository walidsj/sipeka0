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
    const params = useParams<{ spmId: string }>()

    const {
        data: spm,
        isError,
        isLoading,
    } = api.spm.getById.useQuery(Number(params.spmId))

    if (isLoading) return <Loading />

    if (isError) return <NotFound />

    if (!spm) return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Detail SPM</CardTitle>
                <CardDescription>Data untuk detail SPM</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row items-center gap-4">
                    <img src="/images/icons/research.png" className="h-16" />
                    <div>
                        <CardDescription>Dokumen SPM</CardDescription>
                        <CardTitle>{spm.noDokumen}</CardTitle>
                        <CardDescription>
                            tanggal {formatTanggal(spm.tglDokumen)}
                        </CardDescription>
                    </div>
                </div>
            </CardContent>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableHead>
                                Surat Pernyataan Tanggung Jawab Mutlak (SPTJM)
                            </TableHead>
                            <TableCell>
                                <Button asChild>
                                    <Link to={`cetak-sptjm`}>Lihat</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Surat Perintah Membayar (SPM)</TableHead>
                            <TableCell>
                                <Button asChild>
                                    <Link to={`cetak-spm`}>Lihat</Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
