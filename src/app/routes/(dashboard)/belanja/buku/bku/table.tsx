import Loading from '@/web/components/loading'
import { Button } from '@/web/components/ui/button'
import { CardFooter } from '@/web/components/ui/card'
import { Input } from '@/web/components/ui/input'
import { TableCell, TableRow } from '@/web/components/ui/table'
import {
    formatAngka,
    formatAngkaDecimal,
    formatTanggal,
    terbilang,
} from '@/web/lib/utils'
import { api } from '@/web/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import { format } from 'date-fns'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

export default function BkuTable() {
    const [searchParams, setSearchParams] = useSearchParams({
        startDate: '',
        endDate: '',
    })

    const componentRef = React.useRef(null)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const {
        isLoading,
        isError,
        error,
        data: jurnal,
    } = api.belanja.getBelanjaBku.useQuery(
        {
            startDate: searchParams.get('startDate')
                ? new Date(searchParams.get('startDate')!)
                : undefined,
            endDate: searchParams.get('endDate')
                ? new Date(searchParams.get('endDate')!)
                : undefined,
        },
        { placeholderData: keepPreviousData }
    )

    if (isLoading) {
        return <Loading />
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    if (!jurnal) {
        return <div>Data tidak dapat dimuat.</div>
    }

    let saldoPenerimaan = 0
    let saldoPengeluaran = 0

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center gap-5">
                <div className="flex gap-2">
                    <Input
                        value={searchParams.get('startDate') || ''}
                        type="date"
                        onChange={(e) => {
                            searchParams.set('page', '1')
                            searchParams.set('startDate', e.target.value)
                            setSearchParams(searchParams)
                        }}
                    />
                    <Input
                        type="date"
                        value={searchParams.get('endDate') || ''}
                        onChange={(e) => {
                            searchParams.set('page', '1')
                            searchParams.set('endDate', e.target.value)
                            setSearchParams(searchParams)
                        }}
                    />
                </div>
            </div>
            <div className="rounded-md border shadow">
                <div
                    style={{
                        fontSize: '8.5pt',
                    }}
                    className="px-10 py-10 leading-4"
                    ref={componentRef}
                >
                    <style type="text/css" media="print">
                        {`
                            @page {
                                size: landscape; 
                            }
                        `}
                    </style>
                    <table className="mt-3 w-full">
                        <tr>
                            <td className="w-16 font-serif">
                                <img
                                    src="/images/logo-kaltimprov.webp"
                                    className="h-20 w-24"
                                />
                            </td>
                            <td className="text-center">
                                <div
                                    style={{ fontSize: '12pt' }}
                                    className="font-serif font-bold uppercase"
                                >
                                    Pemerintah Provinsi Kalimantan Timur
                                </div>
                                <div
                                    style={{ fontSize: '14pt' }}
                                    className="font-serif font-bold uppercase"
                                >
                                    Dinas Kesehatan
                                </div>
                                <div className="font-serif text-lg font-bold uppercase">
                                    Rumah Sakit Jiwa Daerah Atma Husada Mahakam
                                </div>
                                <div className="font-serif">
                                    Jl. Kakap No. 23 Samarinda Telp (0541)
                                    743364 Fax 741035
                                </div>
                                <div className="font-serif">
                                    Website: rsjdahm.kaltimprov.go.id | Posel:
                                    rsjdahm@kaltimprov.go.id
                                </div>
                            </td>
                            <td className="w-16"></td>
                        </tr>
                    </table>
                    <hr className="mb-5 mt-3 border-b-4 border-double border-black" />
                    <h5
                        style={{ fontSize: '12pt' }}
                        className="text-center font-serif font-bold uppercase underline"
                    >
                        BUKU KAS UMUM PENGELUARAN BLUD
                    </h5>
                    <h4
                        style={{ fontSize: '10pt' }}
                        className="mb-4 text-center font-serif font-bold uppercase"
                    >
                        BENDAHARA PENGELUARAN PEMBANTU
                    </h4>
                    <h6 className="text-center font-serif uppercase">
                        Tahun Anggaran 2024
                    </h6>
                    <h6 className="mb-5 text-center font-serif">
                        Periode{' '}
                        {formatTanggal(
                            searchParams.get('startDate') ||
                                format(new Date(), 'yyyy-MM-01')
                        )}{' '}
                        s.d.{' '}
                        {formatTanggal(
                            searchParams.get('endDate') || new Date()
                        )}
                    </h6>
                    <table className="my-5 w-full">
                        <thead className="border-b-2 border-double border-black">
                            <tr>
                                <th className="w-1 border border-black px-2 py-3 text-center font-serif">
                                    No
                                </th>
                                <th className="border border-black px-2 py-3 text-center font-serif">
                                    Tanggal
                                </th>
                                <th className="w-10 border border-black px-2 py-3 text-center font-serif">
                                    Nomor Bukti
                                </th>
                                <th className="border border-black px-2 py-3 text-center font-serif">
                                    Kode Rekening
                                </th>
                                <th className="border border-black px-2 py-3 font-serif">
                                    Uraian
                                </th>
                                <th className="border border-black px-2 py-3 font-serif">
                                    Penerimaan
                                </th>
                                <th className="border border-black px-2 py-3 font-serif">
                                    Pengeluaran
                                </th>
                                <th className="border border-black px-2 py-3 font-serif">
                                    Saldo
                                </th>
                            </tr>
                        </thead>
                        <tbody className="border-b-2 border-double border-black">
                            {jurnal.data.map((item, index) => {
                                saldoPenerimaan += item.penerimaan || 0
                                saldoPengeluaran += item.pengeluaran || 0
                                return (
                                    <>
                                        <tr key={index}>
                                            <td className="border border-black px-2 py-1 text-center font-serif">
                                                {item.no}
                                            </td>
                                            <td className="border border-black px-2 py-1 text-center font-serif">
                                                {item.tgl &&
                                                    Intl.DateTimeFormat(
                                                        'id-ID',
                                                        {
                                                            day: '2-digit',
                                                            month: '2-digit',
                                                            year: 'numeric',
                                                        }
                                                    ).format(item.tgl!)}
                                            </td>
                                            <td className="border border-black px-2 py-1 text-center font-serif">
                                                {item.noDokumen}
                                            </td>
                                            <td className="border border-black px-2 py-1 text-center font-serif">
                                                {item.kodeRekening}
                                            </td>
                                            <td className="border border-black px-2 py-1 font-serif">
                                                {item.uraian}
                                            </td>
                                            <td className="border border-black px-2 py-1 text-right font-serif">
                                                {item.penerimaan !== null &&
                                                    formatAngka(
                                                        item.penerimaan
                                                    )}
                                            </td>
                                            <td className="border border-black px-2 py-1 text-right font-serif">
                                                {item.pengeluaran !== null &&
                                                    formatAngka(
                                                        item.pengeluaran
                                                    )}
                                            </td>
                                            <td className="border border-black px-2 py-1 text-right font-serif">
                                                {formatAngka(item.saldo)}
                                            </td>
                                        </tr>
                                    </>
                                )
                            })}
                            {jurnal.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={100}
                                        className="text-center"
                                    >
                                        Tidak ada data
                                    </TableCell>
                                </TableRow>
                            )}
                            <tr className="border-t-2 border-double border-black">
                                <td
                                    colSpan={100}
                                    className="border border-black px-2 py-2 text-left font-serif font-bold"
                                >
                                    Total
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={5}
                                    className="border-l border-black px-2 py-1 text-left font-serif"
                                >
                                    Jumlah periode Ini
                                </td>
                                <td className="px-2 py-1 text-right font-serif">
                                    {formatAngka(saldoPenerimaan)}
                                </td>
                                <td className="px-2 py-1 text-right font-serif">
                                    {formatAngka(saldoPengeluaran)}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={5}
                                    className="border-l border-black px-2 py-1 text-left font-serif"
                                >
                                    Jumlah yang lalu (per tanggal{' '}
                                    {Intl.DateTimeFormat('id-ID', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    }).format(
                                        new Date(
                                            searchParams.get('startDate') ||
                                                format(new Date(), 'yyyy-MM-01')
                                        ).getTime() -
                                            24 * 60 * 60 * 1000
                                    )}
                                    )
                                </td>
                                <td className="px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        jurnal.meta.totalLastPeriode
                                            .penerimaan +
                                            jurnal.meta.totalLastPeriode
                                                .potongan
                                    )}
                                </td>
                                <td className="px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        jurnal.meta.totalLastPeriode
                                            .pengeluaran +
                                            jurnal.meta.totalLastPeriode
                                                .potongan
                                    )}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={5}
                                    className="border-l border-black px-2 py-1 text-left font-serif"
                                >
                                    Jumlah sampai dengan saat ini
                                </td>
                                <td className="border-b border-black px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        saldoPenerimaan +
                                            jurnal.meta.totalLastPeriode
                                                .penerimaan +
                                            jurnal.meta.totalLastPeriode
                                                .potongan
                                    )}
                                </td>
                                <td className="border-b border-black px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        saldoPengeluaran +
                                            jurnal.meta.totalLastPeriode
                                                .pengeluaran +
                                            jurnal.meta.totalLastPeriode
                                                .potongan
                                    )}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={5}
                                    className="border-l border-black px-2 py-1 text-left font-serif"
                                >
                                    Sisa kas
                                </td>
                                <td className="px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        saldoPenerimaan +
                                            jurnal.meta.totalLastPeriode
                                                .penerimaan +
                                            jurnal.meta.totalLastPeriode
                                                .potongan -
                                            (saldoPengeluaran +
                                                jurnal.meta.totalLastPeriode
                                                    .pengeluaran +
                                                jurnal.meta.totalLastPeriode
                                                    .potongan)
                                    )}
                                </td>
                                <td></td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr className="border-t-2 border-double border-black">
                                <td
                                    colSpan={100}
                                    className="border border-black px-2 py-2 text-left font-serif font-bold"
                                >
                                    Dikurangi Jurnal Pemotongan/Penyetoran Pajak
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={5}
                                    className="border-l border-black px-2 py-1 text-left font-serif"
                                >
                                    Jumlah pemotongan/penyetoran periode ini
                                </td>
                                <td className="px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        jurnal.meta.totalThisPeriode.potongan
                                    )}
                                </td>
                                <td className="px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        jurnal.meta.totalThisPeriode.potongan
                                    )}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={5}
                                    className="border-l border-black px-2 py-1 text-left font-serif"
                                >
                                    Jumlah periode Ini
                                </td>
                                <td className="px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        saldoPenerimaan -
                                            jurnal.meta.totalThisPeriode
                                                .potongan
                                    )}
                                </td>
                                <td className="px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        saldoPengeluaran -
                                            jurnal.meta.totalThisPeriode
                                                .potongan
                                    )}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={5}
                                    className="border-l border-black px-2 py-1 text-left font-serif"
                                >
                                    Jumlah pemotongan/penyetoran yang lalu (per
                                    tanggal{' '}
                                    {Intl.DateTimeFormat('id-ID', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    }).format(
                                        new Date(
                                            searchParams.get('startDate') ||
                                                format(new Date(), 'yyyy-MM-01')
                                        ).getTime() -
                                            24 * 60 * 60 * 1000
                                    )}
                                    )
                                </td>
                                <td className="px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        jurnal.meta.totalLastPeriode.potongan
                                    )}
                                </td>
                                <td className="px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        jurnal.meta.totalLastPeriode.potongan
                                    )}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={5}
                                    className="border-l border-black px-2 py-1 text-left font-serif"
                                >
                                    Jumlah yang lalu (per tanggal{' '}
                                    {Intl.DateTimeFormat('id-ID', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    }).format(
                                        new Date(
                                            searchParams.get('startDate') ||
                                                format(new Date(), 'yyyy-MM-01')
                                        ).getTime() -
                                            24 * 60 * 60 * 1000
                                    )}
                                    )
                                </td>
                                <td className="px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        jurnal.meta.totalLastPeriode.penerimaan
                                    )}
                                </td>
                                <td className="px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        jurnal.meta.totalLastPeriode.pengeluaran
                                    )}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>

                            <tr>
                                <td
                                    colSpan={5}
                                    className="border-l border-black px-2 py-1 text-left font-serif"
                                >
                                    Jumlah sampai dengan saat ini
                                </td>
                                <td className="border-b border-black px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        saldoPenerimaan +
                                            jurnal.meta.totalLastPeriode
                                                .penerimaan -
                                            jurnal.meta.totalThisPeriode
                                                .potongan
                                    )}
                                </td>
                                <td className="border-b border-black px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        saldoPengeluaran +
                                            jurnal.meta.totalLastPeriode
                                                .pengeluaran -
                                            jurnal.meta.totalThisPeriode
                                                .potongan
                                    )}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={5}
                                    className="border-l border-black px-2 py-1 text-left font-serif"
                                >
                                    Sisa kas
                                </td>
                                <td className="px-2 py-1 text-right font-serif">
                                    {formatAngka(
                                        saldoPenerimaan +
                                            jurnal.meta.totalLastPeriode
                                                .penerimaan -
                                            jurnal.meta.totalThisPeriode
                                                .potongan -
                                            (saldoPengeluaran +
                                                jurnal.meta.totalLastPeriode
                                                    .pengeluaran -
                                                jurnal.meta.totalThisPeriode
                                                    .potongan)
                                    )}
                                </td>
                                <td></td>
                                <td className="border-r border-black"></td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="mt-5 font-serif">
                        Pada hari ini tanggal{' '}
                        {terbilang(
                            Number(
                                format(
                                    searchParams.get('endDate') || new Date(),
                                    'd'
                                )
                            )
                        )}{' '}
                        bulan Februari tahun{' '}
                        {terbilang(
                            Number(
                                format(
                                    searchParams.get('endDate') || new Date(),
                                    'Y'
                                )
                            )
                        )}
                        , Buku Kas Umum Bendahara Pengeluaran Pembantu BLUD
                        ditutup.
                        <br />
                        Oleh kami didapat di dalam kas sebesar{' '}
                        <strong className="font-serif">
                            Rp{' '}
                            {formatAngkaDecimal(
                                saldoPenerimaan +
                                    jurnal.meta.totalLastPeriode.penerimaan +
                                    jurnal.meta.totalLastPeriode.potongan -
                                    (saldoPengeluaran +
                                        jurnal.meta.totalLastPeriode
                                            .pengeluaran +
                                        jurnal.meta.totalLastPeriode.potongan)
                            )}
                        </strong>{' '}
                        (
                        {terbilang(
                            saldoPenerimaan +
                                jurnal.meta.totalLastPeriode.penerimaan +
                                jurnal.meta.totalLastPeriode.potongan -
                                (saldoPengeluaran +
                                    jurnal.meta.totalLastPeriode.pengeluaran +
                                    jurnal.meta.totalLastPeriode.potongan)
                        )}{' '}
                        rupiah).
                    </p>
                    <p className="mt-3 font-serif">
                        Terdiri dari:
                        <table className="w-1/3">
                            <tbody>
                                <tr>
                                    <td className="w-5 font-serif">1.</td>
                                    <td className="font-serif">Saldo Tunai</td>
                                    <td className="w-5 font-serif">:</td>
                                    <td className="font-serif">Rp</td>
                                    <td className="text-right font-serif">
                                        {formatAngkaDecimal(
                                            saldoPenerimaan +
                                                jurnal.meta.totalLastPeriode
                                                    .penerimaan +
                                                jurnal.meta.totalLastPeriode
                                                    .potongan -
                                                (saldoPengeluaran +
                                                    jurnal.meta.totalLastPeriode
                                                        .pengeluaran +
                                                    jurnal.meta.totalLastPeriode
                                                        .potongan)
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-5 font-serif">2.</td>
                                    <td className="font-serif">Saldo Bank</td>
                                    <td className="w-5 font-serif">:</td>
                                    <td className="font-serif">Rp</td>
                                    <td className="text-right font-serif">
                                        {formatAngkaDecimal(0)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-5 font-serif">3.</td>
                                    <td className="font-serif">Panjar</td>
                                    <td className="w-5 font-serif">:</td>
                                    <td className="font-serif">Rp</td>
                                    <td className="text-right font-serif">
                                        {formatAngkaDecimal(0)}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="w-5 font-serif">4.</td>
                                    <td className="font-serif">
                                        Surat Berharga
                                    </td>
                                    <td className="w-5 font-serif">:</td>
                                    <td className="font-serif">Rp</td>
                                    <td className="text-right font-serif">
                                        {formatAngkaDecimal(0)}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </p>
                    <p className="mt-5 font-serif">
                        Demikianlah Buku Kas Umum Bendahara Pengeluaran Pembantu
                        BLUD ini dibuat dengan sebenarnya untuk dipergunakan
                        sebagaimana mestinya.
                    </p>
                    <div
                        style={{
                            fontSize: '8.5pt',
                        }}
                        className="mt-5 flex"
                    >
                        <div className="w-1/3">
                            <div className="font-serif">Menyetujui:</div>
                            <div className="font-serif">
                                Kuasa Pengguna Anggaran BLUD
                            </div>
                            <div className="mt-14 font-serif font-bold">
                                dr. Indah Puspitasari, MARS
                            </div>
                            <div className="font-serif">Pembina Utama Muda</div>
                            <div className="font-serif">
                                NIP. 196705301998032003
                            </div>
                        </div>
                        <div className="w-1/3">
                            <div className="font-serif">Mengetahui:</div>
                            <div className="font-serif">PPTK BLUD</div>
                            <div className="mt-14 font-serif font-bold">
                                Hadi Machbudiansyah, S.E., M.M
                            </div>
                            <div className="font-serif">Pembina</div>
                            <div className="font-serif">
                                NIP. 197509111994021001
                            </div>
                        </div>
                        <div className="w-1/3">
                            <div className="font-serif">Samarinda,</div>
                            <div className="font-serif">
                                Bendahara Pengeluaran Pembantu BLUD
                            </div>
                            <div className="mt-14 font-serif font-bold">
                                Moh. Walid Arkham Sani, A.Md.Pnl
                            </div>
                            <div className="font-serif">Pengatur</div>
                            <div className="font-serif">
                                NIP. 200008062022011001
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CardFooter>
                <Button onClick={handlePrint}>Cetak</Button>
            </CardFooter>
        </div>
    )
}
