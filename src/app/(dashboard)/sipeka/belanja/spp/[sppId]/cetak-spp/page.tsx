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
import { formatAngkaDecimal, formatTanggal } from '@/lib/utils'

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

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cetak Surat Pengantar</CardTitle>
                <CardDescription>Dokumen Surat Pengantar SPP</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border p-10 shadow">
                    <div className="text-[9pt] leading-4" ref={componentRef}>
                        <style type="text/css" media="print">
                            {`
                                @page {
                                    size: A4 portrait;
                                    margin-top: 1cm;
                                    margin-left: 1cm;
                                    margin-right: 1cm;
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

                            <div className="font-arial mt-2 text-center text-lg font-semibold uppercase">
                                Surat Permintaan Pembayaran (SPP) BLUD
                            </div>

                            <div className="font-arial text-center text-[10pt]">
                                Nomor: 900.1.3.5/{spp.noDokumen}/
                                {spp.lpjBelanja?.jenis}
                                /SPP/RSJD-AHM/BLUD
                            </div>
                        </div>
                        <table className="mb-5 w-[calc(100%-2px)] border-collapse">
                            <thead>
                                <tr>
                                    <th
                                        colSpan={4}
                                        className="font-arial border-[0.5pt] border-black px-3 py-2 font-bold"
                                    >
                                        {spp.lpjBelanja?.jenis === 'LS'
                                            ? 'Langsung'
                                            : spp.lpjBelanja?.jenis === 'GU'
                                              ? 'Ganti Uang Persediaan'
                                              : spp.lpjBelanja?.jenis === 'TU'
                                                ? 'Tambah Uang Persediaan'
                                                : ''}{' '}
                                        {spp.lpjBelanja?.jenis === 'LS' &&
                                            spp.lpjBelanja?.belanja.map(
                                                (item) => (
                                                    <>
                                                        {item.rab?.kodeRekening?.startsWith(
                                                            '5.1'
                                                        ) && 'Pegawai'}
                                                    </>
                                                )
                                            )}
                                    </th>
                                </tr>
                                <tr>
                                    <th
                                        colSpan={4}
                                        className="font-arial border-[0.5pt] border-black px-3 py-2 font-bold"
                                    >
                                        SPP-{spp.lpjBelanja?.jenis}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="font-arial w-1 border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        1.
                                    </td>
                                    <td className="font-arial w-1/4 border-[0.5pt] border-black px-3 py-1 align-top">
                                        SKPD
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        :
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        Dinas Kesehatan
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        2.
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        Unit SKPD
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        :
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        RSJD Atma Husada Mahakam
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        3.
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        Pengguna Anggaran
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        :
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        Dr. dr. H. Jaya Mualimin, Sp.KJ, M.Kes,
                                        MARS
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        4.
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        Kuasa Pengguna Anggaran
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        :
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        dr. Indah Puspitasari, MARS
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        5.
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        Bendahara Pengeluaran Pembantu BLUD
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        :
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        Moh. Walid Arkham Sani, A.Md.Pnl
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        6.
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        NPWP Bendahara Pengeluaran Pembantu BLUD
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        :
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        953350162722000
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        7.
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        Nama Bank
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        :
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        BANK KALTIMTARA
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        8.
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        Nomor Rekening Bank
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        :
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        0011445004
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        9.
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        Nama di Rekening Bank
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        :
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        BP BLUD RSJD AHM
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        10.
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        Untuk Keperluan
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        :
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        {spp.lpjBelanja?.uraian}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        11.
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        Dasar Pengeluaran
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top">
                                        :
                                    </td>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 align-top">
                                        DPA/A.1/1.02.0.00.0.00.01.0000/002/2024
                                        <br />
                                        Tanggal: 04 Februari 2024
                                    </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="font-arial border-[0.5pt] border-black px-3 py-1 text-center">
                                        No
                                    </td>
                                    <td
                                        colSpan={3}
                                        className="font-arial border-[0.5pt] border-black px-3 py-1 text-center"
                                    >
                                        Uraian
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        rowSpan={2}
                                        className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top"
                                    >
                                        I
                                    </td>
                                    <td
                                        colSpan={3}
                                        className="font-arial border-[0.5pt] border-black px-3 py-1 align-top"
                                    >
                                        SPD
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="font-arial border-[0.5pt] border-black"
                                    >
                                        <table className="w-full border-collapse">
                                            <tbody>
                                                <tr>
                                                    <td className="font-arial w-[25%] border-r border-black px-3 py-1">
                                                        Tanggal: 04 Februari
                                                        2024
                                                    </td>
                                                    <td className="font-arial w-[50%] border-r border-black px-3 py-1">
                                                        Nomor:
                                                        DPA/A.1/1.02.0.00.0.00.01.0000/002/2024
                                                    </td>
                                                    <td className="font-arial w-[25%] px-3 py-1 text-right">
                                                        Rp{' '}
                                                        {formatAngkaDecimal(
                                                            22_000_000_000
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        rowSpan={2}
                                        className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top"
                                    >
                                        II
                                    </td>
                                    <td
                                        colSpan={3}
                                        className="font-arial border-[0.5pt] border-black px-3 py-1 align-top"
                                    >
                                        SP2D Sebelumnya
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan={3}
                                        className="font-arial border-[0.5pt] border-black"
                                    >
                                        <table className="w-full">
                                            <tbody>
                                                <tr>
                                                    <td className="font-arial w-[25%] border-r border-black px-3 py-1">
                                                        Tanggal: -
                                                    </td>
                                                    <td className="font-arial w-[50%] border-r border-black px-3 py-1">
                                                        Nomor: -
                                                    </td>
                                                    <td className="font-arial w-[25%] px-3 py-1 text-right"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan={4}
                                        style={{ fontSize: '7pt' }}
                                        className="font-arial border-[0.5pt] border-black px-3 py-1 text-center align-top"
                                    >
                                        Pada SPP ini ditetapkan
                                        lampiran-lampiran yang diperlukan
                                        sebagaimana tertera pada daftar
                                        kelengkapan dokumen SPP ini.
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="font-arial border-[0.5pt] border-black px-3 py-5 text-center align-top"
                                    >
                                        <div className="flex w-full flex-row">
                                            <div className="font-arial w-1/2">
                                                <div className="font-arial mt-4">
                                                    Pejabat Pelaksana Teknis
                                                    Kegiatan BLUD,
                                                </div>
                                                <div className="font-arial mt-14 underline">
                                                    Hadi Machbudiansyah, SE, MM.
                                                </div>
                                                <div className="font-arial">
                                                    Pembina
                                                </div>
                                                <div className="font-arial">
                                                    NIP. 197509111994021001
                                                </div>
                                            </div>
                                            <div className="font-arial w-1/2">
                                                <div className="font-arial">
                                                    Samarinda,{' '}
                                                    {formatTanggal(
                                                        spp.tglDokumen
                                                    )}
                                                </div>
                                                <div className="font-arial">
                                                    Bendahara Pengeluaran
                                                    Pembantu BLUD,
                                                </div>
                                                <div className="font-arial mt-14 underline">
                                                    Moh. Walid Arkham Sani,
                                                    A.Md.Pnl
                                                </div>
                                                <div className="font-arial">
                                                    Pengatur
                                                </div>
                                                <div className="font-arial">
                                                    NIP. 200008062022011001
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handlePrint}>Cetak</Button>
            </CardFooter>
        </Card>
    )
}
