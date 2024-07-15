import ReloadButton from '@/components/reload-button'
import { HiHeart } from 'react-icons/hi'

export default function Footer() {
    return (
        <footer className="w-full bg-background">
            <div className="mx-auto flex flex-col items-center justify-between px-5 py-2 md:flex-row md:px-8 md:pr-6 lg:px-8 lg:pr-6 xl:px-12">
                <p className="text-left text-xs">
                    <HiHeart className="mr-1 inline-block h-4 w-4 align-bottom text-red-500" />
                    <strong>Versi {'__VERSION__'}</strong> Build{' '}
                    {'__BUILDDATE__'}
                </p>
                <div className="text-right">
                    <ReloadButton />
                </div>
            </div>
        </footer>
    )
}
