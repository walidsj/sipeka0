import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import CreateForm from './form'

export default function CreatePegawai() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Pegawai</CardTitle>
                <CardDescription>
                    Form untuk menambah data pegawai
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CreateForm />
            </CardContent>
        </Card>
    )
}
