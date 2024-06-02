import { CardDescription, CardTitle } from '@/web/components/ui/card'
import CreateForm from './form'

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <div>
                <CardTitle>Tambah Pengelola</CardTitle>
                <CardDescription>
                    Form untuk menambah data pengelola
                </CardDescription>
            </div>
            <CreateForm />
        </div>
    )
}
