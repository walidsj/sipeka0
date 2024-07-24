import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import RekeningKoranTable from './table'
import { useParams } from 'react-router-dom'
import { api } from '@/trpc/react'
import NotFound from '@/app/not-found'
import Loading from '@/components/loading'

export default function Page() {
    const params = useParams<{ rekeningBankId: string }>()

    const {
        isError,
        isLoading,
        data: rekeningBank,
    } = api.rekeningBank.getById.useQuery(Number(params.rekeningBankId))

    if (isLoading) return <Loading />

    if (isError) return <NotFound />

    if (!rekeningBank) return <NotFound />

    return (
        <Card>
            <CardHeader>
                <CardTitle>Rekening Koran</CardTitle>
                <CardDescription>
                    Daftar Rekening Koran Bank BLUD
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-row items-center gap-4">
                    <img src="/images/icons/research.png" className="h-16" />
                    <div>
                        <CardDescription>
                            {rekeningBank?.noRekening}
                        </CardDescription>
                        <CardTitle>{rekeningBank?.namaRekening}</CardTitle>
                    </div>
                </div>
            </CardContent>
            <CardContent>
                <RekeningKoranTable />
            </CardContent>
        </Card>
    )
}
