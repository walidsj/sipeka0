import { CardDescription, CardTitle } from '@/components/ui/card'
import CreateForm from './form'

export default function Page() {
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1.5">
                <CardTitle>Tambah Aktivitas</CardTitle>
                <CardDescription>
                    Form untuk menambah aktivitas pada rba
                </CardDescription>
            </div>
            <CreateForm />
        </div>
    )
}
