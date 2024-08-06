import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { formatAngkaDecimal } from '@/lib/utils'
import { api } from '@/trpc/react'

export default function Page() {
    const tna = api.tool.getTransaksiNonAnggaranSipd.useQuery()

    if (tna.isLoading)
        return <div>Mengambil data dari sipd.kemendagri.go.id...</div>

    if (!tna.data) return <div>Data not found</div>

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Daftar TNA</CardTitle>
                    <CardDescription>
                        Transaksi Non Anggaran yang sudah diinput
                    </CardDescription>
                </div>
                <Button onClick={() => tna.refetch()} disabled={tna.isFetching}>
                    {tna.isFetching ? 'Memuat...' : 'Refresh'}
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Nomor & Deskripsi</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Jurnal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableHeader>
                        <TableRow>
                            <TableHead colSpan={3}>
                                Total Terinput ({tna.data.length} Jurnal)
                            </TableHead>
                            <TableHead className="text-right">
                                {formatAngkaDecimal(
                                    tna.data.reduce(
                                        (acc, item) =>
                                            acc +
                                            item.detail.reduce(
                                                (acc, d) =>
                                                    d.position == 'kredit'
                                                        ? acc + d.amount
                                                        : acc,
                                                0
                                            ),
                                        0
                                    ) / 2
                                )}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tna.data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="text-nowrap">
                                    {item.journal_date}
                                </TableCell>
                                <TableCell>
                                    <p className="text-sm">
                                        {item.journal_number}
                                    </p>
                                    <p className="mt-5 font-semibold">
                                        {item.description}
                                    </p>
                                </TableCell>
                                <TableCell>{item.nama_jurnal_status}</TableCell>
                                <TableCell>
                                    <Table className="text-xs">
                                        <TableBody>
                                            {item.detail.map((d) => (
                                                <TableRow key={d.id}>
                                                    <TableCell>
                                                        {d.code}
                                                    </TableCell>
                                                    <TableCell>
                                                        {d.name}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {d.position ==
                                                            'debet' &&
                                                            formatAngkaDecimal(
                                                                d.amount
                                                            )}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        {d.position ==
                                                            'kredit' &&
                                                            formatAngkaDecimal(
                                                                d.amount
                                                            )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableHead colSpan={3}>Total</TableHead>
                            <TableCell className="text-right">
                                {formatAngkaDecimal(
                                    tna.data.reduce(
                                        (acc, item) =>
                                            acc +
                                            item.detail.reduce(
                                                (acc, d) =>
                                                    d.position == 'kredit'
                                                        ? acc + d.amount
                                                        : acc,
                                                0
                                            ),
                                        0
                                    ) / 2
                                )}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardContent>
        </Card>
    )
}
