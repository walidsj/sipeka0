import { Button } from '@/components/ui/button'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { HiOutlineArrowRight } from 'react-icons/hi'

export default function Page() {
    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
            {Array.from({ length: 7 }).map((_, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between p-3">
                        <div>
                            <CardDescription>
                                {new Date().getFullYear()}
                            </CardDescription>
                            <CardTitle>
                                {
                                    // nama bulan by index
                                    new Intl.DateTimeFormat('id-ID', {
                                        month: 'long',
                                    }).format(new Date(new Date().setMonth(i)))
                                }{' '}
                            </CardTitle>
                        </div>
                        <Button size="icon">
                            <HiOutlineArrowRight />
                        </Button>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}
