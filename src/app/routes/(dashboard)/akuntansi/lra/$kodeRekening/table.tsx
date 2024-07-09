import Loading from '@/web/components/loading'
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
import { useParams } from 'react-router-dom'

export default function DetailTable() {
    const params = useParams<{ kodeRekening: string }>()

    const {
        isLoading,
        isError,
        error,
        data: belanja,
    } = api.belanja.getBelanjaLrabyKodeRekening.useQuery(params.kodeRekening!)

    if (isLoading) return <Loading />

    if (isError) {
        return <div>{error.message}</div>
    }

    if (!belanja) return <div>Data tidak dapat dimuat.</div>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead className="text-center">
                        Tanggal Dokumen
                    </TableHead>
                    <TableHead>Nomor Dokumen</TableHead>
                    <TableHead>Uraian</TableHead>
                    <TableHead>Jumlah</TableHead>
                    <TableHead>Dokumen LPJ</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {belanja.map((item, index) => {
                    return (
                        <TableRow key={index}>
                            <TableCell className="text-center">
                                {index + 1}.
                            </TableCell>
                            <TableCell className="text-center font-semibold">
                                {Intl.DateTimeFormat('id', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                }).format(new Date(item.tglDokumen || ''))}
                            </TableCell>
                            <TableCell className="text-center font-semibold">
                                {item.noDokumen}
                            </TableCell>
                            <TableCell className="font-semibold">
                                {item.uraian}
                            </TableCell>
                            <TableCell className="text-right font-semibold">
                                {formatAngka(item.jumlah)}
                            </TableCell>
                            <TableCell className="font-semibold">
                                {item.lpjBelanja?.jenis}{' '}
                                {item.lpjBelanja?.noDokumen}
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
                    <TableCell colSpan={4} className="text-right font-semibold">
                        Total
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                        {formatAngka(
                            belanja.reduce(
                                (acc, item) => acc + Number(item.jumlah),
                                0
                            )
                        )}
                    </TableCell>
                    <TableCell />
                </TableRow>
            </TableFooter>
        </Table>
    )
}
