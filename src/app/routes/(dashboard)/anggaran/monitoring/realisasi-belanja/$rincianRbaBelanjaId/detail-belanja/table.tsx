import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/web/components/ui/table'
import { api } from '@/web/trpc/react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Navigate, useParams } from 'react-router-dom'

export default function DetailTable() {
    const params = useParams<{
        rincianRbaBelanjaId: string
    }>()

    const belanja = api.dba.getRincianBelanjaByRincianRbaBelanjaId.useQuery(
        parseInt(params.rincianRbaBelanjaId ?? '')
    )

    if ((belanja.isSuccess && !belanja.data) || belanja.isError)
        return (
            <Navigate to={`/anggaran/monitoring/realisasi-belanja`} replace />
        )

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Nomor Dokumen</TableHead>
                    <TableHead>Tanggal Dokumen</TableHead>
                    <TableHead>Uraian</TableHead>
                    <TableHead>Jumlah</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {belanja.data?.map((item, index) => (
                    <TableRow key={item.id}>
                        <TableCell>{index + 1}.</TableCell>
                        <TableCell>{item.noDokumen}</TableCell>
                        <TableCell>
                            {format(String(item.tglDokumen), 'dd MMMM yyyy', {
                                locale: id,
                            })}
                        </TableCell>
                        <TableCell>{item.uraian}</TableCell>
                        <TableCell className="text-right">
                            {Number(item.jumlah).toLocaleString('id-ID')}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell className="text-right">
                        {Number(
                            belanja.data?.reduce(
                                (acc, curr) => acc + Number(curr.jumlah),
                                0
                            )
                        ).toLocaleString('id-ID')}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
