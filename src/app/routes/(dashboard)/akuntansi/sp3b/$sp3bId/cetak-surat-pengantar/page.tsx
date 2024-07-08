import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import { Navigate, useParams } from 'react-router-dom'
import { api } from '@/web/trpc/react'
import Loading from '@/web/components/loading'
import { useReactToPrint } from 'react-to-print'
import React from 'react'
import { Button } from '@/web/components/ui/button'
import { formatTanggal } from '@/web/lib/utils'

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

    if (isError) return <Navigate to="/akuntansi/sp3b" replace />

    if (!sp3b) return <Navigate to="/akuntansi/sp3b" replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cetak Surat Pengantar</CardTitle>
                <CardDescription>Dokumen Surat Pengantar SP3B</CardDescription>
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
                        <table className="mt-3 w-full">
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
                        <div className="mb-5 flex w-full flex-row">
                            <div className="w-full" />
                            <div className="w-3/5 text-justify font-serif">
                                Samarinda, {formatTanggal(sp3b.tglDokumen)}
                                <br />
                                <br />
                                Kepada
                                <br />
                                <span className="-ml-6 font-serif">
                                    Yth. Pj. Gubernur Kalimantan Timur
                                </span>
                                <br />
                                c.q. Kepala Badan Pengelolaan Keuangan dan Aset
                                Daerah
                                <br />
                                Provinsi Kalimantan Timur
                                <br />
                                di -
                                <br />
                                <span className="ml-6 font-serif underline">
                                    Samarinda
                                </span>
                            </div>
                        </div>
                        <h5
                            style={{ fontSize: '12pt' }}
                            className="text-center font-serif font-bold uppercase underline"
                        >
                            Surat Pengantar
                        </h5>
                        <h4 className="mb-5 text-center font-serif">
                            Nomor: {sp3b.noDokumen}/SP3B-BLUD/RSJD.AHM-KEU
                        </h4>
                        <table className="mb-5 w-full">
                            <thead>
                                <tr>
                                    <td className="w-10 border border-black px-3 py-3 text-center font-serif uppercase">
                                        No
                                    </td>
                                    <td className="w-auto border border-black px-3 py-3 text-center font-serif uppercase">
                                        Uraian
                                    </td>
                                    <td className="w-1/4 border border-black px-3 py-3 text-center font-serif uppercase">
                                        Banyaknya
                                    </td>
                                    <td className="w-auto border border-black px-3 py-3 text-center font-serif uppercase">
                                        Keterangan
                                    </td>
                                </tr>
                                <tr className="italic">
                                    <td className="border border-black px-3 text-center font-serif uppercase">
                                        1
                                    </td>
                                    <td className="border border-black px-3 text-center font-serif uppercase">
                                        2
                                    </td>
                                    <td className="border border-black px-3 text-center font-serif uppercase">
                                        3
                                    </td>
                                    <td className="border border-black px-3 text-center font-serif uppercase">
                                        4
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <td className="border border-black px-3 pb-5 pt-2 text-center align-top font-serif">
                                    1.
                                </td>
                                <td className="border border-black px-3 pb-5 pt-2 text-justify align-top font-serif">
                                    Bersama ini terlampir Surat Perintah
                                    Pengesahan Pendapatan dan Belanja (SP3B)
                                    BLUD Rumah Sakit Jiwa Daerah Atma Husada
                                    Mahakam untuk {formatTanggal(sp3b.tglMulai)}{' '}
                                    s.d. {formatTanggal(sp3b.tglSelesai)} Tahun
                                    Anggaran 2024
                                </td>
                                <td className="border border-black px-3 pb-5 pt-2 text-center align-top font-serif">
                                    1 (satu) berkas
                                </td>
                                <td className="border border-black px-3 pb-5 pt-2 text-justify align-top font-serif">
                                    Disampaikan dengan hormat untuk dapat
                                    diproses penerbitan Surat Pengesahan
                                    Pendapatan dan Belanja (SP3B)
                                </td>
                            </tbody>
                        </table>
                        <p className="mb-5 font-serif">
                            Demikian disampaikan, atas kerjasamanya diucapkan
                            terima kasih.
                        </p>
                        <div className="mb-5 flex w-full flex-row">
                            <div className="w-full" />
                            <div className="w-3/5 text-justify font-serif">
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
