import { Button } from '@/components/ui/button'
import {
    Card,
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
import { formatAngka } from '@/lib/utils'
import { api } from '@/trpc/react'
import React from 'react'

export default function Page() {
    const tna = api.tool.getTransaksiNonAnggaranSipd.useQuery()

    if (tna.isLoading)
        return <div>Mengambil data dari sipd.kemendagri.go.id...</div>

    if (!tna.data) return <div>Data not found</div>

    if (tna.error) return <div>Error: {tna.error.message}</div>

    return (
        <React.Fragment>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Daftar TNA</CardTitle>
                        <CardDescription>
                            Transaksi Non Anggaran yang sudah diinput
                        </CardDescription>
                    </div>
                    <Button
                        onClick={() => tna.refetch()}
                        disabled={tna.isFetching}
                    >
                        {tna.isFetching ? 'Memuat...' : 'Refresh'}
                    </Button>
                </CardHeader>
            </Card>
            <Card className="mt-5">
                <CardHeader>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableHead colSpan={2}>Rekapitulasi</TableHead>
                            </TableRow>
                            <TableRow>
                                <TableCell>Belanja Pegawai BLUD</TableCell>
                                <TableCell className="text-right">
                                    {formatAngka(
                                        tna.data.reduce(
                                            (acc, item) =>
                                                acc +
                                                item.detail.reduce(
                                                    (acc, d) =>
                                                        d.code.startsWith(
                                                            '5.1.01'
                                                        )
                                                            ? acc + d.amount
                                                            : acc,
                                                    0
                                                ),
                                            0
                                        )
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    Belanja Barang dan Jasa BLUD
                                </TableCell>
                                <TableCell className="text-right">
                                    {formatAngka(
                                        tna.data.reduce(
                                            (acc, item) =>
                                                acc +
                                                item.detail.reduce(
                                                    (acc, d) =>
                                                        d.code.startsWith(
                                                            '5.1.02'
                                                        )
                                                            ? acc + d.amount
                                                            : acc,
                                                    0
                                                ),
                                            0
                                        )
                                    )}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Belanja Modal BLUD</TableCell>
                                <TableCell className="text-right">
                                    {formatAngka(
                                        tna.data.reduce(
                                            (acc, item) =>
                                                acc +
                                                item.detail.reduce(
                                                    (acc, d) =>
                                                        d.code.startsWith('5.2')
                                                            ? acc + d.amount
                                                            : acc,
                                                    0
                                                ),
                                            0
                                        )
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardHeader>
            </Card>
            <Card className="mt-5">
                <CardHeader>
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
                                    {formatAngka(
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
                                    <TableCell>
                                        {item.nama_jurnal_status}
                                    </TableCell>
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
                                                                formatAngka(
                                                                    d.amount
                                                                )}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {d.position ==
                                                                'kredit' &&
                                                                formatAngka(
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
                                    {formatAngka(
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
                </CardHeader>
            </Card>
        </React.Fragment>
    )
}
