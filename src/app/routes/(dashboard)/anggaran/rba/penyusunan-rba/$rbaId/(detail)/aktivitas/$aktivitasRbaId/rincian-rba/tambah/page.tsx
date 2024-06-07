import { CardDescription, CardTitle } from '@/web/components/ui/card'
import CreateForm from './form'

export default function Page() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <CardTitle>Tambah Rincian RBA</CardTitle>
                <CardDescription>
                    Form untuk menambah rincian pada rba
                </CardDescription>
            </div>
            <CreateForm />
        </div>
    )
}
