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
import { formatAngka } from '@/web/lib/utils'

export default function EditPage() {
    const params = useParams<{ belanjaId: string }>()

    const {
        data: belanja,
        isError,
        isLoading,
    } = api.belanja.getById.useQuery(Number(params.belanjaId))

    const componentRef = React.useRef(null)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    if (isLoading) return <Loading />

    if (isError) return <Navigate to={`/belanja/perekaman`} replace />

    if (!belanja) return <Navigate to={`/belanja/perekaman`} replace />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cetak Amplop</CardTitle>
                <CardDescription>
                    Cover amplop belanja siap cetak
                </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-5">
                <div className="w-full rounded-md border p-10 shadow">
                    <div style={{ fontSize: '9pt' }} ref={componentRef}>
                        <style>
                            {`
                                @media print {
                                    @page {
                                        size: 241mm 105mm;
                                        margin-top: 1cm;
                                        margin-left: 3cm;
                                        margin-right: 1.5cm;
                                        margin-bottom: 1cm;
                                   
                                    }
                                }
                            `}
                        </style>
                        <table className="mt-3 w-full">
                            <tbody>
                                <tr>
                                    <td className="w-16 font-serif">
                                        <img
                                            src="/images/logo-kaltimprov.webp"
                                            className="h-12 w-10"
                                        />
                                    </td>
                                    <td>
                                        <div className="-my-1 font-serif font-bold uppercase">
                                            Pemerintah Provinsi Kalimantan Timur
                                        </div>
                                        <div
                                            style={{ fontSize: '12pt' }}
                                            className="-my-1 font-serif font-bold uppercase"
                                        >
                                            BLUD Rumah Sakit Jiwa Daerah Atma
                                            Husada Mahakam
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="mt-5 w-full">
                            <tr>
                                <td className="w-28 align-top font-serif">
                                    Yth.
                                </td>
                                <td className="w-3 align-top">:</td>
                                <td className="align-top">
                                    {belanja.rekanan && (
                                        <div className="font-serif font-bold">
                                            {belanja.rekanan?.nama}
                                        </div>
                                    )}
                                    {belanja.pegawai && (
                                        <>
                                            <div className="font-serif font-bold">
                                                {belanja.pegawai.gelarDepan &&
                                                    `${belanja.pegawai.gelarDepan} `}
                                                {belanja.pegawai.nama}
                                                {belanja.pegawai
                                                    .gelarBelakang &&
                                                    `, ${belanja.pegawai.gelarBelakang}`}
                                            </div>
                                            <>
                                                {belanja.pegawai.nip && (
                                                    <div className="font-serif">
                                                        NIP.{' '}
                                                        {belanja.pegawai.nip}
                                                    </div>
                                                )}
                                            </>
                                        </>
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="align-top font-serif">
                                    Pembayaran
                                </td>
                                <td className="align-top">:</td>
                                <td className="align-top font-serif">
                                    {belanja.uraian}
                                </td>
                            </tr>

                            {belanja.potonganBelanja.length > 0 ? (
                                <>
                                    <tr>
                                        <td className="font-serif">
                                            Jumlah Bruto
                                        </td>
                                        <td>:</td>
                                        <td className="font-serif">
                                            {formatAngka(belanja.jumlah)}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="align-top font-serif">
                                            Potongan
                                        </td>
                                        <td className="align-top">:</td>
                                        {belanja.potonganBelanja.length > 1 ? (
                                            <td className="font-serif">
                                                <table>
                                                    {belanja.potonganBelanja.map(
                                                        (potongan) => (
                                                            <tr>
                                                                <td className="font-serif">
                                                                    {
                                                                        potongan.jenis
                                                                    }
                                                                </td>
                                                                <td>:</td>
                                                                <td className="text-right font-serif">
                                                                    {formatAngka(
                                                                        potongan.jumlah
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                    <tr className="border-t border-black">
                                                        <td className="w-28 font-serif">
                                                            Jumlah Potongan
                                                        </td>
                                                        <td className="w-3">
                                                            :
                                                        </td>
                                                        <td className="font-serif">
                                                            {formatAngka(
                                                                belanja.potonganBelanja?.reduce(
                                                                    (
                                                                        acc,
                                                                        potongan
                                                                    ) =>
                                                                        acc +
                                                                        Number(
                                                                            potongan.jumlah
                                                                        ),
                                                                    0
                                                                )
                                                            )}
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        ) : (
                                            <td>
                                                <table>
                                                    {belanja.potonganBelanja.map(
                                                        (potongan) => (
                                                            <tr>
                                                                <td className="w-28 font-serif">
                                                                    {
                                                                        potongan.jenis
                                                                    }
                                                                </td>
                                                                <td className="w-3">
                                                                    :
                                                                </td>
                                                                <td className="text-right font-serif">
                                                                    {formatAngka(
                                                                        potongan.jumlah
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </table>
                                            </td>
                                        )}
                                    </tr>
                                    <tr>
                                        <td className="font-serif">
                                            Jumlah Bersih
                                        </td>
                                        <td>:</td>
                                        <td className="font-serif">
                                            {formatAngka(
                                                Number(belanja.jumlah) -
                                                    belanja.potonganBelanja?.reduce(
                                                        (acc, potongan) =>
                                                            acc +
                                                            Number(
                                                                potongan.jumlah
                                                            ),
                                                        0
                                                    )
                                            )}
                                        </td>
                                    </tr>
                                </>
                            ) : (
                                <tr>
                                    <td className="font-serif">Jumlah</td>
                                    <td>:</td>
                                    <td className="font-serif">
                                        {formatAngka(belanja.jumlah)}
                                    </td>
                                </tr>
                            )}
                        </table>
                    </div>
                </div>
                <div className="w-1/5 flex-shrink-0">
                    <p className="mb-2 text-sm font-semibold">
                        Panduan Setting Cetak:
                    </p>
                    <img
                        src="/images/guidances/cetak-amplop.png"
                        alt="panduan cetak"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handlePrint}>Cetak</Button>
            </CardFooter>
        </Card>
    )
}
