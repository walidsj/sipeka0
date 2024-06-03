import { CardDescription, CardTitle } from '@/web/components/ui/card'
import CreateForm from './form'

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
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
