import Loading from '@/web/components/loading'
import { Button } from '@/web/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/web/components/ui/dropdown-menu'
import { Input } from '@/web/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/web/components/ui/table'
import { formatAngka } from '@/web/lib/utils'
import { api } from '@/web/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import { format } from 'date-fns'
import React from 'react'
import { HiOutlineChevronDoubleDown, HiOutlinePencil } from 'react-icons/hi'
import { Link, useSearchParams } from 'react-router-dom'

export default function BkPajakTable() {
    const [searchParams, setSearchParams] = useSearchParams({
        startDate: '',
        endDate: '',
    })

    const {
        isLoading,
        isError,
        error,
        data: belanja,
    } = api.belanja.getAllBkPajak.useQuery(
        {
            startDate: searchParams.get('startDate')
                ? new Date(searchParams.get('startDate')!)
                : undefined,
            endDate: searchParams.get('endDate')
                ? new Date(searchParams.get('endDate')!)
                : undefined,
        },
        { placeholderData: keepPreviousData }
    )

    if (isLoading) return <Loading />

    if (isError) {
        return <div>{error.message}</div>
    }

    if (!belanja) return <div>Data tidak dapat dimuat.</div>

    let no = 0
    let saldo = 0

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center gap-5">
                <div className="flex gap-2">
                    <Input
                        value={
                            searchParams.get('startDate') ||
                            format(new Date(), 'yyyy-MM-01')
                        }
                        type="date"
                        onChange={(e) => {
                            searchParams.set('startDate', e.target.value)
                            setSearchParams(searchParams)
                        }}
                    />
                    <Input
                        type="date"
                        value={
                            searchParams.get('endDate') ||
                            format(new Date(), 'yyyy-MM-dd')
                        }
                        onChange={(e) => {
                            searchParams.set('endDate', e.target.value)
                            setSearchParams(searchParams)
                        }}
                    />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1">No.</TableHead>
                        <TableHead className="text-center">
                            Tanggal Dokumen
                        </TableHead>
                        <TableHead className="text-center">
                            Nomor Dokumen
                        </TableHead>
                        <TableHead>Uraian</TableHead>
                        <TableHead className="text-center">
                            Kode Billing
                        </TableHead>
                        <TableHead>NTPN</TableHead>
                        <TableHead>Penerimaan</TableHead>
                        <TableHead>Pengeluaran</TableHead>
                        <TableHead>Saldo</TableHead>
                        <TableHead className="w-1" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {belanja.map((blj) => {
                        return blj.potonganBelanja.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <TableRow>
                                        <TableCell className="text-center">
                                            {++no}.
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {Intl.DateTimeFormat('id-ID', {
                                                day: '2-digit',
                                                month: '2-digit',
                                                year: 'numeric',
                                            }).format(
                                                blj.tglDokumen || new Date()
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {blj.noDokumen}
                                        </TableCell>
                                        <TableCell>
                                            Pemotongan {item.jenis} {blj.uraian}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {item.billing}
                                        </TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-right">
                                            {formatAngka(item.jumlah)}
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell className="text-right">
                                            {formatAngka(
                                                (saldo += Number(item.jumlah))
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline">
                                                        Aksi{' '}
                                                        <HiOutlineChevronDoubleDown className="ml-2" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start">
                                                    <Link
                                                        to={`/belanja/perekaman/${blj.id}/potongan/${item.id}/edit`}
                                                    >
                                                        <DropdownMenuItem>
                                                            <HiOutlinePencil className="mr-2" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                    </Link>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell>
                                            Penyetoran {item.jenis}{' '}
                                            {blj.rekanan &&
                                                `a.n. ${blj.rekanan.nama} ${blj.rekanan.npwp && `(${blj.rekanan.npwp})`}`}
                                            {blj.pegawai &&
                                                `a.n. ${blj.pegawai.gelarDepan && `${blj.pegawai.gelarDepan} `}${blj.pegawai.nama}${
                                                    blj.pegawai.gelarBelakang &&
                                                    `, ${blj.pegawai.gelarBelakang}`
                                                } ${blj.pegawai.npwp && `(${blj.pegawai.npwp})`}`}
                                        </TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">
                                            {item.ntpn}
                                        </TableCell>
                                        <TableCell></TableCell>
                                        <TableCell className="text-right">
                                            {formatAngka(item.jumlah)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {formatAngka(
                                                (saldo -= Number(item.jumlah))
                                            )}
                                        </TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </React.Fragment>
                            )
                        })
                    })}
                    {belanja.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                Tidak ada data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
