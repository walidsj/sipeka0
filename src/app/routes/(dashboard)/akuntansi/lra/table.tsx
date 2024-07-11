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
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/web/components/ui/table'
import { formatAngka } from '@/web/lib/utils'
import { api } from '@/web/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import { format } from 'date-fns'
import { HiOutlineChevronDoubleDown, HiOutlineEye } from 'react-icons/hi'
import { Link, useSearchParams } from 'react-router-dom'

export default function LraTable() {
    const [searchParams, setSearchParams] = useSearchParams({
        startDate: '',
        endDate: '',
    })

    const {
        isLoading,
        isError,
        error,
        data: belanja,
    } = api.belanja.getBelanjaLra.useQuery(
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

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center gap-5">
                <div className="flex gap-2">
                    <Input
                        value={
                            searchParams.get('startDate') ||
                            format(new Date(), 'yyyy-01-01')
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
                        <TableHead>Kode Rekening</TableHead>
                        <TableHead>Uraian</TableHead>
                        <TableHead className="text-right">
                            Anggaran (Rp)
                        </TableHead>
                        <TableHead className="text-right">
                            Realisasi (Rp)
                        </TableHead>
                        <TableHead className="text-right">
                            Sisa Anggaran (Rp)
                        </TableHead>
                        <TableHead className="w-1" />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {belanja.map((item, index) => {
                        return (
                            <TableRow key={index}>
                                <TableCell className="font-semibold">
                                    {item.kodeRekening}
                                </TableCell>
                                <TableCell className="font-semibold">
                                    {item.uraian}
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                    {formatAngka(item.anggaran)}
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                    {formatAngka(item.jumlah)}
                                </TableCell>
                                <TableCell className="text-right font-semibold">
                                    {formatAngka(item.anggaran - item.jumlah)}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button variant="outline">
                                                Aksi{' '}
                                                <HiOutlineChevronDoubleDown className="ml-2" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <Link
                                                to={`/akuntansi/lra/${item.kodeRekening}?startDate=${
                                                    searchParams.get(
                                                        'startDate'
                                                    ) ||
                                                    format(
                                                        new Date(),
                                                        'yyyy-01-01'
                                                    )
                                                }&endDate=${
                                                    searchParams.get(
                                                        'endDate'
                                                    ) ||
                                                    format(
                                                        new Date(),
                                                        'yyyy-MM-dd'
                                                    )
                                                }`}
                                            >
                                                <DropdownMenuItem>
                                                    <HiOutlineEye className="mr-2" />
                                                    Detail
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                    {belanja.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={100} className="text-center">
                                Tidak ada data
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableHead colSpan={2}>Total</TableHead>
                        <TableHead className="text-right">
                            {formatAngka(
                                belanja.reduce(
                                    (acc, item) => acc + item.anggaran,
                                    0
                                )
                            )}
                        </TableHead>
                        <TableHead className="text-right">
                            {formatAngka(
                                belanja.reduce(
                                    (acc, item) => acc + item.jumlah,
                                    0
                                )
                            )}
                        </TableHead>
                        <TableHead className="text-right">
                            {formatAngka(
                                belanja.reduce(
                                    (acc, item) =>
                                        acc + item.anggaran - item.jumlah,
                                    0
                                )
                            )}
                        </TableHead>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}
