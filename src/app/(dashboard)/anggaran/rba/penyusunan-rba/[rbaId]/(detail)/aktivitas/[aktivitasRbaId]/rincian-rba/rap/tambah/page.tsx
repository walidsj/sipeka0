import { CardDescription, CardTitle } from '@/components/ui/card'
import CreateForm from './form'

export default function Page() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <CardTitle>Tambah Rincian RAP</CardTitle>
                <CardDescription>
                    Form untuk menambah rincian pada rap
                </CardDescription>
            </div>
            <CreateForm />
        </div>
    )
}
