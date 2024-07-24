import NotFound from '@/app/not-found'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { api } from '@/trpc/react'
import { HiOutlineArrowSmRight, HiOutlineOfficeBuilding } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function Page() {
    const {
        isLoading,
        isError,
        data: rekeningBank,
    } = api.rekeningBank.getAll.useQuery()

    if (isLoading) return <Loading />

    if (isError) return <NotFound />

    if (!rekeningBank) return <NotFound />

    return (
        <div className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {rekeningBank.map((rekening) => (
                <Card>
                    <CardHeader className="flex flex-row gap-4">
                        <div className="w-full">
                            <CardTitle>{rekening.namaRekening}</CardTitle>
                            <CardDescription>
                                {rekening.bank?.nama}
                            </CardDescription>
                            <CardDescription>
                                {rekening.noRekening}
                            </CardDescription>
                        </div>
                        <HiOutlineOfficeBuilding className="flex-shrink-0 flex-grow-0 text-5xl text-primary" />
                    </CardHeader>
                    <CardFooter>
                        <Button asChild>
                            <Link to={String(rekening.id)}>
                                Lihat Data
                                <HiOutlineArrowSmRight className="ml-2" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}
