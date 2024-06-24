import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { Navigate, useParams } from 'react-router-dom'
import { api } from '@/web/trpc/react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/web/components/ui/table'
import { formatAngka, formatTanggal } from '@/web/lib/utils'
import Loading from '@/web/components/loading'
import React from 'react'

export default function EditPage() {
    const params = useParams<{ belanjaId: string }>()

    const {
        data: belanja,
        isError,
        isLoading,
    } = api.belanja.getById.useQuery(Number(params.belanjaId))

    if (isLoading) return <Loading />

    if (isError) return <Navigate to={`/anggaran/belanja/perekaman`} replace />

    if (!belanja) return <Navigate to={`/anggaran/belanja/perekaman`} replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Detail Belanja</CardTitle>
                <CardDescription>Data untuk detail belanja</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableHead className="w-60">
                                Kode Rekening
                            </TableHead>
                            <TableCell>
                                <p>{belanja.rab?.kodeRekening}</p>
                                <p className="text-sm text-slate-500">
                                    {belanja.rab?.uraian}
                                </p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Nomor Dokumen</TableHead>
                            <TableCell>{belanja.noDokumen}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Tanggal Dokumen</TableHead>
                            <TableCell>
                                {formatTanggal(belanja.tglDokumen)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Uraian</TableHead>
                            <TableCell>{belanja.uraian}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Jumlah</TableHead>
                            <TableCell>{formatAngka(belanja.jumlah)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Metode Pembayaran</TableHead>
                            <TableCell>{belanja.metodePembayaran}</TableCell>
                        </TableRow>
                        {belanja.rekanan && (
                            <React.Fragment>
                                <TableRow>
                                    <TableHead>Nama Rekanan</TableHead>
                                    <TableCell>
                                        {belanja.rekanan.nama}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>NPWP Rekanan</TableHead>
                                    <TableCell>
                                        {belanja.rekanan.npwp}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Rekening Bank</TableHead>
                                    <TableCell>
                                        <p>{belanja.rekanan.bank?.nama}</p>
                                        <p>{belanja.rekanan.bank?.kode}</p>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Nama di Rekening</TableHead>
                                    <TableCell>
                                        {belanja.rekanan.namaRekening}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Nomor Rekening</TableHead>
                                    <TableCell>
                                        {belanja.rekanan.noRekening}
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        )}
                        {belanja.pegawai && (
                            <React.Fragment>
                                <TableRow>
                                    <TableHead>Pegawai</TableHead>
                                    <TableCell>
                                        {belanja.pegawai?.nama}
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Jenis Potongan</TableHead>
                            <TableHead>Kode Billing</TableHead>
                            <TableHead>Kode NTPN</TableHead>
                            <TableHead>Nominal</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>
            </CardContent>
        </Card>
    )
}
