import { Button } from '@/components/ui/button'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { HiOutlineArrowSmRight } from 'react-icons/hi'
import { Link } from 'react-router-dom'

export default function Page() {
    return (
        <div className="grid grid-cols-1 gap-4 pb-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row gap-4">
                    <div className="w-full">
                        <CardDescription>Integrasi</CardDescription>
                        <CardTitle className="mb-3">SIPD RI</CardTitle>
                        <CardDescription className="mb-3">
                            sipd.kemendagri.go.id
                        </CardDescription>
                        <Button asChild>
                            <Link to="sipd/login">
                                Akses
                                <HiOutlineArrowSmRight className="ml-2" />
                            </Link>
                        </Button>
                    </div>
                    <img src="/images/logo-sipd.svg" className="w-20" />
                </CardHeader>
            </Card>
        </div>
    )
}
