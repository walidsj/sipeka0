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
    const params = useParams<{ sp2dId: string }>()

    const { data: sp2d, isError, isLoading } = api.sp2d.getById.useQuery(Number(params.sp2dId))

    const componentRef = React.useRef(null)
    const handlePrint = useReactToPrint({ contentRef: componentRef })

    if (isLoading) return <Loading />

    if (isError) return <NotFound />

    if (!sp2d) return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cetak Lembar Kendali Permintaan Cek</CardTitle>
                <CardDescription>Dokumen Lembar Kendali Permintaan Cek</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border p-10 shadow">
                    <div className="text-[8pt] leading-[11pt]" ref={componentRef}>
                        <style type="text/css" media="print">
                            {`
                                @page {
                                    size: A4 landscape;
                                    margin-top: 1.5cm;
                                    margin-left: 2cm;
                                    margin-right: 2cm;
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
                                        <div
                                            style={{ fontSize: '12pt' }}
                                            className="font-serif leading-5 font-bold uppercase"
                                        >
                                            Pemerintah Provinsi Kalimantan Timur
                                        </div>
                                        <div
                                            style={{ fontSize: '14pt' }}
                                            className="font-serif leading-5 font-bold uppercase"
                                        >
                                            Dinas Kesehatan
                                        </div>
                                        <div
                                            style={{ fontSize: '14pt' }}
                                            className="font-serif leading-5 font-bold uppercase"
                                        >
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
                        <hr className="mt-3 mb-5 border-b-4 border-double border-black" />
                        <h5 style={{ fontSize: '11pt' }} className="text-center font-serif font-bold uppercase">
                            LEMBAR KENDALI PERMINTAAN CEK UNTUK PENGAMBILAN UANG
                        </h5>
                        <h4 className="mb-5 text-center font-serif">
                            Pada Rekening BLUD RUMAH SAKIT JIWA DAERAH ATMA HUSADA MAHAKAM
                            <br />
                            Tahun Anggaran{' '}
                            {Intl.DateTimeFormat('id', {
                                year: 'numeric',
                            }).format(sp2d.tglDokumen || new Date())}
                        </h4>
                        <table className="mb-5 w-[calc(100%-2px)]">
                            <thead className="border-b-2 border-double border-black">
                                <tr>
                                    <th className="w-10 border border-black px-2 py-3 text-center font-serif">No</th>
                                    <th className="border border-black px-2 py-3 text-center font-serif">Tanggal</th>
                                    <th className="border border-black px-2 py-3 text-center font-serif">Nomor Cek</th>
                                    <th className="border border-black px-2 py-3 text-center font-serif">
                                        Nomor Rekening
                                    </th>
                                    <th className="border border-black px-2 py-3 text-center font-serif">
                                        Jumlah Uang yang Dicairkan
                                    </th>
                                    <th className="border border-black px-2 py-3 text-center font-serif">
                                        Uraian Penggunaan
                                    </th>
                                    <th className="border border-black px-2 py-3 text-center font-serif">
                                        Nilai Rencana
                                    </th>
                                    <th className="border border-black px-2 py-3 text-center font-serif">
                                        Nilai Realisasi
                                    </th>
                                    <th className="border border-black px-2 py-3 text-center font-serif">
                                        Jumlah Sisa
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <td className="border border-black px-2 py-1 text-center align-top font-serif">1.</td>
                                <td className="border border-black px-2 py-1 text-center align-top font-serif">
                                    {Intl.DateTimeFormat('id', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                    }).format(sp2d.tglDokumen || new Date())}
                                </td>
                                <td className="border border-black px-2 py-1 text-center align-top font-serif">
                                    {sp2d.noCek}
                                </td>
                                <td className="border border-black px-2 py-1 text-center align-top font-serif">
                                    PT BPD KALTIM KALTARA
                                    <br />
                                    A/C
                                    <br />
                                    0011536760
                                </td>
                                <td className="border border-black px-2 py-1 text-right align-top font-serif">
                                    {formatAngkaDecimal(
                                        sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                                            (acc, item) => acc + Number(item.jumlah),
                                            0
                                        )
                                    )}
                                </td>
                                <td className="border border-black px-2 py-1 align-top font-serif">
                                    {sp2d.spm.spp.lpjBelanja.uraian}
                                </td>
                                <td className="border border-black px-2 py-1 text-right align-top font-serif">
                                    {formatAngkaDecimal(
                                        sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                                            (acc, item) => acc + Number(item.jumlah),
                                            0
                                        )
                                    )}
                                </td>
                                <td className="border border-black px-2 py-1 text-right align-top font-serif">
                                    {formatAngkaDecimal(
                                        sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                                            (acc, item) => acc + Number(item.jumlah),
                                            0
                                        )
                                    )}
                                </td>
                                <td className="border border-black px-2 py-1 text-right align-top font-serif">
                                    {formatAngkaDecimal(
                                        sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                                            (acc, item) => acc + Number(item.jumlah),
                                            0
                                        ) -
                                            sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                                                (acc, item) => acc + Number(item.jumlah),
                                                0
                                            )
                                    )}
                                </td>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th
                                        rowSpan={2}
                                        colSpan={6}
                                        className="border border-black px-2 py-1 text-center font-serif"
                                    >
                                        Jumlah
                                    </th>
                                    <th className="border border-black px-2 py-1 text-right font-serif">
                                        {formatAngkaDecimal(
                                            sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                                                (acc, item) => acc + Number(item.jumlah),
                                                0
                                            )
                                        )}
                                    </th>
                                    <th className="border border-black px-2 py-1 text-right font-serif">
                                        {formatAngkaDecimal(
                                            sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                                                (acc, item) => acc + Number(item.jumlah),
                                                0
                                            )
                                        )}
                                    </th>
                                    <th className="border border-black px-2 py-1 text-right font-serif">
                                        {formatAngkaDecimal(
                                            sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                                                (acc, item) => acc + Number(item.jumlah),
                                                0
                                            ) -
                                                sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                                                    (acc, item) => acc + Number(item.jumlah),
                                                    0
                                                )
                                        )}
                                    </th>
                                </tr>
                                <tr>
                                    <td colSpan={3} className="border border-black px-2 py-1 font-serif italic">
                                        Terbilang:{' '}
                                        {terbilang(
                                            sp2d.spm.spp.lpjBelanja?.belanja?.reduce(
                                                (acc, item) => acc + Number(item.jumlah),
                                                0
                                            )
                                        )}{' '}
                                        Rupiah
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="mb-5 flex w-full flex-row">
                            <div className="w-1/3 text-center font-serif">
                                <div className="font-serif">Menyetujui:</div>
                                <div className="font-serif">Kuasa Pengguna Anggaran</div>
                                <div className="mt-12 font-serif underline">dr. Indah Puspitasari, MARS</div>
                                <div className="font-serif">Pembina Utama Muda</div>
                                <div className="font-serif">NIP. 196705301998032003</div>
                            </div>
                            <div className="w-1/3 text-center font-serif">
                                <div className="font-serif">Mengetahui:</div>
                                <div className="font-serif">PPTK BLUD</div>
                                <div className="mt-12 font-serif underline">Sudoto, S.Kom</div>
                                <div className="font-serif">Pembina</div>
                                <div className="font-serif">NIP. 197407291994021002</div>
                            </div>
                            <div className="w-1/3 text-center font-serif">
                                <div className="font-serif">Samarinda, {formatTanggal(sp2d.tglDokumen)}</div>
                                <div className="font-serif">Bendahara Pengeluaran Pembantu BLUD</div>
                                <div className="mt-12 font-serif underline">Riandy, S.Kep</div>
                                <div className="font-serif">Penata Tk. I</div>
                                <div className="font-serif">NIP. 197901281999031003</div>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={() => handlePrint()}>Cetak</Button>
            </CardFooter>
        </Card>
    )
}
