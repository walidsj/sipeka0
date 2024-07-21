import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useAuth } from '@/lib/auth'
import { ChartContainer } from '@/components/ui/chart'
import { Bar, BarChart, Legend, XAxis, YAxis } from 'recharts'

export default function Page() {
    const auth = useAuth()

    const chartData = [
        { month: 'January', gaji: 186, tunjangan: 80, jasaPelayanan: 50 },
        { month: 'February', gaji: 305, tunjangan: 200, jasaPelayanan: 100 },
        { month: 'March', gaji: 237, tunjangan: 120, jasaPelayanan: 80 },
        { month: 'April', gaji: 73, tunjangan: 190, jasaPelayanan: 70 },
        { month: 'May', gaji: 209, tunjangan: 130, jasaPelayanan: 60 },
        { month: 'June', gaji: 214, tunjangan: 140, jasaPelayanan: 50 },
    ]

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Data Pegawai</CardTitle>
                    <CardDescription>Data diri pegawai</CardDescription>
                </CardHeader>
                <CardContent>
                    {auth.user?.pegawai &&
                        ((
                            <Table className="w-full">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-bold">
                                            Nama
                                        </TableCell>
                                        <TableCell>
                                            {auth.user.pegawai.gelarDepan &&
                                                `${auth.user.pegawai.gelarDepan} `}
                                            {auth.user.pegawai.nama}
                                            {auth.user.pegawai.gelarBelakang &&
                                                `, ${auth.user.pegawai.gelarBelakang}`}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold">
                                            NIP
                                        </TableCell>
                                        <TableCell>
                                            {auth.user.pegawai.nip}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold">
                                            NIK
                                        </TableCell>
                                        <TableCell>
                                            {auth.user.pegawai.nik}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold">
                                            NPWP
                                        </TableCell>
                                        <TableCell>
                                            {auth.user.pegawai.npwp}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold">
                                            No. Telepon
                                        </TableCell>
                                        <TableCell>
                                            {auth.user.pegawai.noTelp}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold">
                                            Jenis Kelamin
                                        </TableCell>
                                        <TableCell>
                                            {auth.user.pegawai.jenisKelamin}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold">
                                            Bank Rekening
                                        </TableCell>
                                        <TableCell>
                                            {auth.user.pegawai.bank?.nama}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold">
                                            No. Rekening
                                        </TableCell>
                                        <TableCell>
                                            {auth.user.pegawai.noRekening}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-bold">
                                            Nama Rekening
                                        </TableCell>
                                        <TableCell>
                                            {auth.user.pegawai.namaRekening}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        ) || <CardTitle>Profil belum terkoneksi</CardTitle>)}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Grafik Penghasilan</CardTitle>
                    <CardDescription>
                        Data penghasilan bersih per bulan
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={{
                            gaji: {
                                label: 'Gaji',
                                color: '#22c55e',
                            },
                            tunjangan: {
                                label: 'Tunjangan',
                                color: '#60a5fa',
                            },
                            jasaPelayanan: {
                                label: 'Jasa Pelayanan',
                                color: '#eab308',
                            },
                        }}
                        className="w-full"
                    >
                        <BarChart accessibilityLayer data={chartData}>
                            <YAxis />
                            <XAxis dataKey="month" />
                            <Bar
                                dataKey="gaji"
                                fill="var(--color-gaji)"
                                radius={10}
                            />
                            <Bar
                                dataKey="tunjangan"
                                fill="var(--color-tunjangan)"
                                radius={10}
                            />
                            <Bar
                                dataKey="jasaPelayanan"
                                fill="var(--color-jasaPelayanan)"
                                radius={10}
                            />
                            <Legend />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
