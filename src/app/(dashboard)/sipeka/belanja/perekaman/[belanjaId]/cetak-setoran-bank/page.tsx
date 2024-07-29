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
import { terbilang, formatAngkaDecimal, ucFirst } from '@/lib/utils'
import NotFound from '@/app/not-found'
import { FaCheck } from 'react-icons/fa'

export default function Page() {
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

    if (isError) return <NotFound />

    if (!belanja) return <NotFound />

    const biayaAdmin =
        belanja.rekanan?.bank?.kode == '124' ||
        belanja.pegawai?.bank?.kode == '124'
            ? 0
            : 2900

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cetak Setoran Bank</CardTitle>
                <CardDescription>
                    Dokumen ini digunakan untuk mencetak setoran bank
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border p-10 shadow">
                    {biayaAdmin == 0 && (
                        <div ref={componentRef}>
                            <style type="text/css" media="print">
                                {`
                                @page {
                                    size: A4 portrait;
                                    margin-top: 2cm;
                                    margin-left: 5.5cm;
                                    margin-right: 5mm;
                                    margin-bottom: 1.5cm;
                                    color: red;
                                    
                                }
                            `}
                            </style>
                            <table className="w-[100%] font-bold">
                                <tbody>
                                    <tr>
                                        <td className="w-auto border border-transparent align-top">
                                            <table className="text-black-500 mt-[3mm] w-[80%] border-separate border-spacing-[0.75mm]">
                                                <tbody>
                                                    <tr>
                                                        <td className="h-[5mm] border border-transparent py-0 align-top text-[10pt] leading-[11pt]">
                                                            <FaCheck />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[5mm] border border-transparent py-0 pl-[4.35cm] align-top text-[10pt] leading-[11pt]">
                                                            <FaCheck />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[5mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]">
                                                            {
                                                                belanja.rekanan
                                                                    ?.noRekening
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[5mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]">
                                                            {
                                                                belanja.rekanan
                                                                    ?.namaRekening
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[5mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]">
                                                            {formatAngkaDecimal(
                                                                belanja.jumlah
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[8.5mm] border border-transparent py-0 align-top font-arial text-[7pt] leading-[8pt]">
                                                            {ucFirst(
                                                                terbilang(
                                                                    Number(
                                                                        belanja.jumlah
                                                                    )
                                                                )
                                                            )}{' '}
                                                            Rupiah
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[5mm] border border-transparent py-0 align-top font-arial text-[7pt] leading-[8pt]">
                                                            {belanja.uraian}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <p className="ml-[1cm] mt-[5mm] font-arial text-[8pt] leading-[9pt]">
                                                BLUD RSJD AHM
                                            </p>
                                        </td>
                                        <td className="w-[3.75cm] border border-transparent align-top">
                                            <table className="text-black-500 w-full border-separate border-spacing-[0.75mm]">
                                                <tbody>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]"></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top text-[10pt] leading-[11pt]">
                                                            <FaCheck />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]">
                                                            RSJD AHM /
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]">
                                                            Jl. Kakap No. 34
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]">
                                                            085172277277
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                    {biayaAdmin > 0 && (
                        <div ref={componentRef}>
                            <style type="text/css" media="print">
                                {`
                            @page {
                                size: A4 portrait;
                                margin-top: 2.5cm;
                                margin-left: 5cm;
                                margin-right: 1cm;
                                margin-bottom: 3.5cm;
                                
                            }
                        `}
                            </style>
                            <table className="w-[100%] font-bold">
                                <tbody>
                                    <tr>
                                        <td
                                            colSpan={2}
                                            className="h-[5mm] border border-transparent pl-[5.8cm] align-top text-[10pt] leading-[11pt]"
                                        >
                                            <FaCheck />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="w-auto border border-transparent align-top">
                                            <table className="text-black-500 mt-[4mm] w-[100%] border-separate border-spacing-[0.3mm]">
                                                <tbody>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[9pt] leading-[10pt]">
                                                            {
                                                                belanja.rekanan
                                                                    ?.namaRekening
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[6pt] leading-[5pt]">
                                                            {
                                                                belanja.rekanan
                                                                    ?.alamat
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]"></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]">
                                                            {
                                                                belanja.rekanan
                                                                    ?.noTelp
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]">
                                                            {
                                                                belanja.rekanan
                                                                    ?.bank?.nama
                                                            }{' '}
                                                            (
                                                            {
                                                                belanja.rekanan
                                                                    ?.bank?.kode
                                                            }
                                                            )
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]"></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 pl-[2mm] align-top font-arial text-[9pt] leading-[10pt]">
                                                            {
                                                                belanja.rekanan
                                                                    ?.noRekening
                                                            }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table className="text-black-500 mt-[5mm] w-[100%] border-separate border-spacing-[0.25mm]">
                                                <tbody>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]">
                                                            RSJD AHM /
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[7pt] leading-[8pt]">
                                                            Jl. Kakap No. 23
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]"></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]">
                                                            085172277277
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]"></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table className="text-black-500 mt-[6mm] w-[100%] border-separate border-spacing-[0.25mm]">
                                                <tbody>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 pl-[1.25cm] align-top font-arial text-[8pt] leading-[9pt]">
                                                            BLUD RSJD AHM
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                        <td className="w-[7.5cm] border border-transparent align-top">
                                            <table className="text-black-500 w-[100%] border-separate border-spacing-[0.25mm]">
                                                <tbody>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 pl-[1cm] align-top font-arial text-[8pt] leading-[9pt]">
                                                            <FaCheck />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="border border-transparent py-2 align-top font-arial text-[8pt] leading-[9pt]">
                                                            <FaCheck />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]"></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4.5mm] border border-transparent py-0 align-top font-arial text-[8pt] leading-[9pt]"></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4.5mm] border border-transparent py-0 text-right align-bottom font-arial text-[9pt] leading-[10pt]">
                                                            {formatAngkaDecimal(
                                                                Number(
                                                                    belanja.jumlah
                                                                ) -
                                                                    belanja.potonganBelanja.reduce(
                                                                        (
                                                                            acc,
                                                                            item
                                                                        ) =>
                                                                            acc +
                                                                            Number(
                                                                                item.jumlah
                                                                            ),
                                                                        0
                                                                    ) -
                                                                    biayaAdmin
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4.5mm] border border-transparent py-0 text-right align-bottom font-arial text-[9pt] leading-[10pt]">
                                                            {formatAngkaDecimal(
                                                                biayaAdmin
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[4.5mm] border border-transparent py-0 text-right align-bottom font-arial text-[9pt] leading-[10pt]">
                                                            {formatAngkaDecimal(
                                                                Number(
                                                                    belanja.jumlah
                                                                ) -
                                                                    belanja.potonganBelanja.reduce(
                                                                        (
                                                                            acc,
                                                                            item
                                                                        ) =>
                                                                            acc +
                                                                            Number(
                                                                                item.jumlah
                                                                            ),
                                                                        0
                                                                    )
                                                            )}
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[2cm] border border-transparent py-0 pt-[8mm] align-top font-arial text-[7pt] leading-[8pt]">
                                                            {ucFirst(
                                                                terbilang(
                                                                    Number(
                                                                        belanja.jumlah
                                                                    ) -
                                                                        belanja.potonganBelanja.reduce(
                                                                            (
                                                                                acc,
                                                                                item
                                                                            ) =>
                                                                                acc +
                                                                                Number(
                                                                                    item.jumlah
                                                                                ),
                                                                            0
                                                                        )
                                                                )
                                                            )}{' '}
                                                            Rupiah
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="h-[1cm] border border-transparent py-0 pt-[5mm] align-top font-arial text-[7pt] leading-[8pt]">
                                                            {belanja.uraian}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handlePrint}>Cetak</Button>
            </CardFooter>
        </Card>
    )
}
