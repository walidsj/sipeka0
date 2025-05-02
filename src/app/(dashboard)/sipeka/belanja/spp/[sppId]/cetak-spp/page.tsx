import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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

    const { data: spp, isError, isLoading } = api.spp.getById.useQuery(Number(params.sppId))

    const componentRef = React.useRef(null)
    const handlePrint = useReactToPrint({ contentRef: componentRef })

    if (isLoading) return <Loading />

    if (isError) return <NotFound />

    if (!spp) return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cetak SPP</CardTitle>
                <CardDescription>Dokumen SPP</CardDescription>
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
                            <div className="text-center font-serif text-[11pt] leading-[15pt] font-semibold uppercase">
                                Provinsi Kalimantan Timur
                            </div>
                            <div className="text-center font-serif text-[11pt] leading-[15pt] font-semibold uppercase">
                                Dinas Kesehatan
                            </div>
                            <div className="text-center font-serif text-base leading-[15pt] font-semibold uppercase">
                                Rumah Sakit Jiwa Daerah Atma Husada Mahakam
                            </div>
                            <div className="mt-3 text-center font-serif text-[12pt] leading-[15pt] font-semibold uppercase">
                                Surat Permintaan Pembayaran (SPP)
                            </div>
                            <div className="text-center font-serif text-[10pt]">
                                Nomor: 900.1.3.5/{spp.noDokumen}/{spp.lpjBelanja?.jenis}
                                /SPP/RSJD-AHM/BLUD
                            </div>
                            <div className="mt-2 text-center font-serif text-[10pt]">
                                Tahun Anggaran{' '}
                                {Intl.DateTimeFormat('id-ID', {
                                    year: 'numeric',
                                }).format(spp.tglDokumen || new Date())}
                            </div>
                        </div>
                        <table className="mb-5 w-[calc(100%-2px)] border-collapse">
                            <thead>
                                <tr>
                                    <th
                                        colSpan={4}
                                        className="border-[0.5pt] border-black px-3 py-2 font-serif font-bold"
                                    >
                                        {spp.lpjBelanja?.jenis === 'LS'
                                            ? 'Langsung'
                                            : spp.lpjBelanja?.jenis === 'GU'
                                              ? 'Ganti Uang Persediaan'
                                              : spp.lpjBelanja?.jenis === 'TU'
                                                ? 'Tambah Uang Persediaan'
                                                : ''}{' '}
                                        {spp.lpjBelanja?.jenis === 'LS' &&
                                            spp.lpjBelanja?.belanja.map((item) => (
                                                <>{item.rab?.kodeRekening?.startsWith('5.1.01') && 'Pegawai'}</>
                                            ))}
                                        {spp.lpjBelanja?.jenis === 'LS' &&
                                            spp.lpjBelanja?.belanja.map((item) => (
                                                <>{item.rab?.kodeRekening?.startsWith('5.1.02') && 'Barang dan Jasa'}</>
                                            ))}
                                        {spp.lpjBelanja?.jenis === 'LS' &&
                                            spp.lpjBelanja?.belanja.map((item) => (
                                                <>{item.rab?.kodeRekening?.startsWith('5.2') && 'Modal'}</>
                                            ))}
                                    </th>
                                </tr>
                                <tr>
                                    <th
                                        colSpan={4}
                                        className="border-[0.5pt] border-black px-3 py-2 font-serif font-bold"
                                    >
                                        SPP-{spp.lpjBelanja?.jenis}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="w-1 border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        1.
                                    </td>
                                    <td className="w-1/4 border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        SKPD
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        :
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        Dinas Kesehatan
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        2.
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        Unit SKPD
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        :
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        RSJD Atma Husada Mahakam
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        3.
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        Pengguna Anggaran
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        :
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        Dr. dr. H. Jaya Mualimin, Sp.KJ, M.Kes, MARS
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        4.
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        Kuasa Pengguna Anggaran
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        :
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        dr. Indah Puspitasari, MARS
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        5.
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        Bendahara Pengeluaran Pembantu BLUD
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        :
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        Riandy, S.Kep
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        6.
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        NPWP Bendahara Pengeluaran Pembantu BLUD
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        :
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        953350162722000
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        7.
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        Nama Bank
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        :
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        PT BPD KALTIM KALTARA
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        8.
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        Nomor Rekening Bank
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        :
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        0011445004
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        9.
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        Nama di Rekening Bank
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        :
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        BP BLUD RSJD AHM
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        10.
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        Untuk Keperluan
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        :
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        {spp.lpjBelanja?.uraian}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        11.
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        Dasar Pengeluaran
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif">
                                        :
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        DPA/A.1/1.02.0.00.0.00.01.0000/001/2025
                                        <br />
                                        Tanggal: 31 Desember 2024
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif"></td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif"></td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif"></td>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif">
                                        Sebesar: Rp{' '}
                                        {formatAngkaDecimal(
                                            spp.lpjBelanja?.belanja.reduce((acc, item) => acc + Number(item.jumlah), 0)
                                        )}
                                        <br />
                                        (terbilang:{' '}
                                        {terbilang(
                                            spp.lpjBelanja?.belanja.reduce(
                                                (acc, item) => acc + Number(item.jumlah),
                                                0
                                            ) || 0
                                        )}{' '}
                                        Rupiah)
                                    </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-0.5 text-center font-serif">
                                        No
                                    </td>
                                    <td
                                        colSpan={3}
                                        className="border-[0.5pt] border-black px-3 py-0.5 text-center font-serif"
                                    >
                                        Uraian
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        rowSpan={2}
                                        className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif"
                                    >
                                        I
                                    </td>
                                    <td
                                        colSpan={3}
                                        className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif"
                                    >
                                        SPD
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="border-[0.5pt] border-black font-serif">
                                        <table className="-m-[1pt] w-full">
                                            <tbody>
                                                <tr>
                                                    <td className="w-[25%] border-r border-black px-3 py-0.5 font-serif">
                                                        Tanggal: 31 Desember 2024
                                                    </td>
                                                    <td className="w-[50%] border-r border-black px-3 py-0.5 font-serif">
                                                        Nomor: DPA/A.1/1.02.0.00.0.00.01.0000/001/2025
                                                    </td>
                                                    <td className="w-[25%] px-3 py-0.5 text-right font-serif">
                                                        Rp {formatAngkaDecimal(22_000_000_000)}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        rowSpan={2}
                                        className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif"
                                    >
                                        II
                                    </td>
                                    <td
                                        colSpan={3}
                                        className="border-[0.5pt] border-black px-3 py-0.5 align-top font-serif"
                                    >
                                        SP2D Sebelumnya
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="border-[0.5pt] border-black font-serif">
                                        <table className="-m-[1pt] w-full">
                                            <tbody>
                                                <tr>
                                                    <td className="w-[25%] border-r border-black px-3 py-0.5 font-serif">
                                                        Tanggal: -
                                                    </td>
                                                    <td className="w-[50%] border-r border-black px-3 py-0.5 font-serif">
                                                        Nomor: -
                                                    </td>
                                                    <td className="w-[25%] px-3 py-0.5 text-right font-serif"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan={4}
                                        style={{ fontSize: '7pt' }}
                                        className="border-[0.5pt] border-black px-3 py-0.5 text-center align-top font-serif"
                                    >
                                        Pada SPP ini ditetapkan lampiran-lampiran yang diperlukan sebagaimana tertera
                                        pada daftar kelengkapan dokumen SPP ini.
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="border-[0.5pt] border-black px-3 py-5 text-center align-top font-serif"
                                    >
                                        <div className="flex w-full flex-row">
                                            <div className="w-1/2 font-serif">
                                                <div className="mt-4 font-serif">
                                                    Pejabat Pelaksana Teknis Kegiatan BLUD,
                                                </div>
                                                <div className="mt-12 font-serif underline">Sudoto, S.Kom</div>
                                                <div className="font-serif">Pembina</div>
                                                <div className="font-serif">NIP. 197407291994021002</div>
                                            </div>
                                            <div className="w-1/2 font-serif">
                                                <div className="font-serif">
                                                    Samarinda, {formatTanggal(spp.tglDokumen)}
                                                </div>
                                                <div className="font-serif">Bendahara Pengeluaran Pembantu BLUD,</div>
                                                <div className="mt-12 font-serif underline">Riandy, S.Kep</div>
                                                <div className="font-serif">Penata Tk. I</div>
                                                <div className="font-serif">NIP. 197901281999031003</div>
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
                <Button onClick={() => handlePrint()}>Cetak</Button>
            </CardFooter>
        </Card>
    )
}
