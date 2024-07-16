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
import NotFound from '@/app/not-found'
import { formatAngkaDecimal, formatTanggal, terbilang } from '@/lib/utils'

export default function Page() {
    const params = useParams<{ sppId: string }>()

    const {
        data: spp,
        isError,
        isLoading,
    } = api.spp.getById.useQuery(Number(params.sppId))

    const componentRef = React.useRef(null)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    if (isLoading) return <Loading />

    if (isError) return <NotFound />

    if (!spp) return <NotFound />

    const uniqueRekening = [
        ...new Set(
            spp.lpjBelanja?.belanja?.map((item) => item.rab?.kodeRekening)
        ),
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cetak SPP Rincian</CardTitle>
                <CardDescription>Dokumen SPP Rincian</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border p-10 shadow">
                    <div className="text-[9pt] leading-4" ref={componentRef}>
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
                        <div className="mb-5 w-full">
                            <div className="font-arial text-center text-[11pt] font-semibold uppercase leading-[15pt]">
                                Provinsi Kalimantan Timur
                            </div>

                            <div className="font-arial text-center text-[11pt] font-semibold uppercase leading-[15pt]">
                                Dinas Kesehatan
                            </div>

                            <div className="font-arial text-center text-base font-semibold uppercase leading-[15pt]">
                                Rumah Sakit Jiwa Daerah Atma Husada Mahakam
                            </div>

                            <div className="font-arial mt-2 text-center text-[13pt] font-semibold uppercase leading-[15pt]">
                                Surat Permintaan Pembayaran (SPP) BLUD
                            </div>
                            <div className="font-arial text-center text-[10pt]">
                                Nomor: 900.1.3.5/{spp.noDokumen}/
                                {spp.lpjBelanja?.jenis}
                                /SPP/RSJD-AHM/BLUD
                            </div>
                            <div className="font-arial mt-2 text-center text-[10pt]">
                                Tahun Anggaran{' '}
                                {Intl.DateTimeFormat('id-ID', {
                                    year: 'numeric',
                                }).format(spp.tglDokumen || new Date())}
                            </div>
                        </div>
                        <div className="font-arial mb-5 text-center text-[11pt] font-semibold uppercase leading-[15pt]">
                            Rincian Rencana Penggunaan
                        </div>
                        <table className="mb-2 w-[calc(100%-2px)]">
                            <thead>
                                <tr>
                                    <th className="font-arial w-[1%] border-[0.5pt] border-black px-3 py-2">
                                        No
                                    </th>
                                    <th className="font-arial w-[20%] border-[0.5pt] border-black px-3 py-2">
                                        Kode Rekening
                                    </th>
                                    <th className="font-arial w-[54%] border-[0.5pt] border-black px-3 py-2">
                                        Uraian
                                    </th>
                                    <th className="font-arial w-[25%] border-[0.5pt] border-black px-3 py-2">
                                        Jumlah
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-orange-50 font-semibold">
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        1.
                                    </td>
                                    <td
                                        colSpan={3}
                                        className="font-arial border-[0.5pt] border-black px-3 py-1 align-top"
                                    >
                                        Nomor SPD:
                                        DPA/A.1/1.02.0.00.0.00.01.0000/002/2024
                                    </td>
                                </tr>
                                <tr className="font-semibold">
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        2.
                                    </td>
                                    <td
                                        colSpan={3}
                                        className="font-arial border-[0.5pt] border-black px-3 py-1 align-top"
                                    >
                                        1.02.01.1.10 Peningkatan Pelayanan BLUD
                                    </td>
                                </tr>
                                <tr className="font-semibold">
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        3.
                                    </td>
                                    <td
                                        colSpan={3}
                                        className="font-arial border-[0.5pt] border-black px-3 py-1 align-top"
                                    >
                                        1.02.01.1.10.0001 Pelayanan dan
                                        Penunjang Pelayanan BLUD
                                    </td>
                                </tr>

                                {uniqueRekening.map((kodeRekening, index) => {
                                    const filtered =
                                        spp.lpjBelanja?.belanja?.filter(
                                            (item) =>
                                                item.rab?.kodeRekening ===
                                                kodeRekening
                                        )
                                    const total = filtered.reduce(
                                        (acc, item) =>
                                            acc + Number(item.jumlah),
                                        0
                                    )

                                    return (
                                        <tr key={index}>
                                            <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                                {index + 4}.
                                            </td>
                                            <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                                {kodeRekening}
                                            </td>
                                            <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                                {
                                                    filtered[0].rab.rekening
                                                        ?.uraian
                                                }
                                            </td>
                                            <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-right align-top">
                                                {formatAngkaDecimal(total)}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                            <tfoot>
                                <tr className="bg-neutral-100">
                                    <td
                                        colSpan={3}
                                        className="font-arial border-[0.5pt] border-black px-3 py-1 text-right font-semibold"
                                    >
                                        Jumlah:
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-right font-semibold">
                                        {formatAngkaDecimal(
                                            spp.lpjBelanja?.belanja?.reduce(
                                                (acc, item) =>
                                                    acc + Number(item.jumlah),
                                                0
                                            )
                                        )}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="font-arial mb-5">
                            Terbilang:{' '}
                            {terbilang(
                                spp.lpjBelanja?.belanja?.reduce(
                                    (acc, item) => acc + Number(item.jumlah),
                                    0
                                )
                            )}{' '}
                            Rupiah
                        </div>
                        <div className="flex w-full flex-row text-center">
                            <div className="font-arial w-1/2">
                                <div className="font-arial">
                                    Mengetahui/Menyetujui,
                                </div>
                                <div className="font-arial">
                                    Kuasa Pengguna Anggaran
                                </div>
                                <div className="font-arial mt-12 underline">
                                    dr. Indah Puspitasari, MARS
                                </div>
                                <div className="font-arial">
                                    Pembina Utama Muda
                                </div>
                                <div className="font-arial">
                                    NIP. 196705301998032003
                                </div>
                            </div>
                            <div className="font-arial w-1/2">
                                <div className="font-arial">
                                    Samarinda, {formatTanggal(spp.tglDokumen)}
                                </div>
                                <div className="font-arial">
                                    Bendahara Pengeluaran Pembantu BLUD,
                                </div>
                                <div className="font-arial mt-12 underline">
                                    Moh. Walid Arkham Sani, A.Md.Pnl
                                </div>
                                <div className="font-arial">Pengatur</div>
                                <div className="font-arial">
                                    NIP. 200008062022011001
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
