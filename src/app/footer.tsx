import ReloadButton from '@/components/reload-button'
import { FaHeart } from 'react-icons/fa6'

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-between gap-5 bg-background px-5 py-5 text-sm md:flex-row md:px-8 lg:px-10 xl:px-12">
            <p className="text-left">
                &copy;{new Date().getFullYear()} RSJD Atma Husada Mahakam. All
                Rights Reserved. Build with{' '}
                <FaHeart className="inline-block h-5 w-5 text-red-500" />
                <br />
                <span className="text-xs">
                    Versi {'__VERSION__'} Terakhir Update {'__BUILDDATE__'}
                </span>
            </p>
            <div className="text-right">
                <ReloadButton />
            </div>
        </footer>
    )
}
