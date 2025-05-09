import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useParams } from 'react-router-dom'
import { api } from '@/trpc/react'
import Loading from '@/components/loading'
import { useReactToPrint } from 'react-to-print'
import React from 'react'
import { Button } from '@/components/ui/button'
import { formatAngka } from '@/lib/utils'
import NotFound from '@/app/not-found'

export default function Page() {
    const params = useParams<{ belanjaId: string }>()

    const { data: belanja, isError, isLoading } = api.belanja.getById.useQuery(Number(params.belanjaId))

    const componentRef = React.useRef(null)
    const handlePrint = useReactToPrint({ contentRef: componentRef })

    if (isLoading) return <Loading />

    if (isError) return <NotFound />

    if (!belanja) return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cetak Daftar Penerima</CardTitle>
                <CardDescription>Dokumen daftar penerima dan potongan belanja siap cetak</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border p-10 shadow">
                    <div
                        style={{
                            fontSize: '9pt',
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
                        <table className="mt-3 w-full">
                            <tbody>
                                <tr>
                                    <td className="w-16 font-serif">
                                        <img src="/images/logo-kaltimprov.webp" className="h-20 w-24" />
                                    </td>
                                    <td className="text-center">
                                        <div style={{ fontSize: '12pt' }} className="font-serif font-bold uppercase">
                                            Pemerintah Provinsi Kalimantan Timur
                                        </div>
                                        <div style={{ fontSize: '12pt' }} className="font-serif font-bold uppercase">
                                            Dinas Kesehatan
                                        </div>
                                        <div className="font-serif text-lg font-bold uppercase">
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
                        <hr className="mt-3 border-b-4 border-double border-black" />
                        <p style={{ fontSize: '12pt' }} className="mt-6 text-center font-serif font-bold uppercase">
                            Daftar Penerima
                        </p>
                        <p className="px-10 text-center font-serif text-sm font-bold uppercase">
                            {belanja.uraian?.split('a.n.')[0]}
                        </p>
                        <table className="mt-3 w-full">
                            <thead className="text-center font-bold">
                                <tr>
                                    <td className="w-1 border border-black px-1.5 py-2 font-serif">No.</td>
                                    <td className="border border-black px-1.5 py-2 font-serif">Nama</td>
                                    <td className="w-1 border border-black px-1.5 py-2 font-serif">Kode Rek</td>
                                    <td className="border border-black px-1.5 py-2 font-serif">
                                        Jumlah
                                        <br />
                                        (Rp)
                                    </td>
                                    <td className="border border-black px-1.5 py-2 font-serif">Potongan</td>
                                    <td className="border border-black px-1.5 py-2 font-serif">
                                        Jumlah Bersih
                                        <br />
                                        (Rp)
                                    </td>
                                    <td className="border border-black px-1.5 py-2 font-serif">Tanda Tangan</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border border-black px-1.5 py-2 text-center font-serif">1.</td>
                                    <td className="border border-black px-1.5 py-2 font-serif">
                                        {belanja.pegawai && (
                                            <p className="font-serif">
                                                {belanja.pegawai.gelarDepan && `${belanja.pegawai.gelarDepan} `}
                                                {belanja.pegawai.nama}
                                                {belanja.pegawai.gelarBelakang && `, ${belanja.pegawai.gelarBelakang}`}
                                            </p>
                                        )}
                                        {belanja.rekanan && <p className="font-serif">{belanja.rekanan.nama}</p>}
                                    </td>
                                    <td
                                        style={{
                                            fontSize: '8pt',
                                        }}
                                        className="border border-black px-1.5 py-2 text-center font-serif"
                                    >
                                        {belanja.rab?.kodeRekening}
                                    </td>
                                    <td className="border border-black px-1.5 py-2 text-right font-serif">
                                        {formatAngka(belanja.jumlah)}
                                    </td>
                                    <td className="border border-black px-1.5 py-2 text-right font-serif">
                                        {belanja.potonganBelanja.length > 0 ? (
                                            <table className="w-full">
                                                {belanja.potonganBelanja.map((potongan, index) => (
                                                    <tr key={index}>
                                                        <td className="text-left font-serif">{potongan.jenis}</td>
                                                        <td className="text-right font-serif">
                                                            {formatAngka(potongan.jumlah)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </table>
                                        ) : (
                                            '0'
                                        )}
                                    </td>
                                    <td className="border border-black px-1.5 py-2 text-right font-serif">
                                        {formatAngka(
                                            Number(belanja.jumlah) -
                                                Number(
                                                    belanja.potonganBelanja.reduce(
                                                        (acc, curr) => acc + Number(curr.jumlah),
                                                        0
                                                    )
                                                )
                                        )}
                                    </td>
                                    <td className="border border-black px-1.5 py-2 font-serif"></td>
                                </tr>
                            </tbody>
                            <tfoot className="font-bold">
                                <tr>
                                    <td colSpan={3} className="border border-black px-1.5 py-2 font-serif">
                                        Total
                                    </td>
                                    <td className="border border-black px-1.5 py-2 text-right font-serif">
                                        {formatAngka(belanja.jumlah)}
                                    </td>
                                    <td className="border border-black px-1.5 py-2 text-right font-serif">
                                        {formatAngka(
                                            Number(
                                                belanja.potonganBelanja.reduce(
                                                    (acc, curr) => acc + Number(curr.jumlah),
                                                    0
                                                )
                                            )
                                        )}
                                    </td>
                                    <td className="border border-black px-1.5 py-2 text-right font-serif">
                                        {formatAngka(
                                            Number(belanja.jumlah) -
                                                Number(
                                                    belanja.potonganBelanja.reduce(
                                                        (acc, curr) => acc + Number(curr.jumlah),
                                                        0
                                                    )
                                                )
                                        )}
                                    </td>
                                    <td className="border border-black px-1.5 py-2 font-serif"></td>
                                </tr>
                            </tfoot>
                        </table>
                        <div
                            style={{
                                fontSize: '8.5pt',
                            }}
                            className="mt-5 flex"
                        >
                            <div className="w-1/3">
                                <div className="font-serif">Disetujui dibayar:</div>
                                <div className="font-serif">Kuasa Pengguna Anggaran</div>
                                <div className="mt-14 font-serif font-bold">dr. Indah Puspitasari, MARS</div>
                                <div className="font-serif">Pembina Utama Muda</div>
                                <div className="font-serif">NIP. 196705301998032003</div>
                            </div>
                            <div className="w-1/3">
                                <div className="font-serif">Mengetahui:</div>
                                <div className="font-serif">PPTK BLUD</div>
                                <div className="mt-14 font-serif font-bold">Sudoto, S.Kom</div>
                                <div className="font-serif">Pembina</div>
                                <div className="font-serif">NIP. 197509111994021001</div>
                            </div>
                            <div className="w-1/3">
                                <div className="font-serif">Samarinda,</div>
                                <div className="font-serif">Bendahara Pengeluaran Pembantu BLUD</div>
                                <div className="mt-14 font-serif font-bold">Riandy S.Kep</div>
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
