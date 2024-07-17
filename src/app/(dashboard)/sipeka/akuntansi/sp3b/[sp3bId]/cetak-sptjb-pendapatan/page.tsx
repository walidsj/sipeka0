import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { useParams } from 'react-router-dom'
import { api } from '@/trpc/react'
import Loading from '@/components/loading'
import { useReactToPrint } from 'react-to-print'
import React from 'react'
import { Button } from '@/components/ui/button'
import { formatAngkaDecimal, formatTanggal, terbilang } from '@/lib/utils'
import NotFound from '@/app/not-found'

export default function Page() {
    const params = useParams<{ sp3bId: string }>()

    const {
        data: sp3b,
        isError,
        isLoading,
    } = api.sp3b.getById.useQuery(Number(params.sp3bId))

    const componentRef = React.useRef(null)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    if (isLoading) return <Loading />

    if (isError) return <NotFound />

    if (!sp3b) return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cetak SPTJB Pendapatan</CardTitle>
                <CardDescription>
                    Dokumen Surat Pertanggungjawaban Pendapatan
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border p-10 shadow">
                    <div
                        style={{
                            fontSize: '10pt',
                        }}
                        className="leading-4"
                        ref={componentRef}
                    >
                        <style type="text/css" media="print">
                            {`
                                @page {
                                    size: A4 portrait;
                                    margin-top: 1cm;
                                    margin-left: 1.5cm;
                                    margin-right: 1.5cm;
                                    margin-bottom: 1cm;
                                    
                                }
                            `}
                        </style>
                        <table className="mt-3 w-[calc(100%-2px)]">
                            <tbody>
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
                                            className="font-serif font-bold uppercase leading-5"
                                        >
                                            Pemerintah Provinsi Kalimantan Timur
                                        </div>
                                        <div
                                            style={{ fontSize: '14pt' }}
                                            className="font-serif font-bold uppercase leading-5"
                                        >
                                            Dinas Kesehatan
                                        </div>
                                        <div
                                            style={{ fontSize: '14pt' }}
                                            className="font-serif font-bold uppercase leading-5"
                                        >
                                            Rumah Sakit Jiwa Daerah Atma Husada
                                            Mahakam
                                        </div>
                                        <div className="font-serif">
                                            Jl. Kakap No. 23 Samarinda Telp
                                            (0541) 743364 Fax 741035
                                        </div>
                                        <div className="font-serif">
                                            Website: rsjdahm.kaltimprov.go.id |
                                            Posel: rsjdahm@kaltimprov.go.id
                                        </div>
                                    </td>
                                    <td className="w-16"></td>
                                </tr>
                            </tbody>
                        </table>
                        <hr className="mb-5 mt-3 border-b-4 border-double border-black" />

                        <h5
                            style={{ fontSize: '12pt' }}
                            className="text-center font-serif font-bold uppercase underline"
                        >
                            Surat Pernyataan Tanggung Jawab (SPTJB)
                        </h5>
                        <h4 className="mb-5 text-center font-serif">
                            Nomor: {sp3b.noDokumen}/SPTJB/RSJDAHM-BLUD
                        </h4>
                        <p className="mb-5 text-justify indent-10 font-serif leading-5">
                            Sehubungan dengan pendapatan BLUD RSJD Atma Husada
                            Mahakam pada periode {formatTanggal(sp3b.tglMulai)}{' '}
                            s.d. {formatTanggal(sp3b.tglSelesai)} tahun 2024
                            sebesar Rp.{' '}
                            {formatAngkaDecimal(sp3b.pendapatan.total)} (
                            {terbilang(sp3b.pendapatan.total)} rupiah) dengan
                            rincian sebagai berikut:
                        </p>
                        <table className="mb-5 w-full">
                            <thead>
                                <tr>
                                    <th
                                        rowSpan={2}
                                        className="w-10 border-[0.5pt] border-black px-3 py-2 font-serif"
                                    >
                                        No
                                    </th>
                                    <th
                                        colSpan={sp3b.pendapatan.rincian.length}
                                        className="border-[0.5pt] border-black px-3 py-2 font-serif"
                                    >
                                        Uraian
                                    </th>
                                    <th
                                        rowSpan={2}
                                        className="border-[0.5pt] border-black px-3 py-2 font-serif"
                                    >
                                        Jumlah
                                    </th>
                                </tr>
                                <tr>
                                    {sp3b.pendapatan.rincian.map(
                                        (item, index) => (
                                            <th
                                                key={index}
                                                className="border-[0.5pt] border-black px-3 py-2 font-serif"
                                            >
                                                {item.uraian}
                                            </th>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody></tbody>
                            <tr>
                                <td className="border-[0.5pt] border-black px-3 py-2 text-center font-serif">
                                    1.
                                </td>
                                {sp3b.pendapatan.rincian.map((item, index) => (
                                    <td
                                        key={index}
                                        className="border-[0.5pt] border-black px-3 py-2 text-right font-serif"
                                    >
                                        {formatAngkaDecimal(item.jumlah)}
                                    </td>
                                ))}
                                <td className="border-[0.5pt] border-black px-3 py-2 text-right font-serif">
                                    {formatAngkaDecimal(sp3b.pendapatan.total)}
                                </td>
                            </tr>
                        </table>
                        <p className="mb-2 text-justify indent-10 font-serif leading-5">
                            Pengeluaran biaya tersebut di atas telah
                            dilaksanakan dan dikelola berdasarkan sistem
                            pengendalian intern yang memadai dalam kerangka
                            pelaksanaan DPA, dan dibukukan sesuai dengan Standar
                            Akuntansi yang berlaku pada BLUD dan bukti-bukti
                            pengeluaran yang ada pada kami.
                        </p>
                        <p className="mb-5 text-justify indent-10 font-serif leading-5">
                            Demikian surat pernyataan ini dibuat untuk
                            melengkapi persyaratan pengajuan SP3B RSJD Atma
                            Husada Mahakam.
                        </p>
                        <div className="mb-5 flex w-full flex-row">
                            <div className="w-full" />
                            <div className="w-3/5 text-justify font-serif">
                                <div className="font-serif">
                                    Samarinda, {formatTanggal(sp3b.tglDokumen)}
                                </div>
                                <div className="font-serif">
                                    {sp3b.penandatangan?.jabatan},
                                </div>
                                <div className="mt-14 font-serif underline">
                                    {sp3b.penandatangan?.gelarDepan &&
                                        `${sp3b.penandatangan?.gelarDepan} `}
                                    {sp3b.penandatangan?.nama}
                                    {sp3b.penandatangan?.gelarBelakang &&
                                        `, ${sp3b.penandatangan?.gelarBelakang}`}
                                </div>
                                <div className="font-serif">
                                    Pembina Utama Muda
                                </div>
                                <div className="font-serif">
                                    NIP. {sp3b.penandatangan?.nip}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handlePrint}>Cetak</Button>
            </CardFooter>
        </Card>
    )
}
