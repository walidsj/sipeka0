import { Skeleton } from './ui/skeleton'

export default function Loading() {
    return (
        <div className="flex w-full items-center justify-center">
            <div className="flex gap-2">
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-3 rounded-full" />
                <Skeleton className="h-3 w-3 rounded-full" />
            </div>
        </div>
    )
}
