import { CardDescription, CardTitle } from '@/components/ui/card'
import CreateForm from './form'

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
                <CardTitle>Tambah Pengelola</CardTitle>
                <CardDescription>
                    Form untuk menambah data pengelola
                </CardDescription>
            </div>
            <CreateForm />
        </div>
    )
}
