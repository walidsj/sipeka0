import NotFound from '@/app/not-found'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { api } from '@/trpc/react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useParams } from 'react-router-dom'

export default function DetailTable() {
    const params = useParams<{
        rincianRbaBelanjaId: string
    }>()

    const belanja = api.dba.getRincianBelanjaByRincianRbaBelanjaId.useQuery(
        parseInt(params.rincianRbaBelanjaId ?? '')
    )

    if ((belanja.isSuccess && !belanja.data) || belanja.isError)
        return <NotFound />

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
                {belanja.isSuccess && belanja.data?.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center">
                            Tidak Ada Data
                        </TableCell>
                    </TableRow>
                )}
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
