import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { api } from '@/trpc/react'
import lodash from 'lodash'
import React from 'react'
import { FiChevronsDown, FiEdit, FiList } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

export default function MonitoringTable() {
    const rbaMonitoring = api.dba.getRbaBelanjaMonitoring.useQuery(undefined, { suspense: true })

    const realisasiMonitoring = api.dba.getRealisasiBelanjaMonitoring.useQuery(undefined, { suspense: true })

    let totalPagu = 0
    let totalRealisasi = 0

    return (
        <React.Fragment>
            <Table className="border-collapse border">
                <TableHeader>
                    <TableRow>
                        <TableHead
                            rowSpan={2}
                            className="w-1 border text-center"
                        >
                            Kode Rekening
                        </TableHead>
                        <TableHead rowSpan={2} className="border text-center">
                            Uraian
                        </TableHead>
                        <TableHead className="border text-center" colSpan={3}>
                            Rincian Perhitungan Anggaran
                        </TableHead>
                        <TableHead rowSpan={2} className="border text-center">
                            Jumlah Pagu
                        </TableHead>
                        <TableHead colSpan={2} className="border text-center">
                            Realisasi
                        </TableHead>
                        <TableHead rowSpan={2} className="border text-center">
                            Sisa Anggaran
                        </TableHead>
                    </TableRow>
                    <TableRow>
                        <TableHead className="border text-center">
                            Volume
                        </TableHead>
                        <TableHead className="border text-center">
                            Satuan
                        </TableHead>
                        <TableHead className="border text-center">
                            Harga Satuan
                        </TableHead>
                        <TableHead className="border text-center">
                            Keuangan
                        </TableHead>
                        <TableHead className="border text-center">
                            (%)
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rbaMonitoring.data?.aktivitas.map((aktivitas) => (
                        <React.Fragment key={aktivitas.id}>
                            <TableRow className="bg-blue-50 font-semibold hover:bg-blue-100">
                                <TableCell className="border">
                                    {aktivitas.kode}
                                </TableCell>
                                <TableCell className="border" colSpan={4}>
                                    {aktivitas.nama}
                                </TableCell>
                                <TableCell className="border text-right">
                                    {aktivitas.rincianRbaBelanja
                                        .reduce(
                                            (acc, item) =>
                                                acc +
                                                Number(
                                                    Number(item.volume) *
                                                        Number(item.harga)
                                                ),
                                            0
                                        )
                                        .toLocaleString('id-ID')}
                                </TableCell>
                                <TableCell className="border text-right">
                                    {realisasiMonitoring.data
                                        ?.filter((item) =>
                                            aktivitas.rincianRbaBelanja
                                                .map((rincian) => rincian.rabId)
                                                .includes(item.id)
                                        )
                                        .reduce(
                                            (acc, item) =>
                                                acc + Number(item.jumlah),
                                            0
                                        )
                                        .toLocaleString('id-ID')}
                                </TableCell>
                                <TableCell className="border text-right">
                                    {
                                        // menghitung persentase realisasi
                                        Number(
                                            (Number(
                                                realisasiMonitoring.data
                                                    ?.filter((item) =>
                                                        aktivitas.rincianRbaBelanja
                                                            .map(
                                                                (rincian) =>
                                                                    rincian.rabId
                                                            )
                                                            .includes(item.id)
                                                    )
                                                    .reduce(
                                                        (acc, item) =>
                                                            acc +
                                                            Number(item.jumlah),
                                                        0
                                                    ) ?? 0
                                            ) /
                                                aktivitas.rincianRbaBelanja.reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        Number(
                                                            Number(
                                                                item.volume
                                                            ) *
                                                                Number(
                                                                    item.harga
                                                                )
                                                        ),
                                                    0
                                                )) *
                                                100
                                        ).toLocaleString('id-ID', {
                                            maximumFractionDigits: 2,
                                        })
                                    }
                                </TableCell>
                                <TableCell className="border text-right">
                                    {Number(
                                        Number(
                                            aktivitas.rincianRbaBelanja.reduce(
                                                (acc, item) =>
                                                    acc +
                                                    Number(
                                                        Number(item.volume) *
                                                            Number(item.harga)
                                                    ),
                                                0
                                            )
                                        ) -
                                            Number(
                                                realisasiMonitoring.data
                                                    ?.filter((item) =>
                                                        aktivitas.rincianRbaBelanja
                                                            .map(
                                                                (rincian) =>
                                                                    rincian.rabId
                                                            )
                                                            .includes(item.id)
                                                    )
                                                    .reduce(
                                                        (acc, item) =>
                                                            acc +
                                                            Number(item.jumlah),
                                                        0
                                                    ) ?? 0
                                            )
                                    ).toLocaleString('id-ID')}
                                </TableCell>
                            </TableRow>
                            {Object.keys(
                                lodash
                                    .chain(aktivitas.rincianRbaBelanja)
                                    .groupBy((item) => item.rab?.kodeRekening)
                                    .value()
                            ).map((key) => (
                                <React.Fragment key={key}>
                                    <TableRow className="bg-yellow-50 hover:bg-yellow-100">
                                        <TableCell className="border font-semibold">
                                            {key}
                                        </TableCell>
                                        <TableCell
                                            className="border font-semibold"
                                            colSpan={4}
                                        >
                                            {
                                                realisasiMonitoring.data?.find(
                                                    (item) => {
                                                        return (
                                                            item.kodeRekening ===
                                                            key
                                                        )
                                                    }
                                                )?.rekening?.uraian
                                            }
                                        </TableCell>
                                        <TableCell className="border text-right font-semibold">
                                            {lodash
                                                .chain(
                                                    aktivitas.rincianRbaBelanja
                                                )
                                                .groupBy(
                                                    (item) =>
                                                        item.rab?.kodeRekening
                                                )
                                                .value()
                                                [key].reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        Number(
                                                            Number(
                                                                item.volume
                                                            ) *
                                                                Number(
                                                                    item.harga
                                                                )
                                                        ),
                                                    0
                                                )
                                                .toLocaleString('id-ID')}
                                        </TableCell>
                                        <TableCell className="border text-right font-semibold">
                                            {realisasiMonitoring?.data
                                                ?.filter(
                                                    (item) =>
                                                        item.kodeRekening ===
                                                            key &&
                                                        lodash
                                                            .chain(
                                                                aktivitas.rincianRbaBelanja
                                                            )
                                                            .groupBy(
                                                                (item) =>
                                                                    item.rab
                                                                        ?.kodeRekening
                                                            )
                                                            .value()
                                                            [key].map(
                                                                (rincian) =>
                                                                    rincian.rabId
                                                            )
                                                            .includes(item.id)
                                                )
                                                .reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        Number(item.jumlah),
                                                    0
                                                )
                                                .toLocaleString('id-ID')}
                                        </TableCell>
                                        <TableCell className="border text-right font-semibold">
                                            {Number(
                                                Number(
                                                    Number(
                                                        realisasiMonitoring?.data
                                                            ?.filter(
                                                                (item) =>
                                                                    item.kodeRekening ===
                                                                        key &&
                                                                    lodash
                                                                        .chain(
                                                                            aktivitas.rincianRbaBelanja
                                                                        )
                                                                        .groupBy(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item
                                                                                    .rab
                                                                                    ?.kodeRekening
                                                                        )
                                                                        .value()
                                                                        [
                                                                            key
                                                                        ].map(
                                                                            (
                                                                                rincian
                                                                            ) =>
                                                                                rincian.rabId
                                                                        )
                                                                        .includes(
                                                                            item.id
                                                                        )
                                                            )
                                                            .reduce(
                                                                (acc, item) =>
                                                                    acc +
                                                                    Number(
                                                                        item.jumlah
                                                                    ),
                                                                0
                                                            ) ?? 0
                                                    ) /
                                                        lodash
                                                            .chain(
                                                                aktivitas.rincianRbaBelanja
                                                            )
                                                            .groupBy(
                                                                (item) =>
                                                                    item.rab
                                                                        ?.kodeRekening
                                                            )
                                                            .value()
                                                            [key].reduce(
                                                                (acc, item) =>
                                                                    acc +
                                                                    Number(
                                                                        Number(
                                                                            item.volume
                                                                        ) *
                                                                            Number(
                                                                                item.harga
                                                                            )
                                                                    ),
                                                                0
                                                            )
                                                ) * 100
                                            ).toLocaleString('id-ID', {
                                                maximumFractionDigits: 2,
                                            })}
                                        </TableCell>
                                        <TableCell className="border text-right font-semibold">
                                            {Number(
                                                Number(
                                                    lodash
                                                        .chain(
                                                            aktivitas.rincianRbaBelanja
                                                        )
                                                        .groupBy(
                                                            (item) =>
                                                                item.rab
                                                                    ?.kodeRekening
                                                        )
                                                        .value()
                                                        [key].reduce(
                                                            (acc, item) =>
                                                                acc +
                                                                Number(
                                                                    Number(
                                                                        item.volume
                                                                    ) *
                                                                        Number(
                                                                            item.harga
                                                                        )
                                                                ),
                                                            0
                                                        )
                                                ) -
                                                    Number(
                                                        realisasiMonitoring?.data
                                                            ?.filter(
                                                                (item) =>
                                                                    item.kodeRekening ===
                                                                        key &&
                                                                    lodash
                                                                        .chain(
                                                                            aktivitas.rincianRbaBelanja
                                                                        )
                                                                        .groupBy(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item
                                                                                    .rab
                                                                                    ?.kodeRekening
                                                                        )
                                                                        .value()
                                                                        [
                                                                            key
                                                                        ].map(
                                                                            (
                                                                                rincian
                                                                            ) =>
                                                                                rincian.rabId
                                                                        )
                                                                        .includes(
                                                                            item.id
                                                                        )
                                                            )
                                                            .reduce(
                                                                (acc, item) =>
                                                                    acc +
                                                                    Number(
                                                                        item.jumlah
                                                                    ),
                                                                0
                                                            ) ?? 0
                                                    )
                                            ).toLocaleString('id-ID')}
                                        </TableCell>
                                    </TableRow>
                                    {lodash
                                        .chain(aktivitas.rincianRbaBelanja)
                                        .groupBy(
                                            (item) => item.rab?.kodeRekening
                                        )
                                        .value()
                                        [key].map((rincian) => {
                                            totalPagu =
                                                totalPagu +
                                                Number(
                                                    Number(rincian.volume) *
                                                        Number(rincian.harga)
                                                )

                                            totalRealisasi =
                                                totalRealisasi +
                                                Number(
                                                    realisasiMonitoring.data?.find(
                                                        (item) => {
                                                            return (
                                                                item.id ===
                                                                rincian.rabId
                                                            )
                                                        }
                                                    )?.jumlah
                                                )

                                            return (
                                                <TableRow
                                                    key={rincian.id}
                                                    className={cn(
                                                        Number(
                                                            Number(
                                                                rincian.volume
                                                            ) *
                                                                Number(
                                                                    rincian.harga
                                                                ) -
                                                                Number(
                                                                    realisasiMonitoring.data?.find(
                                                                        (
                                                                            item
                                                                        ) => {
                                                                            return (
                                                                                item.id ===
                                                                                rincian.rabId
                                                                            )
                                                                        }
                                                                    )?.jumlah
                                                                )
                                                        ) < 0 &&
                                                            'bg-red-50 text-red-500 hover:bg-red-100'
                                                    )}
                                                >
                                                    <TableCell className="border">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger
                                                                asChild
                                                            >
                                                                <Button
                                                                    variant="outline"
                                                                    className="text-foreground"
                                                                >
                                                                    Aksi{' '}
                                                                    <FiChevronsDown className="ml-2" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="start">
                                                                <Link
                                                                    to={`${rincian.id}/detail-belanja`}
                                                                >
                                                                    <DropdownMenuItem>
                                                                        <FiList className="mr-2" />
                                                                        Detail
                                                                        Belanja
                                                                    </DropdownMenuItem>
                                                                </Link>
                                                                <Link
                                                                    to={`${rincian.id}/edit`}
                                                                >
                                                                    <DropdownMenuItem>
                                                                        <FiEdit className="mr-2" />
                                                                        Edit
                                                                        Pagu
                                                                    </DropdownMenuItem>
                                                                </Link>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </TableCell>
                                                    <TableCell className="border">
                                                        <p className="font-medium">
                                                            {
                                                                rincian.rab
                                                                    ?.uraian
                                                            }
                                                        </p>
                                                        {rincian.rab
                                                            ?.spesifikasi && (
                                                            <p className="text-xs text-gray-500">
                                                                {
                                                                    rincian.rab
                                                                        ?.spesifikasi
                                                                }
                                                            </p>
                                                        )}
                                                        <Progress
                                                            className="mt-3 h-1"
                                                            value={Number(
                                                                (Number(
                                                                    realisasiMonitoring.data?.find(
                                                                        (
                                                                            item
                                                                        ) => {
                                                                            return (
                                                                                item.id ===
                                                                                rincian.rabId
                                                                            )
                                                                        }
                                                                    )?.jumlah
                                                                ) /
                                                                    Number(
                                                                        Number(
                                                                            rincian.volume
                                                                        ) *
                                                                            Number(
                                                                                rincian.harga
                                                                            )
                                                                    )) *
                                                                    100
                                                            )}
                                                        />
                                                    </TableCell>
                                                    <TableCell className="border text-center">
                                                        {Number(
                                                            rincian.volume
                                                        ).toLocaleString(
                                                            'id-ID'
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="border text-center">
                                                        {rincian.satuan}
                                                    </TableCell>
                                                    <TableCell className="border text-right">
                                                        {Number(
                                                            rincian.harga
                                                        ).toLocaleString(
                                                            'id-ID'
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="border text-right font-medium">
                                                        {Number(
                                                            Number(
                                                                rincian.volume
                                                            ) *
                                                                Number(
                                                                    rincian.harga
                                                                )
                                                        ).toLocaleString(
                                                            'id-ID'
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="border text-right font-medium">
                                                        {Number(
                                                            realisasiMonitoring.data?.find(
                                                                (item) => {
                                                                    return (
                                                                        item.id ===
                                                                        rincian.rabId
                                                                    )
                                                                }
                                                            )?.jumlah
                                                        ).toLocaleString(
                                                            'id-ID'
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="border text-right">
                                                        {Number(
                                                            (Number(
                                                                realisasiMonitoring.data?.find(
                                                                    (item) => {
                                                                        return (
                                                                            item.id ===
                                                                            rincian.rabId
                                                                        )
                                                                    }
                                                                )?.jumlah
                                                            ) /
                                                                Number(
                                                                    Number(
                                                                        rincian.volume
                                                                    ) *
                                                                        Number(
                                                                            rincian.harga
                                                                        )
                                                                )) *
                                                                100
                                                        ).toLocaleString(
                                                            'id-ID',
                                                            {
                                                                maximumFractionDigits: 2,
                                                            }
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="border text-right font-medium">
                                                        {Number(
                                                            Number(
                                                                rincian.volume
                                                            ) *
                                                                Number(
                                                                    rincian.harga
                                                                ) -
                                                                Number(
                                                                    realisasiMonitoring.data?.find(
                                                                        (
                                                                            item
                                                                        ) => {
                                                                            return (
                                                                                item.id ===
                                                                                rincian.rabId
                                                                            )
                                                                        }
                                                                    )?.jumlah
                                                                )
                                                        ).toLocaleString(
                                                            'id-ID'
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="bg-gray-50">
                        <TableCell
                            className="border text-right font-semibold"
                            colSpan={5}
                        >
                            Total
                        </TableCell>
                        <TableCell className="border text-right font-semibold">
                            {totalPagu.toLocaleString('id-ID')}
                        </TableCell>
                        <TableCell className="border text-right font-semibold">
                            {totalRealisasi.toLocaleString('id-ID')}
                        </TableCell>
                        <TableCell className="border text-right font-semibold">
                            {Number(
                                (totalRealisasi / totalPagu) * 100
                            ).toLocaleString('id-ID', {
                                maximumFractionDigits: 2,
                            })}
                            %
                        </TableCell>
                        <TableCell className="border text-right font-semibold">
                            {Number(totalPagu - totalRealisasi).toLocaleString(
                                'id-ID'
                            )}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </React.Fragment>
    )
}
