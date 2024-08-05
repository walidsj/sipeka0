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
import { formatAngkaDecimal, formatTanggal } from '@/lib/utils'
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

    const { data: saldoAwalRekeningBankPenerimaan } =
        api.rekeningKoran.getSaldoByDate.useQuery(
            {
                // tglTransaksi: new Date(sp3b?.tglMulai ?? new Date()),
                // sp3b.tglMulai minus 1 day
                tglTransaksi: new Date(
                    new Date(sp3b?.tglMulai ?? new Date()).setDate(
                        new Date(sp3b?.tglMulai ?? new Date()).getDate() - 1
                    )
                ),
                rekeningBankId: 1,
            },
            {
                enabled: !!sp3b,
            }
        )

    const { data: saldoAkhirRekeningBankPenerimaan } =
        api.rekeningKoran.getSaldoByDate.useQuery(
            {
                tglTransaksi: new Date(sp3b?.tglSelesai ?? new Date()),
                rekeningBankId: 1,
            },
            {
                enabled: !!sp3b,
            }
        )

    const { data: saldoAwalRekeningBankPengeluaran } =
        api.rekeningKoran.getSaldoByDate.useQuery(
            {
                tglTransaksi: new Date(
                    new Date(sp3b?.tglMulai ?? new Date()).setDate(
                        new Date(sp3b?.tglMulai ?? new Date()).getDate() - 1
                    )
                ),
                rekeningBankId: 2,
            },
            {
                enabled: !!sp3b,
            }
        )

    const { data: saldoAkhirRekeningBankPengeluaran } =
        api.rekeningKoran.getSaldoByDate.useQuery(
            {
                tglTransaksi: new Date(sp3b?.tglSelesai ?? new Date()),
                rekeningBankId: 2,
            },
            {
                enabled: !!sp3b,
            }
        )

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
                <Table className="text-xs">
                    <TableBody>
                        <TableRow>
                            <TableHead>Periode</TableHead>
                            <TableCell className="text-right">
                                {formatTanggal(sp3b.tglMulai)} -{' '}
                                {formatTanggal(sp3b.tglSelesai)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead colSpan={2}>
                                Saldo Bank Bendahara Penerimaan
                            </TableHead>
                        </TableRow>
                        <TableRow>
                            <TableCell>Saldo Awal</TableCell>
                            <TableCell className="text-right">
                                {formatAngkaDecimal(
                                    saldoAwalRekeningBankPenerimaan?.saldo ?? 0
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Perubahan Saldo</TableCell>
                            <TableCell className="text-right">
                                {formatAngkaDecimal(
                                    (saldoAkhirRekeningBankPenerimaan?.saldo ??
                                        0) -
                                        (saldoAwalRekeningBankPenerimaan?.saldo ??
                                            0)
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Saldo Akhir</TableCell>
                            <TableCell className="text-right">
                                {formatAngkaDecimal(
                                    saldoAkhirRekeningBankPenerimaan?.saldo ?? 0
                                )}
                            </TableCell>
                        </TableRow>

                        <TableRow>
                            <TableHead colSpan={2}>
                                Saldo Bank Bendahara Pengeluaran
                            </TableHead>
                        </TableRow>
                        <TableRow>
                            <TableCell>Saldo Awal</TableCell>
                            <TableCell className="text-right">
                                {formatAngkaDecimal(
                                    saldoAwalRekeningBankPengeluaran?.saldo ?? 0
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Perubahan Saldo</TableCell>
                            <TableCell className="text-right">
                                {formatAngkaDecimal(
                                    (saldoAkhirRekeningBankPengeluaran?.saldo ??
                                        0) -
                                        (saldoAwalRekeningBankPengeluaran?.saldo ??
                                            0)
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Saldo Akhir</TableCell>
                            <TableCell className="text-right">
                                {formatAngkaDecimal(
                                    saldoAkhirRekeningBankPengeluaran?.saldo ??
                                        0
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead colSpan={2}>Saldo SP3B</TableHead>
                        </TableRow>
                        <TableRow>
                            <TableCell>Saldo Awal</TableCell>
                            <TableCell className="text-right">
                                {formatAngkaDecimal(sp3b.saldoAwal)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Perubahan Saldo</TableCell>
                            <TableCell className="text-right">
                                {formatAngkaDecimal(
                                    sp3b.pendapatan.total -
                                        (sp3b.belanja.pegawai +
                                            sp3b.belanja.barjas +
                                            sp3b.belanja.modal)
                                )}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Saldo Akhir</TableCell>
                            <TableCell className="text-right">
                                {formatAngkaDecimal(
                                    sp3b.saldoAwal +
                                        sp3b.pendapatan.total -
                                        (sp3b.belanja.pegawai +
                                            sp3b.belanja.barjas +
                                            sp3b.belanja.modal)
                                )}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
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
