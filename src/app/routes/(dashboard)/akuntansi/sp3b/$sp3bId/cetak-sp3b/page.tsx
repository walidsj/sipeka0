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
import {
    formatAngkaDecimal,
    formatAngkaRomawi,
    formatTanggal,
} from '@/web/lib/utils'

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
                <CardTitle>Cetak SP3B</CardTitle>
                <CardDescription>Dokumen SP3B</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border shadow">
                    <div
                        style={{
                            fontSize: '9pt',
                        }}
                        className="px-10 py-10 leading-4"
                        ref={componentRef}
                    >
                        <table className="mt-3 w-full">
                            <tr>
                                <td className="w-2/12 border border-black px-3 py-2 font-serif">
                                    <img
                                        src="/images/logo-kaltimprov.webp"
                                        className="mx-auto h-20 w-16"
                                    />
                                </td>
                                <td className="w-10/12 border border-black px-3 py-2 align-top">
                                    <div
                                        style={{
                                            fontSize: '11pt',
                                            fontFamily: 'Arial',
                                        }}
                                        className="mb-1 text-center font-bold uppercase"
                                    >
                                        Pemerintah Provinsi Kalimantan Timur
                                    </div>

                                    <div
                                        style={{
                                            fontSize: '12pt',
                                            fontFamily: 'Arial',
                                        }}
                                        className="mb-2 text-center font-bold uppercase"
                                    >
                                        Surat Permintaan Pengesahan Pendapatan
                                        dan Belanja (SP3B)
                                    </div>
                                    <table className="w-full">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                    className="w-1/5"
                                                >
                                                    Nama Sub Unit
                                                </td>
                                                <td className="w-2">:</td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Rumah Sakit Jiwa Daerah Atma
                                                    Husada Mahakam
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Tanggal
                                                </td>
                                                <td>:</td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    {formatTanggal(
                                                        sp3b.tglDokumen
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Nomor
                                                </td>
                                                <td>:</td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    {sp3b.noDokumen}
                                                    /RSJDAHM-BLUD/SP3B/
                                                    {formatAngkaRomawi(
                                                        new Date(
                                                            sp3b.tglDokumen!
                                                        ).getMonth() + 1
                                                    )}
                                                    /
                                                    {new Date(
                                                        sp3b.tglDokumen!
                                                    ).getFullYear()}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Tahun Anggaran
                                                </td>
                                                <td>:</td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    {Intl.DateTimeFormat(
                                                        'id-ID',
                                                        { year: 'numeric' }
                                                    ).format(
                                                        new Date(
                                                            sp3b.tglDokumen!
                                                        )
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={2}
                                    className="border border-black px-3 py-2 align-top"
                                >
                                    <p
                                        className="mb-4 text-justify"
                                        style={{
                                            fontFamily: 'Arial',
                                        }}
                                    >
                                        Kepala SKPD Rumah Sakit Jiwa Daerah Atma
                                        Husada Mahakam memohon kepada Bendahara
                                        Umum Daerah selaku PPKD agar mengesahkan
                                        dan membukukan pendapatan dan belanja
                                        periode {formatTanggal(sp3b.tglMulai)}{' '}
                                        s.d. {formatTanggal(sp3b.tglSelesai)}{' '}
                                        sejumlah:
                                    </p>
                                    <table className="mb-5 w-2/3">
                                        <tbody>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                    className="w-5"
                                                >
                                                    a.
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                    colSpan={2}
                                                >
                                                    Saldo Awal
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Rp
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                    className="text-right"
                                                >
                                                    {formatAngkaDecimal(
                                                        sp3b.saldoAwal
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    b.
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                    colSpan={2}
                                                >
                                                    Pendapatan
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Rp
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                    className="text-right"
                                                >
                                                    {formatAngkaDecimal(
                                                        sp3b.pendapatan.total
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    c.
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                    colSpan={2}
                                                >
                                                    Belanja
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Rp
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                    className="text-right"
                                                >
                                                    {formatAngkaDecimal(
                                                        sp3b.belanja.pegawai +
                                                            sp3b.belanja
                                                                .barjas +
                                                            sp3b.belanja.modal
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                    className="w-5"
                                                >
                                                    1.
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Belanja Pegawai
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Rp
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                    className="text-right"
                                                >
                                                    {formatAngkaDecimal(
                                                        sp3b.belanja.pegawai
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    2.
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Belanja Barang dan Jasa
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Rp
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                    className="text-right"
                                                >
                                                    {formatAngkaDecimal(
                                                        sp3b.belanja.barjas
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="w-3"></td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    3.
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Belanja Modal Peralatan dan
                                                    Mesin
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Rp
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                    className="text-right"
                                                >
                                                    {formatAngkaDecimal(
                                                        sp3b.belanja.modal
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    d.
                                                </td>
                                                <td
                                                    colSpan={2}
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Saldo Akhir
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                >
                                                    Rp
                                                </td>
                                                <td
                                                    style={{
                                                        fontFamily: 'Arial',
                                                    }}
                                                    className="text-right"
                                                >
                                                    {formatAngkaDecimal(
                                                        sp3b.saldoAwal +
                                                            sp3b.pendapatan
                                                                .total -
                                                            (sp3b.belanja
                                                                .pegawai +
                                                                sp3b.belanja
                                                                    .barjas +
                                                                sp3b.belanja
                                                                    .modal)
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={2}
                                    className="border border-black px-3 py-2"
                                >
                                    <div className="flex w-full">
                                        <div className="w-2/3"></div>
                                        <div className="w-1/3">
                                            <div
                                                style={{
                                                    fontFamily: 'Arial',
                                                }}
                                            >
                                                Samarinda,{' '}
                                                {formatTanggal(sp3b.tglDokumen)}
                                            </div>
                                            <div
                                                style={{
                                                    fontFamily: 'Arial',
                                                }}
                                            >
                                                {sp3b.penandatangan?.jabatan},
                                            </div>
                                            <div
                                                style={{
                                                    fontFamily: 'Arial',
                                                }}
                                                className="mt-14 underline"
                                            >
                                                {sp3b.penandatangan
                                                    ?.gelarDepan &&
                                                    `${sp3b.penandatangan?.gelarDepan} `}
                                                {sp3b.penandatangan?.nama}
                                                {sp3b.penandatangan
                                                    ?.gelarBelakang &&
                                                    `, ${sp3b.penandatangan?.gelarBelakang}`}
                                            </div>
                                            <div
                                                style={{
                                                    fontFamily: 'Arial',
                                                }}
                                            >
                                                Pembina Utama Muda
                                            </div>
                                            <div
                                                style={{
                                                    fontFamily: 'Arial',
                                                }}
                                            >
                                                NIP. {sp3b.penandatangan?.nip}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
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
