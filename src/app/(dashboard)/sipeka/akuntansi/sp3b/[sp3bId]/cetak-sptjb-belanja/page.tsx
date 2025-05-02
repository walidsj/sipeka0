import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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

    const { data: sp3b, isError, isLoading } = api.sp3b.getById.useQuery(Number(params.sp3bId))

    const componentRef = React.useRef(null)
    const handlePrint = useReactToPrint({ contentRef: componentRef })

    if (isLoading) return <Loading />

    if (isError) return <NotFound />

    if (!sp3b) return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cetak SPTJB Belanja</CardTitle>
                <CardDescription>Dokumen Surat Pertanggungjawaban Belanja</CardDescription>
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

                        <h5
                            style={{ fontSize: '12pt' }}
                            className="text-center font-serif font-bold uppercase underline"
                        >
                            Surat Pernyataan Tanggung Jawab (SPTJB)
                        </h5>
                        <h4 className="mb-5 text-center font-serif">Nomor: {sp3b.noDokumen}/SPTJB/RSJDAHM-BLUD</h4>
                        <p className="mb-5 text-justify indent-10 font-serif leading-5">
                            Sehubungan dengan pengeluaran belanja BLUD RSJD Atma Husada Mahakam pada periode{' '}
                            {formatTanggal(sp3b.tglMulai)} s.d. {formatTanggal(sp3b.tglSelesai)} tahun{' '}
                            {Intl.DateTimeFormat('id-ID', { year: 'numeric' }).format(new Date(sp3b.tglDokumen!))}{' '}
                            sebesar Rp.{' '}
                            {formatAngkaDecimal(
                                Number(sp3b.belanja.modal + sp3b.belanja.barjas + sp3b.belanja.pegawai)
                            )}{' '}
                            ({terbilang(Number(sp3b.belanja.modal + sp3b.belanja.barjas + sp3b.belanja.pegawai))}{' '}
                            rupiah) yang berasal dari belanja antara lain Belanja Pegawai, Belanja Barang dan Jasa, dan
                            Belanja Modal adalah tanggung jawab kami, dengan rincian sebagai berikut:
                        </p>
                        <table className="mb-5 w-full">
                            <thead>
                                <tr>
                                    <th rowSpan={2} className="w-10 border-[0.5pt] border-black px-3 py-2 font-serif">
                                        No
                                    </th>
                                    <th colSpan={3} className="border-[0.5pt] border-black px-3 py-2 font-serif">
                                        Uraian
                                    </th>
                                    <th rowSpan={2} className="border-[0.5pt] border-black px-3 py-2 font-serif">
                                        Jumlah
                                    </th>
                                </tr>
                                <tr>
                                    <th className="w-1/4 border-[0.5pt] border-black px-3 py-2 font-serif">
                                        Belanja Pegawai
                                    </th>
                                    <th className="w-1/4 border-[0.5pt] border-black px-3 py-2 font-serif">
                                        Belanja Barang dan Jasa
                                    </th>
                                    <th className="w-1/4 border-[0.5pt] border-black px-3 py-2 font-serif">
                                        Belanja Modal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-2 text-center font-serif">1.</td>
                                    <td className="border-[0.5pt] border-black px-3 py-2 text-right font-serif">
                                        {formatAngkaDecimal(sp3b.belanja.pegawai)}
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-2 text-right font-serif">
                                        {formatAngkaDecimal(sp3b.belanja.barjas)}
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-2 text-right font-serif">
                                        {formatAngkaDecimal(sp3b.belanja.modal)}
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-2 text-right font-serif">
                                        {formatAngkaDecimal(
                                            Number(sp3b.belanja.modal + sp3b.belanja.barjas + sp3b.belanja.pegawai)
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="mb-2 text-justify indent-10 font-serif leading-5">
                            Pengeluaran biaya tersebut di atas telah dilaksanakan dan dikelola berdasarkan sistem
                            pengendalian intern yang memadai dalam kerangka pelaksanaan DPA, dan dibukukan sesuai dengan
                            Standar Akuntansi yang berlaku pada BLUD dan bukti-bukti pengeluaran yang ada pada kami.
                        </p>
                        <p className="mb-5 text-justify indent-10 font-serif leading-5">
                            Demikian surat pernyataan ini dibuat untuk melengkapi persyaratan pengajuan SP3B RSJD Atma
                            Husada Mahakam.
                        </p>
                        <div className="mb-5 flex w-full flex-row">
                            <div className="w-full" />
                            <div className="w-3/5 text-justify font-serif">
                                <div className="font-serif">Samarinda, {formatTanggal(sp3b.tglDokumen)}</div>
                                <div className="font-serif">{sp3b.penandatangan?.jabatan},</div>
                                <div className="mt-14 font-serif underline">
                                    {sp3b.penandatangan?.gelarDepan && `${sp3b.penandatangan?.gelarDepan} `}
                                    {sp3b.penandatangan?.nama}
                                    {sp3b.penandatangan?.gelarBelakang && `, ${sp3b.penandatangan?.gelarBelakang}`}
                                </div>
                                <div className="font-serif">Pembina Utama Muda</div>
                                <div className="font-serif">NIP. {sp3b.penandatangan?.nip}</div>
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
