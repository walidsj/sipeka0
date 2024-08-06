import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { cn, formatAngka } from '@/lib/utils'
import { api } from '@/trpc/react'
import { format } from 'date-fns'
import React from 'react'
import toast from 'react-hot-toast'
import { FiCheck, FiLoader, FiSend, FiX } from 'react-icons/fi'
import { useSearchParams } from 'react-router-dom'

export default function Page() {
    const [searchParams, setSearchParams] = useSearchParams({
        jurnalStatus: '',
        tglStart: '',
        tglEnd: '',
    })

    const tna = api.tool.getTransaksiNonAnggaranSipd.useQuery({
        jurnalStatus: searchParams.get('jurnalStatus')
            ? Number(searchParams.get('jurnalStatus'))
            : 2,
        tglStart: searchParams.get('tglStart')
            ? format(new Date(searchParams.get('tglStart') || ''), 'yyyy-MM-dd')
            : format(new Date(), 'yyyy-MM-01'),
        tglEnd: searchParams.get('tglEnd')
            ? format(new Date(searchParams.get('tglEnd') || ''), 'yyyy-MM-dd')
            : format(new Date(), 'yyyy-MM-dd'),
    })

    const belanja = api.belanja.getAll.useQuery({
        page: 1,
        pageSize: 999999,
        startDate: searchParams.get('tglStart')
            ? new Date(searchParams.get('tglStart')!)
            : undefined,
        endDate: searchParams.get('tglEnd')
            ? new Date(searchParams.get('tglEnd')!)
            : undefined,
    })

    function handleCopy(text: string | null | undefined) {
        if (!text) return toast.error('Tidak ada data yang bisa di-copy')

        navigator.clipboard.writeText(text)

        toast.success(`"${text}" berhasil dicopy`)
    }

    return (
        <React.Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>Daftar TNA</CardTitle>
                    <CardDescription>
                        Transaksi Non Anggaran yang sudah diinput
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-5">
                        <div className="flex gap-2">
                            <Input
                                value={
                                    searchParams.get('tglStart') ||
                                    format(new Date(), 'yyyy-MM-01')
                                }
                                type="date"
                                onChange={(e) => {
                                    searchParams.set('tglStart', e.target.value)
                                    setSearchParams(searchParams)
                                }}
                            />
                            <Input
                                type="date"
                                value={
                                    searchParams.get('tglEnd') ||
                                    format(new Date(), 'yyyy-MM-dd')
                                }
                                onChange={(e) => {
                                    searchParams.set('tglEnd', e.target.value)
                                    setSearchParams(searchParams)
                                }}
                            />
                            <select
                                onChange={(e) => {
                                    searchParams.set(
                                        'jurnalStatus',
                                        e.target.value
                                    )
                                    setSearchParams(searchParams)
                                }}
                            >
                                <option value="0">Semua</option>
                                <option value="2">Belum Approve/Reject</option>
                                <option value="3">Approved</option>
                                <option value="4">Rejected</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <Button
                            onClick={() => tna.refetch()}
                            disabled={tna.isFetching}
                        >
                            {tna.isFetching ? (
                                <React.Fragment>
                                    <FiLoader className="mr-2 animate-spin" />{' '}
                                    Refresh Data SIPD...
                                </React.Fragment>
                            ) : (
                                'Refresh Data SIPD'
                            )}
                        </Button>
                        <span className="text-xs italic text-gray-500">
                            Terakhir fetch:{' '}
                            {format(
                                new Date(tna.dataUpdatedAt),
                                'yyyy-MM-dd HH:mm:ss'
                            )}
                        </span>
                    </div>
                </CardContent>
            </Card>
            {tna.isLoading && (
                <Card className="mt-5">
                    <CardHeader>
                        <FiLoader className="h-10 w-10 animate-spin" />
                        Memuat data dari sipd.kemendagri.go.id...
                    </CardHeader>
                </Card>
            )}
            {!tna.isLoading && tna.data && (
                <React.Fragment>
                    <Card className="mt-5">
                        <CardHeader>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableHead colSpan={3}>
                                            Rekapitulasi SIPD (Total:{' '}
                                            {tna.data.length})
                                        </TableHead>
                                    </TableRow>
                                    {Array.from(
                                        tna.data.reduce((acc, item) => {
                                            item.detail?.forEach((d) => {
                                                acc.add(d.name)
                                            })
                                            return acc
                                        }, new Set<string>())
                                    ).map((name) => (
                                        <TableRow key={name}>
                                            <TableCell>{name}</TableCell>
                                            <TableCell className="text-right">
                                                {tna.data &&
                                                    formatAngka(
                                                        tna.data
                                                            .map((item) =>
                                                                item.detail?.reduce(
                                                                    (acc, d) =>
                                                                        d.name ===
                                                                            name &&
                                                                        d.position ===
                                                                            'debet'
                                                                            ? acc +
                                                                              d.amount
                                                                            : acc,
                                                                    0
                                                                )
                                                            )
                                                            .reduce(
                                                                (acc, amount) =>
                                                                    acc +
                                                                    amount,
                                                                0
                                                            )
                                                    )}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {tna.data &&
                                                    formatAngka(
                                                        tna.data
                                                            .map((item) =>
                                                                item.detail?.reduce(
                                                                    (acc, d) =>
                                                                        d.name ===
                                                                            name &&
                                                                        d.position ===
                                                                            'kredit'
                                                                            ? acc +
                                                                              d.amount
                                                                            : acc,
                                                                    0
                                                                )
                                                            )
                                                            .reduce(
                                                                (acc, amount) =>
                                                                    acc +
                                                                    amount,
                                                                0
                                                            )
                                                    )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableHead colSpan={3}>
                                            Rekapitulasi BKU (Total:{' '}
                                            {belanja.data?.data.length})
                                        </TableHead>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Belanja Pegawai BLUD
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {belanja.data &&
                                                formatAngka(
                                                    belanja.data.data
                                                        .filter((item) =>
                                                            item.rab?.kodeRekening?.startsWith(
                                                                '5.1.01'
                                                            )
                                                        )
                                                        .reduce(
                                                            (acc, item) =>
                                                                acc +
                                                                Number(
                                                                    item.jumlah
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
                                            {belanja.data &&
                                                formatAngka(
                                                    belanja.data.data
                                                        .filter((item) =>
                                                            item.rab?.kodeRekening?.startsWith(
                                                                '5.1.02'
                                                            )
                                                        )
                                                        .reduce(
                                                            (acc, item) =>
                                                                acc +
                                                                Number(
                                                                    item.jumlah
                                                                ),
                                                            0
                                                        )
                                                )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            Belanja Modal BLUD
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {belanja.data &&
                                                formatAngka(
                                                    belanja.data.data
                                                        .filter((item) =>
                                                            item.rab?.kodeRekening?.startsWith(
                                                                '5.2'
                                                            )
                                                        )
                                                        .reduce(
                                                            (acc, item) =>
                                                                acc +
                                                                Number(
                                                                    item.jumlah
                                                                ),
                                                            0
                                                        )
                                                )}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-semibold">
                                            Total
                                        </TableCell>
                                        <TableCell className="text-right font-semibold">
                                            {belanja.data &&
                                                formatAngka(
                                                    belanja.data.data.reduce(
                                                        (acc, item) =>
                                                            acc +
                                                            Number(item.jumlah),
                                                        0
                                                    )
                                                )}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card className="mt-5">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Integrasi Data</CardTitle>
                                <CardDescription>
                                    Perbandingan Data SIPD dengan SIPEKA Atmaku
                                </CardDescription>
                            </div>
                            <div className="flex flex-col">
                                <Button
                                    onClick={() => tna.refetch()}
                                    disabled={tna.isFetching}
                                >
                                    {tna.isFetching ? (
                                        <React.Fragment>
                                            <FiLoader className="mr-2 animate-spin" />{' '}
                                            Refresh Data SIPD...
                                        </React.Fragment>
                                    ) : (
                                        'Refresh Data SIPD'
                                    )}
                                </Button>
                                <span className="text-xs italic text-gray-500">
                                    Terakhir fetch:{' '}
                                    {format(
                                        new Date(tna.dataUpdatedAt),
                                        'yyyy-MM-dd HH:mm:ss'
                                    )}
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No.</TableHead>
                                        <TableHead>Tanggal</TableHead>
                                        <TableHead>Nomor</TableHead>
                                        <TableHead>Uraian</TableHead>
                                        <TableHead>Kode Rekening</TableHead>
                                        <TableHead>Nominal</TableHead>
                                        <TableHead>Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                {belanja.data && (
                                    <TableBody className="text-xs">
                                        {belanja.data.data.map((item, i) => (
                                            <React.Fragment key={item.id}>
                                                <TableRow className="h-1 border-y-2 border-black"></TableRow>
                                                <TableRow
                                                    className={cn(
                                                        tna.data &&
                                                            tna.data.filter(
                                                                (t) =>
                                                                    t.journal_date ===
                                                                        format(
                                                                            new Date(
                                                                                item.tglDokumen ||
                                                                                    ''
                                                                            ),
                                                                            'yyyy-MM-dd'
                                                                        ) &&
                                                                    t.description.trim() ===
                                                                        item.uraian?.trim()
                                                            ).length === 1
                                                            ? 'bg-green-50'
                                                            : 'bg-red-50',
                                                        'font-semibold'
                                                    )}
                                                >
                                                    <TableCell
                                                        className="text-center"
                                                        rowSpan={
                                                            tna.data &&
                                                            tna.data.filter(
                                                                (t) =>
                                                                    t.journal_date ===
                                                                        format(
                                                                            new Date(
                                                                                item.tglDokumen ||
                                                                                    ''
                                                                            ),
                                                                            'yyyy-MM-dd'
                                                                        ) &&
                                                                    t.description.trim() ===
                                                                        item.uraian?.trim()
                                                            )?.length + 1
                                                        }
                                                    >
                                                        {i + 1}
                                                    </TableCell>
                                                    <TableCell
                                                        className="text-nowrap"
                                                        rowSpan={
                                                            tna.data &&
                                                            tna.data.find(
                                                                (t) =>
                                                                    t.journal_date ===
                                                                        format(
                                                                            new Date(
                                                                                item.tglDokumen ||
                                                                                    ''
                                                                            ),
                                                                            'yyyy-MM-dd'
                                                                        ) &&
                                                                    t.description.trim() ===
                                                                        item.uraian?.trim()
                                                            )
                                                                ? 2
                                                                : 1
                                                        }
                                                    >
                                                        {format(
                                                            new Date(
                                                                item.tglDokumen ||
                                                                    ''
                                                            ),
                                                            'yyyy-MM-dd'
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.noDokumen}
                                                        <p className="mt-3 italic">
                                                            {item.rab?.kodeRekening?.startsWith(
                                                                '5.1.01'
                                                            ) &&
                                                                'Belanja Pegawai BLUD'}
                                                            {item.rab?.kodeRekening?.startsWith(
                                                                '5.1.02'
                                                            ) &&
                                                                'Belanja Barang dan Jasa BLUD'}
                                                            {item.rab?.kodeRekening?.startsWith(
                                                                '5.2'
                                                            ) &&
                                                                'Belanja Modal BLUD'}
                                                        </p>
                                                    </TableCell>
                                                    <TableCell>
                                                        <button
                                                            className="text-left hover:underline"
                                                            onClick={() =>
                                                                handleCopy(
                                                                    item.uraian
                                                                )
                                                            }
                                                        >
                                                            {item.uraian}
                                                        </button>
                                                    </TableCell>
                                                    <TableCell>
                                                        {item.rab?.kodeRekening}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <button
                                                            className="text-left hover:underline"
                                                            onClick={() =>
                                                                handleCopy(
                                                                    Number(
                                                                        item.jumlah
                                                                    ).toString()
                                                                )
                                                            }
                                                        >
                                                            {formatAngka(
                                                                item.jumlah
                                                            )}
                                                        </button>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex flex-col">
                                                            <Button
                                                                size="sm"
                                                                onClick={() => {
                                                                    if (
                                                                        confirm(
                                                                            'Yakin kirim SIPD?'
                                                                        )
                                                                    ) {
                                                                        return toast.success(
                                                                            'Berhasil kirim SIPD'
                                                                        )
                                                                    }
                                                                }}
                                                            >
                                                                <FiSend className="mr-2" />{' '}
                                                                Kirim SIPD
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                {tna.data &&
                                                    tna.data
                                                        .filter(
                                                            (t) =>
                                                                t.journal_date ===
                                                                    format(
                                                                        new Date(
                                                                            item.tglDokumen ||
                                                                                ''
                                                                        ),
                                                                        'yyyy-MM-dd'
                                                                    ) &&
                                                                t.description.trim() ===
                                                                    item.uraian?.trim()
                                                        )
                                                        .map((t) => (
                                                            <TableRow>
                                                                <TableCell>
                                                                    {
                                                                        t.journal_number
                                                                    }
                                                                    <p className="mt-3 italic">
                                                                        {t.journal_status_id ===
                                                                        2
                                                                            ? ' (Belum Approve/Reject)'
                                                                            : t.journal_status_id ===
                                                                                3
                                                                              ? ' (Approved)'
                                                                              : t.journal_status_id ===
                                                                                  4
                                                                                ? ' (Rejected)'
                                                                                : ''}
                                                                    </p>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {
                                                                        t.description
                                                                    }
                                                                </TableCell>
                                                                <TableCell
                                                                    colSpan={2}
                                                                >
                                                                    <Table className="text-xs">
                                                                        <TableBody>
                                                                            {t.detail.map(
                                                                                (
                                                                                    d
                                                                                ) => (
                                                                                    <TableRow
                                                                                        key={
                                                                                            d.id
                                                                                        }
                                                                                    >
                                                                                        <TableCell>
                                                                                            {
                                                                                                d.code
                                                                                            }
                                                                                        </TableCell>
                                                                                        <TableCell>
                                                                                            {
                                                                                                d.name
                                                                                            }
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
                                                                                )
                                                                            )}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <div className="flex flex-col gap-2">
                                                                        <Button
                                                                            size="sm"
                                                                            className="h-5 bg-green-500"
                                                                            onClick={() => {
                                                                                if (
                                                                                    confirm(
                                                                                        'Yakin approve jurnal ini?'
                                                                                    )
                                                                                ) {
                                                                                    return toast.success(
                                                                                        'Berhasil approve'
                                                                                    )
                                                                                }
                                                                            }}
                                                                        >
                                                                            <FiCheck className="mr-1" />
                                                                            Approve
                                                                        </Button>
                                                                        <Button
                                                                            size="sm"
                                                                            className="h-5 bg-red-500"
                                                                            onClick={() => {
                                                                                if (
                                                                                    confirm(
                                                                                        'Yakin reject jurnal ini?'
                                                                                    )
                                                                                ) {
                                                                                    return toast.success(
                                                                                        'Berhasil reject'
                                                                                    )
                                                                                }
                                                                            }}
                                                                        >
                                                                            <FiX className="mr-1" />
                                                                            Reject
                                                                        </Button>
                                                                    </div>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                            </React.Fragment>
                                        ))}
                                    </TableBody>
                                )}
                            </Table>
                        </CardContent>
                    </Card>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}
