import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { formatAngka, formatTanggal } from '@/lib/utils'
import { api } from '@/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import { format } from 'date-fns'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'

export default function BkPajakTable() {
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
        data: belanja,
    } = api.belanja.getAllBkPajak.useQuery(
        {
            startDate: searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined,
            endDate: searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined,
        },
        { placeholderData: keepPreviousData }
    )

    if (isLoading) return <Loading />

    if (isError) {
        return <div>{error.message}</div>
    }

    if (!belanja) return <div>Data tidak dapat dimuat.</div>

    let no = 0
    let saldo = 0
    let totalPenerimaan = 0
    let totalPengeluaran = 0

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
                    <table className="mt-3 w-full">
                        <tbody>
                            <tr>
                                <td className="w-16 font-serif">
                                    <img src="/images/logo-kaltimprov.webp" className="h-20 w-24" />
                                </td>
                                <td className="text-center">
                                    <div style={{ fontSize: '10pt' }} className="font-serif font-bold uppercase">
                                        Pemerintah Provinsi Kalimantan Timur
                                    </div>
                                    <div style={{ fontSize: '12pt' }} className="font-serif font-bold uppercase">
                                        Dinas Kesehatan
                                    </div>
                                    <div style={{ fontSize: '12pt' }} className="font-serif font-bold uppercase">
                                        Rumah Sakit Jiwa Daerah Atma Husada Mahakam
                                    </div>
                                    <div className="font-serif">
                                        Jl. Kakap No. 23 Samarinda Telp (0541) 743364 Fax 741035
                                    </div>
                                    <div className="font-serif">
                                        Website: rsjdahm.kaltimprov.go.id | Posel: rsjdahm@kaltimprov.go.id
                                    </div>
                                </td>
                                <td className="w-16"></td>
                            </tr>
                        </tbody>
                    </table>
                    <hr className="mb-5 mt-3 border-b-4 border-double border-black" />
                    <h5 style={{ fontSize: '11pt' }} className="text-center font-serif font-bold uppercase underline">
                        BUKU PEMBANTU PAJAK BLUD
                    </h5>
                    <h4 style={{ fontSize: '9pt' }} className="mb-4 text-center font-serif font-bold uppercase">
                        BENDAHARA PENGELUARAN PEMBANTU
                    </h4>
                    <h6 className="text-center font-serif uppercase">Tahun Anggaran 2024</h6>
                    <h6 className="mb-5 text-center font-serif">
                        Periode {formatTanggal(searchParams.get('startDate') || format(new Date(), 'yyyy-MM-01'))} s.d.{' '}
                        {formatTanggal(searchParams.get('endDate') || new Date())}
                    </h6>
                    <table className="w-full">
                        <thead className="border-b-2 border-double border-black">
                            <tr>
                                <th className="w-1 border border-black px-2 py-1 font-serif">No.</th>
                                <th className="border border-black px-2 py-1 text-center font-serif">Tanggal</th>
                                <th className="border border-black px-2 py-1 text-center font-serif">Nomor Bukti</th>
                                <th className="border border-black px-2 py-1 text-center font-serif">Uraian</th>
                                <th className="border border-black px-2 py-1 text-center font-serif">Kode Billing</th>
                                <th className="border border-black px-2 py-1 text-center font-serif">NTPN</th>
                                <th className="border border-black px-2 py-1 text-center font-serif">
                                    Penerimaan
                                    <br />
                                    (Rp)
                                </th>
                                <th className="border border-black px-2 py-1 text-center font-serif">
                                    Pengeluaran
                                    <br />
                                    (Rp)
                                </th>
                                <th className="border border-black px-2 py-1 text-center font-serif">
                                    Saldo
                                    <br />
                                    (Rp)
                                </th>
                            </tr>
                        </thead>
                        <tbody className="border-b-2 border-double border-black">
                            {belanja.map((blj) => {
                                return blj.potonganBelanja.map((item, index) => {
                                    totalPenerimaan += Number(item.jumlah)

                                    if (item.ntpn) {
                                        totalPengeluaran += Number(item.jumlah)
                                    }

                                    return (
                                        <React.Fragment key={index}>
                                            <tr className="border-t border-black">
                                                <td className="border-x border-black px-2 py-0.5 text-center font-serif">
                                                    {++no}.
                                                </td>
                                                <td className="border-x border-black px-2 py-0.5 text-center font-serif">
                                                    {Intl.DateTimeFormat('id-ID', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                    }).format(blj.tglDokumen || new Date())}
                                                </td>
                                                <td className="border-x border-black px-2 py-0.5 text-center font-serif">
                                                    {blj.noDokumen}
                                                </td>
                                                <td className="border-x border-black px-2 py-0.5 font-serif">
                                                    Pemotongan {item.jenis} {blj.uraian}
                                                </td>
                                                <td className="border-x border-black px-2 py-0.5 text-center font-serif">
                                                    {item.billing}
                                                </td>
                                                <td className="border-x border-black px-2 py-0.5 text-center font-serif"></td>
                                                <td className="border-x border-black px-2 py-0.5 text-right font-serif">
                                                    {formatAngka(item.jumlah)}
                                                </td>
                                                <td className="border-x border-black px-2 py-0.5 font-serif"></td>
                                                <td className="border-x border-black px-2 py-0.5 text-right font-serif">
                                                    {formatAngka((saldo += Number(item.jumlah)))}
                                                </td>
                                            </tr>
                                            <tr className="border-t border-dotted border-neutral-400">
                                                <td className="border-x border-black px-2 py-0.5 text-center font-serif"></td>
                                                <td className="border-x border-black px-2 py-0.5 text-center font-serif"></td>
                                                <td className="border-x border-black px-2 py-0.5 text-center font-serif"></td>
                                                <td className="border-x border-black px-2 py-0.5 font-serif">
                                                    Penyetoran {item.jenis}{' '}
                                                    {blj.rekanan &&
                                                        `a.n. ${blj.rekanan.nama} ${blj.rekanan.npwp && `(${blj.rekanan.npwp})`}`}
                                                    {blj.pegawai &&
                                                        `a.n. ${blj.pegawai.gelarDepan && `${blj.pegawai.gelarDepan} `}${blj.pegawai.nama}${
                                                            blj.pegawai.gelarBelakang &&
                                                            `, ${blj.pegawai.gelarBelakang}`
                                                        } ${blj.pegawai.npwp && `(${blj.pegawai.npwp})`}`}
                                                </td>
                                                <td className="border-x border-black px-2 py-0.5 text-center font-serif"></td>
                                                <td className="border-x border-black px-2 py-0.5 text-center font-serif">
                                                    {item.ntpn}
                                                </td>
                                                <td className="border-x border-black px-2 py-0.5 font-serif"></td>
                                                <td className="border-x border-black px-2 py-0.5 text-right font-serif">
                                                    {formatAngka(item.ntpn ? item.jumlah : 0)}
                                                </td>
                                                <td className="border-x border-black px-2 py-0.5 text-right font-serif">
                                                    {formatAngka(item.ntpn ? (saldo -= Number(item.jumlah)) : saldo)}
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    )
                                })
                            })}
                            {belanja.length === 0 && (
                                <tr>
                                    <td colSpan={100} className="text-center">
                                        Tidak ada data
                                    </td>
                                </tr>
                            )}
                            <tr className="border-t-2 border-double border-black">
                                <th colSpan={6} className="border-x border-black px-2 py-1 font-serif">
                                    Total
                                </th>
                                <th className="border-x border-black px-2 py-1 text-right font-serif">
                                    {formatAngka(totalPenerimaan)}
                                </th>
                                <th className="border-x border-black px-2 py-1 text-right font-serif">
                                    {formatAngka(totalPengeluaran)}
                                </th>
                                <th className="border-x border-black px-2 py-1 text-right font-serif">
                                    {formatAngka(saldo)}
                                </th>
                            </tr>
                        </tbody>
                    </table>
                    <div className="mt-5 flex">
                        <div className="w-1/3"></div>
                        <div className="w-1/3"></div>
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
                <Button onClick={handlePrint}>Cetak</Button>
            </CardFooter>
        </div>
    )
}
