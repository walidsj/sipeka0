import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatAngka, formatAngkaDecimal, formatTanggal, terbilang } from '@/lib/utils'
import { api } from '@/trpc/react'
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
    const handlePrint = useReactToPrint({ contentRef: componentRef })

    const {
        isLoading,
        isError,
        error,
        data: jurnal,
    } = api.belanja.getBelanjaBku.useQuery(
        {
            startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
            endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
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
    let saldo = 0

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center gap-5">
                <div className="flex gap-2">
                    <Input
                        value={searchParams.get('startDate') || format(new Date(), 'yyyy-MM-01')}
                        type="date"
                        onChange={(e) => {
                            searchParams.set('startDate', e.target.value)
                            setSearchParams(searchParams)
                        }}
                    />
                    <Input
                        type="date"
                        value={searchParams.get('endDate') || format(new Date(), 'yyyy-MM-dd')}
                        onChange={(e) => {
                            searchParams.set('endDate', e.target.value)
                            setSearchParams(searchParams)
                        }}
                    />
                </div>
            </div>
            <div className="rounded-md border p-10 shadow">
                <div
                    style={{
                        fontSize: '8pt',
                    }}
                    className="leading-4"
                    ref={componentRef}
                >
                    <style type="text/css" media="print">
                        {`
                            @page {
                                size: landscape;
                                margin-top: 1cm;
                                margin-left: 1.5cm;
                                margin-right: 1.5cm;
                                margin-bottom: 1cm;

                            }
                        `}
                    </style>
                    <table className="my-3 w-full">
                        <tbody>
                            <tr>
                                <td className="w-20 font-serif">
                                    <img src="/images/logo-kaltimprov.webp" className="h-16 w-auto" />
                                </td>
                                <td className="text-left">
                                    <div style={{ fontSize: '10pt' }} className="font-serif font-bold uppercase">
                                        Pemerintah Provinsi Kalimantan Timur
                                    </div>
                                    <div style={{ fontSize: '10pt' }} className="font-serif font-bold uppercase">
                                        BLUD RSJD ATMA HUSADA MAHAKAM
                                    </div>
                                    <div style={{ fontSize: '10pt' }} className="font-serif font-bold uppercase">
                                        TAHUN ANGGARAN 2026
                                    </div>
                                </td>
                                <td className="w-16"></td>
                            </tr>
                        </tbody>
                    </table>
                    <h5 style={{ fontSize: '11pt' }} className="text-center font-serif font-bold uppercase">
                        BUKU KAS UMUM
                    </h5>
                    <h4 style={{ fontSize: '9pt' }} className="text-center font-serif font-bold uppercase">
                        BENDAHARA PENGELUARAN BLUD
                    </h4>
                    <h6 className="mb-5 text-center font-serif">
                        Periode {formatTanggal(searchParams.get('startDate') || format(new Date(), 'yyyy-MM-01'))} s.d.{' '}
                        {formatTanggal(searchParams.get('endDate') || new Date())}
                    </h6>
                    <table
                        className="my-5 w-[calc(100%-2px)]"
                        style={{
                            pageBreakInside: 'auto',
                        }}
                    >
                        <thead
                            style={{
                                display: 'table-header-group',
                            }}
                            className="border-b-2 border-double border-black bg-black text-white"
                        >
                            <tr>
                                <th className="border border-black px-2 py-1 text-center font-serif">Tanggal</th>
                                <th className="w-10 border border-black px-2 py-1 text-center font-serif">No. Bukti</th>
                                <th className="border border-black px-2 py-1 text-center font-serif">Kode Rekening</th>
                                <th className="border border-black px-2 py-1 font-serif">Uraian</th>
                                <th className="border border-black px-2 py-1 font-serif">
                                    Penerimaan
                                    <br />
                                    (Rp)
                                </th>
                                <th className="border border-black px-2 py-1 font-serif">
                                    Pengeluaran
                                    <br />
                                    (Rp)
                                </th>
                                <th className="border border-black px-2 py-1 font-serif">
                                    Saldo
                                    <br />
                                    (Rp)
                                </th>
                            </tr>
                        </thead>
                        <tbody className="border-b-2 border-double border-black">
                            <tr className="bg-amber-100 font-semibold">
                                <td className="border border-black px-2 py-0.5"></td>
                                <td className="border border-black px-2 py-0.5"></td>
                                <td className="border border-black px-2 py-0.5"></td>
                                <td className="border border-black px-2 py-0.5 text-right font-serif">
                                    Saldo Sebelumnya
                                </td>
                                <td className="border border-black px-2 py-0.5 text-right font-serif">
                                    {formatAngka(0)}
                                </td>
                                <td className="border border-black px-2 py-0.5 text-right font-serif">
                                    {formatAngka(0)}
                                </td>
                                <td className="border border-black px-2 py-0.5 text-right font-serif">
                                    {formatAngka(
                                        (saldo +=
                                            jurnal.meta.totalLastPeriode.penerimaan +
                                            jurnal.meta.totalLastPeriode.potongan -
                                            jurnal.meta.totalLastPeriode.pengeluaran -
                                            jurnal.meta.totalLastPeriode.potongan)
                                    )}
                                </td>
                            </tr>
                            {jurnal.data.map((item, index) => {
                                saldoPenerimaan += item.penerimaan || 0
                                saldoPengeluaran += item.pengeluaran || 0
                                return (
                                    <tr
                                        key={index}
                                        className="border-t border-black"
                                        style={{
                                            pageBreakInside: 'avoid',
                                            pageBreakAfter: 'auto',
                                        }}
                                    >
                                        <td className="border-x border-black px-2 py-0.5 text-center align-top font-serif">
                                            {item.tgl &&
                                                Intl.DateTimeFormat('id-ID', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                }).format(item.tgl!)}
                                        </td>
                                        <td className="border-r border-black px-2 py-0.5 text-center align-top font-serif">
                                            {item.noDokumen}
                                        </td>
                                        <td className="border-r border-black px-2 py-0.5 text-center align-top font-serif">
                                            {item.kodeRekening}
                                        </td>
                                        <td className="border-r border-black px-2 py-0.5 align-top font-serif">
                                            {item.uraian}
                                        </td>
                                        <td className="border-r border-black px-2 py-0.5 text-right align-top font-serif">
                                            {item.penerimaan !== null && formatAngka(item.penerimaan)}
                                        </td>
                                        <td className="border-r border-black px-2 py-0.5 text-right align-top font-serif">
                                            {item.pengeluaran !== null && formatAngka(item.pengeluaran)}
                                        </td>
                                        <td className="border-r border-black px-2 py-0.5 text-right align-top font-serif">
                                            {formatAngka((saldo += Number(item.penerimaan) - Number(item.pengeluaran)))}
                                        </td>
                                    </tr>
                                )
                            })}
                            {jurnal.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={100} className="text-center">
                                        Tidak ada data
                                    </TableCell>
                                </TableRow>
                            )}
                            <tr className="border-t-2 border-double border-black">
                                <td
                                    colSpan={100}
                                    className="border border-black px-2 py-1 text-left font-serif font-bold"
                                >
                                    Total
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={5} className="border-l border-black px-2 py-0.5 text-left font-serif">
                                    Jumlah periode Ini
                                </td>
                                <td className="px-2 py-0.5 text-right font-serif">{formatAngka(saldoPenerimaan)}</td>
                                <td className="px-2 py-0.5 text-right font-serif">{formatAngka(saldoPengeluaran)}</td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr>
                                <td colSpan={5} className="border-l border-black px-2 py-0.5 text-left font-serif">
                                    Jumlah yang lalu (per tanggal{' '}
                                    {Intl.DateTimeFormat('id-ID', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    }).format(
                                        new Date(
                                            searchParams.get('startDate') || format(new Date(), 'yyyy-MM-01')
                                        ).getTime() -
                                            24 * 60 * 60 * 1000
                                    )}
                                    )
                                </td>
                                <td className="px-2 py-0.5 text-right font-serif">
                                    {formatAngka(
                                        jurnal.meta.totalLastPeriode.penerimaan + jurnal.meta.totalLastPeriode.potongan
                                    )}
                                </td>
                                <td className="px-2 py-0.5 text-right font-serif">
                                    {formatAngka(
                                        jurnal.meta.totalLastPeriode.pengeluaran + jurnal.meta.totalLastPeriode.potongan
                                    )}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr>
                                <td colSpan={5} className="border-l border-black px-2 py-0.5 text-left font-serif">
                                    Jumlah sampai dengan saat ini
                                </td>
                                <td className="border-b border-black px-2 py-0.5 text-right font-serif">
                                    {formatAngka(
                                        saldoPenerimaan +
                                            jurnal.meta.totalLastPeriode.penerimaan +
                                            jurnal.meta.totalLastPeriode.potongan
                                    )}
                                </td>
                                <td className="border-b border-black px-2 py-0.5 text-right font-serif">
                                    {formatAngka(
                                        saldoPengeluaran +
                                            jurnal.meta.totalLastPeriode.pengeluaran +
                                            jurnal.meta.totalLastPeriode.potongan
                                    )}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr>
                                <td colSpan={5} className="border-l border-black px-2 py-0.5 text-left font-serif">
                                    Sisa kas
                                </td>
                                <td className="px-2 py-0.5 text-right font-serif">
                                    {formatAngka(
                                        saldoPenerimaan +
                                            jurnal.meta.totalLastPeriode.penerimaan +
                                            jurnal.meta.totalLastPeriode.potongan -
                                            (saldoPengeluaran +
                                                jurnal.meta.totalLastPeriode.pengeluaran +
                                                jurnal.meta.totalLastPeriode.potongan)
                                    )}
                                </td>
                                <td></td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr className="border-t-2 border-double border-black">
                                <td
                                    colSpan={100}
                                    className="border border-black px-2 py-1 text-left font-serif font-bold"
                                >
                                    Dikurangi Jurnal Pemotongan/Penyetoran Pajak
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={5} className="border-l border-black px-2 py-0.5 text-left font-serif">
                                    Jumlah pemotongan/penyetoran periode ini
                                </td>
                                <td className="px-2 py-0.5 text-right font-serif">
                                    {formatAngka(jurnal.meta.totalThisPeriode.potongan)}
                                </td>
                                <td className="px-2 py-0.5 text-right font-serif">
                                    {formatAngka(jurnal.meta.totalThisPeriode.potongan)}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr>
                                <td colSpan={5} className="border-l border-black px-2 py-0.5 text-left font-serif">
                                    Jumlah periode Ini
                                </td>
                                <td className="px-2 py-0.5 text-right font-serif">
                                    {formatAngka(saldoPenerimaan - jurnal.meta.totalThisPeriode.potongan)}
                                </td>
                                <td className="px-2 py-0.5 text-right font-serif">
                                    {formatAngka(saldoPengeluaran - jurnal.meta.totalThisPeriode.potongan)}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr>
                                <td colSpan={5} className="border-l border-black px-2 py-0.5 text-left font-serif">
                                    Jumlah pemotongan/penyetoran yang lalu (per tanggal{' '}
                                    {Intl.DateTimeFormat('id-ID', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    }).format(
                                        new Date(
                                            searchParams.get('startDate') || format(new Date(), 'yyyy-MM-01')
                                        ).getTime() -
                                            24 * 60 * 60 * 1000
                                    )}
                                    )
                                </td>
                                <td className="px-2 py-0.5 text-right font-serif">
                                    {formatAngka(jurnal.meta.totalLastPeriode.potongan)}
                                </td>
                                <td className="px-2 py-0.5 text-right font-serif">
                                    {formatAngka(jurnal.meta.totalLastPeriode.potongan)}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr>
                                <td colSpan={5} className="border-l border-black px-2 py-0.5 text-left font-serif">
                                    Jumlah yang lalu (per tanggal{' '}
                                    {Intl.DateTimeFormat('id-ID', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric',
                                    }).format(
                                        new Date(
                                            searchParams.get('startDate') || format(new Date(), 'yyyy-MM-01')
                                        ).getTime() -
                                            24 * 60 * 60 * 1000
                                    )}
                                    )
                                </td>
                                <td className="px-2 py-0.5 text-right font-serif">
                                    {formatAngka(jurnal.meta.totalLastPeriode.penerimaan)}
                                </td>
                                <td className="px-2 py-0.5 text-right font-serif">
                                    {formatAngka(jurnal.meta.totalLastPeriode.pengeluaran)}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>

                            <tr>
                                <td colSpan={5} className="border-l border-black px-2 py-0.5 text-left font-serif">
                                    Jumlah sampai dengan saat ini
                                </td>
                                <td className="border-b border-black px-2 py-0.5 text-right font-serif">
                                    {formatAngka(
                                        saldoPenerimaan +
                                            jurnal.meta.totalLastPeriode.penerimaan -
                                            jurnal.meta.totalThisPeriode.potongan
                                    )}
                                </td>
                                <td className="border-b border-black px-2 py-0.5 text-right font-serif">
                                    {formatAngka(
                                        saldoPengeluaran +
                                            jurnal.meta.totalLastPeriode.pengeluaran -
                                            jurnal.meta.totalThisPeriode.potongan
                                    )}
                                </td>
                                <td className="border-r border-black"></td>
                            </tr>
                            <tr>
                                <td colSpan={5} className="border-l border-black px-2 py-0.5 text-left font-serif">
                                    Sisa kas
                                </td>
                                <td className="px-2 py-0.5 text-right font-serif">
                                    {formatAngka(
                                        saldoPenerimaan +
                                            jurnal.meta.totalLastPeriode.penerimaan -
                                            jurnal.meta.totalThisPeriode.potongan -
                                            (saldoPengeluaran +
                                                jurnal.meta.totalLastPeriode.pengeluaran -
                                                jurnal.meta.totalThisPeriode.potongan)
                                    )}
                                </td>
                                <td></td>
                                <td className="border-r border-black"></td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="mt-5 font-serif">
                        Pada hari ini tanggal{' '}
                        {terbilang(Number(format(searchParams.get('endDate') || new Date(), 'd')))} bulan{' '}
                        {Intl.DateTimeFormat('id-ID', {
                            month: 'long',
                        }).format(new Date(searchParams.get('endDate') || new Date()))}{' '}
                        tahun {terbilang(Number(format(searchParams.get('endDate') || new Date(), 'y')))}
                        , Buku Kas Umum Bendahara Pengeluaran Pembantu BLUD ditutup.
                        <br />
                        Oleh kami didapat di dalam kas sebesar{' '}
                        <strong className="font-serif">
                            Rp{' '}
                            {formatAngkaDecimal(
                                saldoPenerimaan +
                                    jurnal.meta.totalLastPeriode.penerimaan +
                                    jurnal.meta.totalLastPeriode.potongan -
                                    (saldoPengeluaran +
                                        jurnal.meta.totalLastPeriode.pengeluaran +
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
                    <p className="mt-3 font-serif">Terdiri dari:</p>
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
                                            jurnal.meta.totalLastPeriode.penerimaan +
                                            jurnal.meta.totalLastPeriode.potongan -
                                            (saldoPengeluaran +
                                                jurnal.meta.totalLastPeriode.pengeluaran +
                                                jurnal.meta.totalLastPeriode.potongan)
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="w-5 font-serif">2.</td>
                                <td className="font-serif">Saldo Bank</td>
                                <td className="w-5 font-serif">:</td>
                                <td className="font-serif">Rp</td>
                                <td className="text-right font-serif">{formatAngkaDecimal(0)}</td>
                            </tr>
                            <tr>
                                <td className="w-5 font-serif">3.</td>
                                <td className="font-serif">Panjar</td>
                                <td className="w-5 font-serif">:</td>
                                <td className="font-serif">Rp</td>
                                <td className="text-right font-serif">{formatAngkaDecimal(0)}</td>
                            </tr>
                            <tr>
                                <td className="w-5 font-serif">4.</td>
                                <td className="font-serif">Surat Berharga</td>
                                <td className="w-5 font-serif">:</td>
                                <td className="font-serif">Rp</td>
                                <td className="text-right font-serif">{formatAngkaDecimal(0)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className="mt-5 font-serif">
                        Demikian Buku Kas Umum Bendahara Pengeluaran Pembantu BLUD ini dibuat dengan sebenarnya untuk
                        dipergunakan sebagaimana mestinya.
                    </p>
                    <div className="mt-5 flex">
                        <div className="w-1/3">
                            <div className="font-serif">Menyetujui:</div>
                            <div className="font-serif">Kuasa Pengguna Anggaran BLUD</div>
                            <div className="mt-14 font-serif font-bold">dr. Indah Puspitasari, MARS</div>
                            <div className="font-serif">Pembina Utama Muda</div>
                            <div className="font-serif">NIP. 196705301998032003</div>
                        </div>
                        <div className="w-1/3">
                            <div className="font-serif">Mengetahui:</div>
                            <div className="font-serif">PPTK BLUD</div>
                            <div className="mt-14 font-serif font-bold">Sudoto, S.Kom</div>
                            <div className="font-serif">Pembina</div>
                            <div className="font-serif">NIP. 197407291994021002</div>
                        </div>
                        <div className="w-1/3">
                            <div className="font-serif">
                                Samarinda, {formatTanggal(searchParams.get('endDate') || new Date())}
                            </div>
                            <div className="font-serif">Bendahara Pengeluaran Pembantu BLUD</div>
                            <div className="mt-14 font-serif font-bold">Riandy, S.Kep</div>
                            <div className="font-serif">Penata Tk. I</div>
                            <div className="font-serif">NIP. 197901281999031003</div>
                        </div>
                    </div>
                </div>
            </div>
            <CardFooter>
                <Button onClick={() => handlePrint()}>Cetak</Button>
            </CardFooter>
        </div>
    )
}
