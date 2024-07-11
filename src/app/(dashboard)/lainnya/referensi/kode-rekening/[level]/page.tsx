import Loading from '@/components/loading'
import { Input } from '@/components/ui/input'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { formatAngka } from '@/lib/utils'
import { api } from '@/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import { FiSearch } from 'react-icons/fi'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

export default function Page() {
    const params = useParams<{ level: '1' | '2' | '3' | '4' | '5' | '6' }>()
    const [searchParams, setSearchParams] = useSearchParams({
        search: '',
        page: '1',
        pageSize: '10',
    })

    const [searchValue] = useDebounce(searchParams.get('search') ?? '', 300)

    if (!['1', '2', '3', '4', '5', '6'].includes(params.level as string)) {
        return <Navigate to={`/lainnya/referensi/kode-rekening/1`} />
    }

    const {
        isLoading,
        isError,
        error,
        data: rekening,
    } = api.kodeRekening.getAll.useQuery(
        {
            level: params.level ?? '1',
            search: searchValue,
            page: Number(searchParams.get('page') ?? 1),
            pageSize: Number(searchParams.get('pageSize') ?? 10),
        },
        { placeholderData: keepPreviousData }
    )

    if (isLoading) return <Loading />

    if (isError) return <div>{error.message}</div>

    if (!rekening) return <div>Data tidak dapat dimuat.</div>

    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-5">
                <Select
                    value={searchParams.get('pageSize') ?? '10'}
                    onValueChange={(val) => {
                        searchParams.set('pageSize', val)
                        searchParams.set('page', '1')
                        setSearchParams(searchParams)
                    }}
                >
                    <SelectTrigger className="w-20 font-semibold">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                </Select>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <FiSearch />
                    </div>
                    <Input
                        className="w-80 pl-10"
                        placeholder="Cari kode rekening"
                        value={searchParams.get('search') ?? ''}
                        onChange={(e) => {
                            searchParams.set('search', e.target.value)
                            searchParams.set('page', '1')
                            setSearchParams(searchParams)
                        }}
                    />
                </div>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-40">Kode Rekening</TableHead>
                        <TableHead>Uraian</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rekening.data?.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.kode}</TableCell>
                            <TableCell>{item.uraian}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableCaption>
                    Menampilkan data{' '}
                    {formatAngka(rekening.meta.pagination.firstRow)}-
                    {formatAngka(rekening.meta.pagination.lastRow)} dari{' '}
                    {formatAngka(rekening.meta.pagination.dataFiltered)}/
                    {formatAngka(rekening.meta.pagination.dataTotal)} data.
                </TableCaption>
            </Table>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            disabled={
                                Number(rekening.meta.pagination.page) === 1
                            }
                            onClick={() => {
                                Number(rekening.meta.pagination.page) > 1 &&
                                    searchParams.set(
                                        'page',
                                        String(
                                            Number(
                                                rekening.meta.pagination.page
                                            ) - 1
                                        )
                                    )
                                setSearchParams(searchParams)
                            }}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            disabled={
                                Number(rekening.meta.pagination.page) ===
                                Number(rekening.meta.pagination.pageCount)
                            }
                            onClick={() => {
                                Number(rekening.meta.pagination.page) <
                                    Number(
                                        rekening.meta.pagination.pageCount
                                    ) &&
                                    searchParams.set(
                                        'page',
                                        String(
                                            Number(
                                                rekening.meta.pagination.page
                                            ) + 1
                                        )
                                    )
                                setSearchParams(searchParams)
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
