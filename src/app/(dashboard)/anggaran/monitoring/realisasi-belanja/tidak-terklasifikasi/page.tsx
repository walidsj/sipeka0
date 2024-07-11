import Loading from '@/components/loading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { formatAngka, formatTanggal } from '@/lib/utils'
import { api } from '@/trpc/react'

export default function Page() {
    const {
        data: unclassifiedBelanja,
        isLoading,
        error,
        isError,
    } = api.belanja.getUnclassifiedBelanjaByRba.useQuery()

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    if (!unclassifiedBelanja) {
        return <div>Data tidak ditemukan</div>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="mb-3">
                    Belanja Tidak Terklasifikasi dalam RBA
                </CardTitle>
                <div className="rounded-xl bg-red-100 p-3 text-red-500">
                    <CardTitle className="mb-3 font-bold">Perhatian!</CardTitle>
                    <ul className="list-disc pl-4">
                        <li>
                            Belanja tidak terklasifikasi dalam RBA ini muncul
                            disebabkan oleh proses pergeseran dengan
                            penghapusan/penambahan baru mata belanja (rencana
                            belanja) yang tidak disertai pemindahan belanja yang
                            telah terealisasi.
                        </li>
                        <li>
                            Belanja-belanja berikut perlu untuk reklasifikasi ke
                            mata belanja (rencana belanja) baru sesuai dengan
                            RBA yang aktif saat ini.
                        </li>
                        <li>
                            <strong>
                                Jika terdapat belanja yang tidak terklasifikasi,
                                maka akan muncul selisih antara realisasi
                                belanja monitoring & realisasi keuangan secara
                                akuntansi
                            </strong>
                        </li>
                    </ul>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No.</TableHead>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Mata Rencana Belanja</TableHead>
                            <TableHead className="text-center">
                                Nomor Dokumen
                            </TableHead>
                            <TableHead>Uraian</TableHead>
                            <TableHead className="text-right">Jumlah</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {unclassifiedBelanja.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell className="text-center font-semibold">
                                    {index + 1}.
                                </TableCell>
                                <TableCell className="font-semibold">
                                    {formatTanggal(item.tglDokumen)}
                                </TableCell>
                                <TableCell>
                                    <p className="font-semibold">
                                        {item.rab?.uraian}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {item.rab?.kodeRekening}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {item.rekening?.uraian}
                                    </p>
                                </TableCell>
                                <TableCell className="text-center font-semibold">
                                    {item.noDokumen}
                                </TableCell>
                                <TableCell className="font-semibold">
                                    {item.uraian}
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                    {formatAngka(item.jumlah)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5}>Total</TableCell>
                            <TableCell className="text-right">
                                {formatAngka(
                                    unclassifiedBelanja.reduce(
                                        (acc, item) =>
                                            acc + Number(item.jumlah),
                                        0
                                    )
                                )}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardContent>
        </Card>
    )
}
