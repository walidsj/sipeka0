import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { Link, Navigate, useParams } from 'react-router-dom'
import { api } from '@/web/trpc/react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@/web/components/ui/table'
import { cn, formatAngka, formatTanggal } from '@/web/lib/utils'
import Loading from '@/web/components/loading'
import React from 'react'
import { Badge } from '@/web/components/ui/badge'
import { Button } from '@/web/components/ui/button'
import { FiCopy, FiPlus } from 'react-icons/fi'
import toast from 'react-hot-toast'
import PotonganTable from './table'

export default function EditPage() {
    const params = useParams<{ belanjaId: string }>()

    const {
        data: belanja,
        isError,
        isLoading,
    } = api.belanja.getById.useQuery(Number(params.belanjaId))

    if (isLoading) return <Loading />

    if (isError) return <Navigate to={`/belanja/perekaman`} replace />

    if (!belanja) return <Navigate to={`/belanja/perekaman`} replace />

    function handleCopy(text: string | null | undefined) {
        if (!text) return toast.error('Tidak ada data yang bisa di-copy')

        navigator.clipboard.writeText(text)

        toast.success(`"${text}" berhasil dicopy`)
    }

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
                            <TableCell className="w-1" />
                        </TableRow>
                        <TableRow>
                            <TableHead>Nomor Dokumen</TableHead>
                            <TableCell>{belanja.noDokumen}</TableCell>
                            <TableCell>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() =>
                                        handleCopy(belanja.noDokumen)
                                    }
                                >
                                    <FiCopy />
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Tanggal Dokumen</TableHead>
                            <TableCell>
                                {formatTanggal(belanja.tglDokumen)}
                            </TableCell>
                            <TableCell />
                        </TableRow>
                        <TableRow>
                            <TableHead>Uraian</TableHead>
                            <TableCell>{belanja.uraian}</TableCell>
                            <TableCell>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() => handleCopy(belanja.uraian)}
                                >
                                    <FiCopy />
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Jumlah</TableHead>
                            <TableCell>{formatAngka(belanja.jumlah)}</TableCell>
                            <TableCell>
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-8 w-8"
                                    onClick={() =>
                                        handleCopy(
                                            Number(belanja.jumlah).toString()
                                        )
                                    }
                                >
                                    <FiCopy />
                                </Button>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableHead>Metode Pembayaran</TableHead>
                            <TableCell>
                                <Badge
                                    className={cn(
                                        belanja.metodePembayaran === 'TUNAI' &&
                                            'bg-green-500',
                                        belanja.metodePembayaran ===
                                            'TRANSFER' && 'bg-blue-500'
                                    )}
                                >
                                    {belanja.metodePembayaran}
                                </Badge>
                            </TableCell>
                            <TableCell />
                        </TableRow>
                        {belanja.rekanan && (
                            <React.Fragment>
                                <TableRow>
                                    <TableHead>Nama Rekanan</TableHead>
                                    <TableCell>
                                        {belanja.rekanan.nama}
                                    </TableCell>
                                    <TableCell />
                                </TableRow>
                                <TableRow>
                                    <TableHead>NPWP Rekanan</TableHead>
                                    <TableCell>
                                        {belanja.rekanan.npwp}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-8 w-8"
                                            onClick={() =>
                                                handleCopy(
                                                    belanja.rekanan?.npwp
                                                )
                                            }
                                        >
                                            <FiCopy />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Rekening Bank</TableHead>
                                    <TableCell>
                                        <p>{belanja.rekanan.bank?.nama}</p>
                                        <p>{belanja.rekanan.bank?.kode}</p>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-8 w-8"
                                            onClick={() =>
                                                handleCopy(
                                                    belanja.rekanan?.bank?.kode
                                                )
                                            }
                                        >
                                            <FiCopy />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Nama di Rekening</TableHead>
                                    <TableCell>
                                        {belanja.rekanan.namaRekening}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-8 w-8"
                                            onClick={() =>
                                                handleCopy(
                                                    belanja.rekanan
                                                        ?.namaRekening
                                                )
                                            }
                                        >
                                            <FiCopy />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Nomor Rekening</TableHead>
                                    <TableCell>
                                        {belanja.rekanan.noRekening}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-8 w-8"
                                            onClick={() =>
                                                handleCopy(
                                                    belanja.rekanan?.noRekening
                                                )
                                            }
                                        >
                                            <FiCopy />
                                        </Button>
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
                                    <TableCell />
                                </TableRow>
                                <TableRow>
                                    <TableHead>Rekening Bank</TableHead>
                                    <TableCell>
                                        <p>{belanja.pegawai.bank?.nama}</p>
                                        <p>{belanja.pegawai.bank?.kode}</p>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-8 w-8"
                                            onClick={() =>
                                                handleCopy(
                                                    belanja.pegawai?.bank?.kode
                                                )
                                            }
                                        >
                                            <FiCopy />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Nama di Rekening</TableHead>
                                    <TableCell>
                                        {belanja.pegawai.namaRekening}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-8 w-8"
                                            onClick={() =>
                                                handleCopy(
                                                    belanja.pegawai
                                                        ?.namaRekening
                                                )
                                            }
                                        >
                                            <FiCopy />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Nomor Rekening</TableHead>
                                    <TableCell>
                                        {belanja.pegawai.noRekening}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="icon"
                                            variant="outline"
                                            className="h-8 w-8"
                                            onClick={() =>
                                                handleCopy(
                                                    belanja.pegawai?.noRekening
                                                )
                                            }
                                        >
                                            <FiCopy />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </React.Fragment>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <div className="mb-5 flex flex-row items-center justify-between px-6 pt-6">
                <CardHeader className="p-0">
                    <CardTitle>Potongan Belanja</CardTitle>
                    <CardDescription>
                        Daftar rincian potongan belanja
                    </CardDescription>
                </CardHeader>
                <Button asChild>
                    <Link
                        to={`/belanja/perekaman/${params.belanjaId}/potongan/tambah`}
                    >
                        <FiPlus className="mr-2" />
                        Tambah
                    </Link>
                </Button>
            </div>
            <CardContent>
                <PotonganTable />
            </CardContent>
        </Card>
    )
}
