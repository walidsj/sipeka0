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
import { cn, formatAngkaDecimal, formatTanggal, terbilang } from '@/lib/utils'

export default function Page() {
    const params = useParams<{ spmId: string }>()

    const {
        data: spm,
        isError,
        isLoading,
    } = api.spm.getById.useQuery(Number(params.spmId))

    const componentRef = React.useRef(null)
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    if (isLoading) return <Loading />

    if (isError) return <NotFound />

    if (!spm) return <NotFound />

    const uniqueRekening = Array(
        ...new Set(
            spm.spp.lpjBelanja?.belanja?.map((item) => item.rab?.kodeRekening)
        )
    ).sort()

    const uniquePotongan = Array(
        ...new Set(
            spm.spp.lpjBelanja?.belanja
                ?.map((item) =>
                    item.potonganBelanja.map((potongan) => potongan.jenis)
                )
                .flat()
        )
    )

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cetak SPM</CardTitle>
                <CardDescription>Dokumen SPM</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border p-10 shadow">
                    <div
                        className="text-[8pt] leading-[11pt]"
                        ref={componentRef}
                    >
                        <style type="text/css" media="print">
                            {`
                                @page {
                                    size: A4 landscape;
                                    margin-top: 1cm;
                                    margin-left: 1cm;
                                    margin-right: 1cm;
                                    margin-bottom: 0.5cm;
                                    
                                }
                            `}
                        </style>
                        <div className="mb-2 w-full">
                            <div className="text-center font-serif text-[9pt] font-semibold uppercase leading-[11pt]">
                                Provinsi Kalimantan Timur
                            </div>
                            <div className="text-center font-serif text-[9pt] font-semibold uppercase leading-[11pt]">
                                Dinas Kesehatan
                            </div>
                            <div className="text-center font-serif text-[10pt] font-semibold uppercase leading-[12pt]">
                                Rumah Sakit Jiwa Daerah Atma Husada Mahakam
                            </div>
                            <div className="mt-1 text-center font-serif text-[10pt] font-semibold uppercase leading-[12pt]">
                                Surat Perintah Membayar (SPM)
                            </div>
                            <div className="text-center font-serif text-[10pt] font-semibold uppercase leading-[12pt]">
                                {spm.spp.lpjBelanja?.jenis === 'LS'
                                    ? 'Langsung'
                                    : spm.spp.lpjBelanja?.jenis === 'GU'
                                      ? 'Ganti Uang Persediaan'
                                      : spm.spp.lpjBelanja?.jenis === 'TU'
                                        ? 'Tambah Uang Persediaan'
                                        : ''}{' '}
                            </div>
                        </div>
                        <table className="mb-2 w-[calc(100%-2px)]">
                            <tbody>
                                <tr>
                                    <th className="w-[50%] border-[0.5pt] border-black px-3 py-1 font-serif">
                                        {' '}
                                        Tahun Anggaran{' '}
                                        {Intl.DateTimeFormat('id-ID', {
                                            year: 'numeric',
                                        }).format(spm.tglDokumen || new Date())}
                                    </th>
                                    <th className="w-[50%] border-[0.5pt] border-black px-3 py-1 font-serif">
                                        Nomor SPM:
                                        <br />
                                        900.1.3.5/{spm.noDokumen}/
                                        {spm.spp.lpjBelanja.jenis}
                                        /SPM/RSJD-AHM/BLUD
                                    </th>
                                </tr>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-1 align-top">
                                        <div className="mb-2 font-serif font-semibold uppercase">
                                            Kuasa Pengguna Anggaran BLUD
                                            <br />
                                            Rumah Sakit Jiwa Daerah Atma Husada
                                            Mahakam Prov. Kaltim
                                        </div>
                                        <p className="font-serif">
                                            Supaya menerbitkan SP2D kepada:
                                        </p>
                                        <table className="mb-2 w-full">
                                            <tbody>
                                                <tr>
                                                    <td className="w-[39%] align-top font-serif">
                                                        Nama SKPD
                                                    </td>
                                                    <td className="w-[1%] align-top font-serif">
                                                        :
                                                    </td>
                                                    <td className="w-[60%] align-top font-serif font-semibold">
                                                        Dinas Kesehatan
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[39%] align-top font-serif">
                                                        Nama Unit SKPD
                                                    </td>
                                                    <td className="w-[1%] align-top font-serif">
                                                        :
                                                    </td>
                                                    <td className="w-[60%] align-top font-serif font-semibold">
                                                        RSJD Atma Husada Mahakam
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[39%] align-top font-serif">
                                                        Nama Bendahara
                                                        Pengeluaran Pembantu
                                                        BLUD
                                                    </td>
                                                    <td className="w-[1%] align-top font-serif">
                                                        :
                                                    </td>
                                                    <td className="w-[60%] align-top font-serif font-semibold">
                                                        Moh. Walid Arkham Sani,
                                                        A.Md.Pnl.
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[39%] align-top font-serif">
                                                        No. Rekening Bank
                                                    </td>
                                                    <td className="w-[1%] align-top font-serif">
                                                        :
                                                    </td>
                                                    <td className="w-[60%] align-top font-serif font-semibold">
                                                        {(spm.spp.lpjBelanja
                                                            ?.jenis === 'LS' ||
                                                            spm.spp.lpjBelanja
                                                                ?.jenis ===
                                                                'TU') &&
                                                            spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .rekanan
                                                                            ?.noRekening
                                                                )
                                                                .join(', ')}
                                                        {(spm.spp.lpjBelanja
                                                            ?.jenis === 'LS' ||
                                                            spm.spp.lpjBelanja
                                                                ?.jenis ===
                                                                'TU') &&
                                                            spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .pegawai
                                                                            ?.noRekening
                                                                )
                                                                .join(', ')}
                                                        {(spm.spp.lpjBelanja
                                                            ?.jenis === 'LS' ||
                                                            spm.spp.lpjBelanja
                                                                ?.jenis ===
                                                                'TU') &&
                                                            !spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .pegawai
                                                                            ?.noRekening
                                                                )
                                                                .join(', ') &&
                                                            !spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .rekanan
                                                                            ?.noRekening
                                                                )
                                                                .join(', ') &&
                                                            '0011445004'}
                                                        {spm.spp.lpjBelanja
                                                            ?.jenis === 'GU' &&
                                                            '0011445004'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[39%] align-top font-serif">
                                                        Nama di Rekening Bank
                                                    </td>
                                                    <td className="w-[1%] align-top font-serif">
                                                        :
                                                    </td>
                                                    <td className="w-[60%] align-top font-serif font-semibold">
                                                        {(spm.spp.lpjBelanja
                                                            ?.jenis === 'LS' ||
                                                            spm.spp.lpjBelanja
                                                                ?.jenis ===
                                                                'TU') &&
                                                            spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .rekanan
                                                                            ?.namaRekening
                                                                )
                                                                .join(', ')}
                                                        {(spm.spp.lpjBelanja
                                                            ?.jenis === 'LS' ||
                                                            spm.spp.lpjBelanja
                                                                ?.jenis ===
                                                                'TU') &&
                                                            spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .pegawai
                                                                            ?.namaRekening
                                                                )
                                                                .join(', ')}
                                                        {(spm.spp.lpjBelanja
                                                            ?.jenis === 'LS' ||
                                                            spm.spp.lpjBelanja
                                                                ?.jenis ===
                                                                'TU') &&
                                                            !spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .pegawai
                                                                            ?.namaRekening
                                                                )
                                                                .join(', ') &&
                                                            !spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .rekanan
                                                                            ?.namaRekening
                                                                )
                                                                .join(', ') &&
                                                            'BP BLUD RSJD AHM'}
                                                        {spm.spp.lpjBelanja
                                                            ?.jenis === 'GU' &&
                                                            'BP BLUD RSJD AHM'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[39%] align-top font-serif">
                                                        Nama Bank
                                                    </td>
                                                    <td className="w-[1%] align-top font-serif">
                                                        :
                                                    </td>
                                                    <td className="w-[60%] align-top font-serif font-semibold">
                                                        {(spm.spp.lpjBelanja
                                                            ?.jenis === 'LS' ||
                                                            spm.spp.lpjBelanja
                                                                ?.jenis ===
                                                                'TU') &&
                                                            spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .rekanan
                                                                            ?.bank
                                                                            ?.nama
                                                                )
                                                                .join(', ')}
                                                        {(spm.spp.lpjBelanja
                                                            ?.jenis === 'LS' ||
                                                            spm.spp.lpjBelanja
                                                                ?.jenis ===
                                                                'TU') &&
                                                            spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .pegawai
                                                                            ?.bank
                                                                            ?.nama
                                                                )
                                                                .join(', ')}
                                                        {(spm.spp.lpjBelanja
                                                            ?.jenis === 'LS' ||
                                                            spm.spp.lpjBelanja
                                                                ?.jenis ===
                                                                'TU') &&
                                                            !spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .pegawai
                                                                            ?.bank
                                                                            ?.nama
                                                                )
                                                                .join(', ') &&
                                                            !spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .rekanan
                                                                            ?.bank
                                                                            ?.nama
                                                                )
                                                                .join(', ') &&
                                                            'BANK KALTIMTARA'}
                                                        {spm.spp.lpjBelanja
                                                            ?.jenis === 'GU' &&
                                                            'BANK KALTIMTARA'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[39%] align-top font-serif">
                                                        NPWP
                                                    </td>
                                                    <td className="w-[1%] align-top font-serif">
                                                        :
                                                    </td>
                                                    <td className="w-[60%] align-top font-serif font-semibold">
                                                        {(spm.spp.lpjBelanja
                                                            ?.jenis === 'LS' ||
                                                            spm.spp.lpjBelanja
                                                                ?.jenis ===
                                                                'TU') &&
                                                            spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .rekanan
                                                                            ?.npwp
                                                                )
                                                                .join(', ')}
                                                        {(spm.spp.lpjBelanja
                                                            ?.jenis === 'LS' ||
                                                            spm.spp.lpjBelanja
                                                                ?.jenis ===
                                                                'TU') &&
                                                            spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .pegawai
                                                                            ?.npwp
                                                                )
                                                                .join(', ')}
                                                        {(spm.spp.lpjBelanja
                                                            ?.jenis === 'LS' ||
                                                            spm.spp.lpjBelanja
                                                                ?.jenis ===
                                                                'TU') &&
                                                            !spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .pegawai
                                                                            ?.npwp
                                                                )
                                                                .join(', ') &&
                                                            !spm.spp.lpjBelanja?.belanja
                                                                .map(
                                                                    (item) =>
                                                                        item
                                                                            .rekanan
                                                                            ?.npwp
                                                                )
                                                                .join(', ') &&
                                                            '953350162722000'}
                                                        {spm.spp.lpjBelanja
                                                            ?.jenis === 'GU' &&
                                                            '953350162722000'}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="w-[39%] align-top font-serif">
                                                        Dasar Pembayaran
                                                    </td>
                                                    <td className="w-[1%] align-top font-serif">
                                                        :
                                                    </td>
                                                    <td className="w-[60%] align-top font-serif font-semibold">
                                                        DPA/A.1/1.02.0.00.0.00.01.0000/002/2024
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="font-serif">
                                            Untuk Keperluan:
                                        </p>
                                        <p className="mb-2 font-serif font-semibold">
                                            {spm.spp.lpjBelanja?.uraian}
                                        </p>
                                        <p className="font-serif">
                                            Pembebanan pada:
                                        </p>
                                        <table className="mb-2 w-full">
                                            <thead>
                                                <tr>
                                                    <th className="w-[15%] border-[0.5pt] border-black px-2 font-serif uppercase">
                                                        Kode Rekening
                                                    </th>
                                                    <th className="w-[64%] border-[0.5pt] border-black px-2 font-serif uppercase">
                                                        Uraian
                                                    </th>
                                                    <th className="w-[20%] border-[0.5pt] border-black px-2 font-serif uppercase">
                                                        Jumlah
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-orange-50 font-semibold">
                                                    <td
                                                        colSpan={3}
                                                        className="border-[0.5pt] border-black px-2 align-top font-serif"
                                                    >
                                                        Nomor SPD:
                                                        DPA/A.1/1.02.0.00.0.00.01.0000/002/2024
                                                    </td>
                                                </tr>
                                                <tr className="font-semibold">
                                                    <td
                                                        colSpan={3}
                                                        className="border-[0.5pt] border-black px-2 align-top font-serif"
                                                    >
                                                        1.02.01.1.10 Peningkatan
                                                        Pelayanan BLUD
                                                    </td>
                                                </tr>
                                                <tr className="font-semibold">
                                                    <td
                                                        colSpan={3}
                                                        className="border-[0.5pt] border-black px-2 align-top font-serif"
                                                    >
                                                        1.02.01.1.10.0001
                                                        Pelayanan dan Penunjang
                                                        Pelayanan BLUD
                                                    </td>
                                                </tr>

                                                {uniqueRekening.map(
                                                    (kodeRekening, index) => {
                                                        const filtered =
                                                            spm.spp.lpjBelanja?.belanja?.filter(
                                                                (item) =>
                                                                    item.rab
                                                                        ?.kodeRekening ===
                                                                    kodeRekening
                                                            )
                                                        const total =
                                                            filtered.reduce(
                                                                (acc, item) =>
                                                                    acc +
                                                                    Number(
                                                                        item.jumlah
                                                                    ),
                                                                0
                                                            )

                                                        return (
                                                            <tr key={index}>
                                                                <td className="border-[0.5pt] border-black px-2 align-top font-serif">
                                                                    {
                                                                        kodeRekening
                                                                    }
                                                                </td>
                                                                <td className="border-[0.5pt] border-black px-2 align-top font-serif">
                                                                    {
                                                                        filtered[0]
                                                                            .rab
                                                                            .rekening
                                                                            ?.uraian
                                                                    }
                                                                </td>
                                                                <td className="border-[0.5pt] border-black px-2 text-right align-top font-serif">
                                                                    {formatAngkaDecimal(
                                                                        total
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                )}
                                            </tbody>
                                            <tfoot>
                                                <tr className="bg-neutral-100">
                                                    <td
                                                        colSpan={2}
                                                        className="border-[0.5pt] border-black px-2 font-serif font-semibold"
                                                    >
                                                        Jumlah
                                                    </td>
                                                    <td className="border-[0.5pt] border-black px-2 text-right font-serif font-semibold">
                                                        {formatAngkaDecimal(
                                                            spm.spp.lpjBelanja?.belanja?.reduce(
                                                                (acc, item) =>
                                                                    acc +
                                                                    Number(
                                                                        item.jumlah
                                                                    ),
                                                                0
                                                            )
                                                        )}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-1 align-top">
                                        <p className="font-serif">
                                            Potongan-Potongan:
                                        </p>
                                        <table className="mb-2 w-full">
                                            <thead>
                                                <tr>
                                                    <th className="w-[5%] border-[0.5pt] border-black px-2 font-serif">
                                                        No
                                                    </th>
                                                    <th
                                                        className={cn(
                                                            'border-[0.5pt] border-black px-2 font-serif',
                                                            spm.spp.lpjBelanja
                                                                .jenis ===
                                                                'LS' &&
                                                                'w-[35%]'
                                                        )}
                                                    >
                                                        Uraian
                                                    </th>
                                                    {spm.spp.lpjBelanja
                                                        .jenis === 'LS' && (
                                                        <th className="w-[35%] border-[0.5pt] border-black px-2 font-serif">
                                                            Kode Billing
                                                        </th>
                                                    )}
                                                    <th className="w-[25%] border-[0.5pt] border-black px-2 font-serif">
                                                        Jumlah
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {spm.spp.lpjBelanja.jenis ===
                                                    'LS' &&
                                                    spm.spp.lpjBelanja.belanja.map(
                                                        (belanja, bi) => {
                                                            return belanja.potonganBelanja.map(
                                                                (
                                                                    potongan,
                                                                    index
                                                                ) => (
                                                                    <tr
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <td className="border-[0.5pt] border-black px-2 text-center align-top font-serif">
                                                                            {bi +
                                                                                1 +
                                                                                index}
                                                                        </td>
                                                                        <td className="border-[0.5pt] border-black px-2 align-top font-serif">
                                                                            {
                                                                                potongan.jenis
                                                                            }
                                                                        </td>
                                                                        <td className="border-[0.5pt] border-black px-2 text-center align-top font-serif">
                                                                            {
                                                                                potongan.billing
                                                                            }
                                                                        </td>
                                                                        <td className="border-[0.5pt] border-black px-2 text-right align-top font-serif">
                                                                            {formatAngkaDecimal(
                                                                                potongan.jumlah
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )
                                                        }
                                                    )}
                                                {spm.spp.lpjBelanja.jenis ===
                                                    'GU' &&
                                                    uniquePotongan.map(
                                                        (potongan, index) => {
                                                            const filtered =
                                                                spm.spp.lpjBelanja?.belanja?.map(
                                                                    (item) =>
                                                                        item.potonganBelanja.filter(
                                                                            (
                                                                                potonganItem
                                                                            ) =>
                                                                                potonganItem.jenis ===
                                                                                potongan
                                                                        )
                                                                )
                                                            const total =
                                                                filtered.reduce(
                                                                    (
                                                                        acc,
                                                                        item
                                                                    ) =>
                                                                        acc +
                                                                        Number(
                                                                            item.reduce(
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
                                                                        ),
                                                                    0
                                                                )

                                                            return (
                                                                <tr key={index}>
                                                                    <td className="border-[0.5pt] border-black px-2 text-center align-top font-serif">
                                                                        {index +
                                                                            1}
                                                                    </td>
                                                                    <td className="border-[0.5pt] border-black px-2 align-top font-serif">
                                                                        {
                                                                            potongan
                                                                        }
                                                                    </td>
                                                                    <td className="border-[0.5pt] border-black px-2 text-right align-top font-serif">
                                                                        {formatAngkaDecimal(
                                                                            total
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                    )}
                                            </tbody>
                                            <tfoot>
                                                <tr className="bg-neutral-100">
                                                    <td
                                                        colSpan={
                                                            spm.spp.lpjBelanja
                                                                .jenis === 'LS'
                                                                ? 3
                                                                : 2
                                                        }
                                                        className="border-[0.5pt] border-black px-2 font-serif font-semibold"
                                                    >
                                                        Jumlah
                                                    </td>
                                                    <td className="border-[0.5pt] border-black px-2 text-right font-serif font-semibold">
                                                        {formatAngkaDecimal(
                                                            spm.spp.lpjBelanja?.belanja?.reduce(
                                                                (acc, item) =>
                                                                    acc +
                                                                    Number(
                                                                        item.potonganBelanja.reduce(
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
                                                                    ),
                                                                0
                                                            )
                                                        )}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        <p className="font-serif">
                                            SPM yang Dibayarkan:
                                        </p>
                                        <table className="mb-2 w-full">
                                            <tbody>
                                                <tr>
                                                    <td className="border-[0.5pt] border-black px-2 align-top font-serif">
                                                        Jumlah yang Diminta
                                                        (Bruto)
                                                    </td>
                                                    <td className="w-[25%] border-[0.5pt] border-black px-2 text-right align-top font-serif">
                                                        {formatAngkaDecimal(
                                                            spm.spp.lpjBelanja?.belanja?.reduce(
                                                                (acc, item) =>
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
                                                    <td className="border-[0.5pt] border-black px-2 align-top font-serif">
                                                        Jumlah Potongan
                                                    </td>
                                                    <td className="w-[25%] border-[0.5pt] border-black px-2 text-right align-top font-serif">
                                                        {formatAngkaDecimal(
                                                            spm.spp.lpjBelanja?.belanja?.reduce(
                                                                (acc, item) =>
                                                                    acc +
                                                                    Number(
                                                                        item.potonganBelanja.reduce(
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
                                                                    ),
                                                                0
                                                            )
                                                        )}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="border-[0.5pt] border-black px-2 align-top font-serif">
                                                        Jumlah Netto
                                                    </td>
                                                    <td className="w-[25%] border-[0.5pt] border-black px-2 text-right align-top font-serif">
                                                        {formatAngkaDecimal(
                                                            spm.spp.lpjBelanja?.belanja?.reduce(
                                                                (acc, item) =>
                                                                    acc +
                                                                    Number(
                                                                        item.jumlah
                                                                    ),
                                                                0
                                                            ) -
                                                                spm.spp.lpjBelanja?.belanja?.reduce(
                                                                    (
                                                                        acc,
                                                                        item
                                                                    ) =>
                                                                        acc +
                                                                        Number(
                                                                            item.potonganBelanja.reduce(
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
                                                                        ),
                                                                    0
                                                                )
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr className="bg-neutral-100">
                                                    <td className="border-[0.5pt] border-black px-2 font-serif font-semibold">
                                                        Jumlah
                                                    </td>
                                                    <td className="border-[0.5pt] border-black px-2 text-right font-serif font-semibold">
                                                        {formatAngkaDecimal(
                                                            spm.spp.lpjBelanja?.belanja?.reduce(
                                                                (acc, item) =>
                                                                    acc +
                                                                    Number(
                                                                        item.jumlah
                                                                    ),
                                                                0
                                                            )
                                                        )}
                                                    </td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                        <p className="font-serif">
                                            Uang Sejumlah:{' '}
                                            {terbilang(
                                                spm.spp.lpjBelanja?.belanja?.reduce(
                                                    (acc, item) =>
                                                        acc +
                                                        Number(item.jumlah),
                                                    0
                                                )
                                            )}{' '}
                                            Rupiah
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border-[0.5pt] border-black px-3 py-1 align-top">
                                        <table className="mb-2 w-full">
                                            <tbody>
                                                <tr>
                                                    <td className="font-serif font-semibold">
                                                        Jumlah SPP Diminta
                                                    </td>
                                                    <td className="text-right font-serif font-semibold">
                                                        {formatAngkaDecimal(
                                                            spm.spp.lpjBelanja?.belanja?.reduce(
                                                                (acc, item) =>
                                                                    acc +
                                                                    Number(
                                                                        item.jumlah
                                                                    ),
                                                                0
                                                            )
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <p className="font-serif font-semibold">
                                            Nomor dan Tanggal SPP:
                                        </p>
                                        <p className="font-serif">
                                            900.1.3.5/{spm.spp.noDokumen}/
                                            {spm.spp.lpjBelanja?.jenis}
                                            /SPP/RSJD-AHM/BLUD, tanggal{' '}
                                            {formatTanggal(
                                                spm.spp.tglDokumen || new Date()
                                            )}
                                        </p>
                                    </td>
                                    <td className="border-[0.5pt] border-black px-3 py-1 align-top">
                                        <div className="text-center">
                                            <div className="font-serif">
                                                Samarinda,{' '}
                                                {formatTanggal(spm.tglDokumen)}
                                            </div>
                                            <div className="font-serif">
                                                Kuasa Pengguna Anggaran
                                            </div>
                                            <div className="mt-12 font-serif underline">
                                                dr. Indah Puspitasari, MARS
                                            </div>
                                            <div className="font-serif">
                                                Pembina Utama Muda
                                            </div>
                                            <div className="font-serif">
                                                NIP. 196705301998032003
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td
                                        colSpan={2}
                                        className="border-[0.5pt] border-black px-3 py-1 text-center align-top font-serif text-[8pt] italic"
                                    >
                                        SPM ini sah apabila telah ditandatangani
                                        dan di stempel oleh Kuasa Pengguna
                                        Anggaran
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
