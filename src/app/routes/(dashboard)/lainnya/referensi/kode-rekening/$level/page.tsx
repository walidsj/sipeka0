import { Input } from '@/web/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/web/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/web/components/ui/table'
import { api } from '@/web/trpc/react'
import { keepPreviousData } from '@tanstack/react-query'
import { FiSearch } from 'react-icons/fi'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import { useDebounce } from 'use-debounce'

export default function Page() {
    const params = useParams<{ level: '1' | '2' | '3' | '4' | '5' | '6' }>()
    const [searchParams, setSearchParams] = useSearchParams()

    if (!['1', '2', '3', '4', '5', '6'].includes(params.level as string)) {
        return <Navigate to={`/lainnya/referensi/kode-rekening/1`} />
    }

    const [search] = useDebounce(searchParams.get('search') ?? '', 300)

    const rekening = api.kodeRekening.getAll.useQuery(
        {
            level: params.level ?? '1',
            page: parseInt(searchParams.get('page') ?? '1'),
            perPage: parseInt(searchParams.get('perPage') ?? '10'),
            search,
        },
        { placeholderData: keepPreviousData }
    )

    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-5">
                <Select
                    value={searchParams.get('perPage') ?? '10'}
                    onValueChange={(val) =>
                        setSearchParams((prev) => {
                            prev.set('perPage', val)
                            return prev
                        })
                    }
                >
                    <SelectTrigger className="w-20">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
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
                        onChange={(e) =>
                            setSearchParams((prev) => {
                                prev.set('search', e.target.value)
                                return prev
                            })
                        }
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
                    {rekening.isLoading && (
                        <TableRow>
                            <TableCell colSpan={2}>Memuat data...</TableCell>
                        </TableRow>
                    )}
                    {rekening.isSuccess &&
                        rekening.data?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.kode}</TableCell>
                                <TableCell>{item.uraian}</TableCell>
                            </TableRow>
                        ))}
                    {rekening.isSuccess && rekening.data?.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={2} className="text-center">
                                Tidak ada data
                            </TableCell>
                        </TableRow>
                    )}
                    {rekening.isError && (
                        <TableRow>
                            <TableCell colSpan={2} className="text-center">
                                {rekening.error.message}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
