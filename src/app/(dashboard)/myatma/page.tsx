import { CardDescription, CardTitle } from '@/components/ui/card'
import { FaHeart } from 'react-icons/fa6'

export default function Page() {
    return (
        <div className="pt-10 text-center">
            <CardTitle className="text-7xl">MyAtma</CardTitle>
            <CardDescription className="text-3xl">
                Coming Soon{' '}
                <FaHeart className="inline-block h-8 w-8 text-red-500" />
            </CardDescription>
        </div>
    )
}
