import ReloadButton from '@/components/reload-button'
import { FaHeart } from 'react-icons/fa6'

export default function Footer() {
    return (
        <footer className="flex flex-col items-center justify-between gap-5 bg-primary px-5 py-5 text-sm text-white md:flex-row md:px-8 lg:px-10 xl:px-12">
            <p className="text-left">
                &copy;{new Date().getFullYear()} by RSJD Atma Husada Mahakam
            </p>
            <p className="text-center">
                Build with{' '}
                <FaHeart className="inline-block h-5 w-5 text-red-500" />
            </p>
            <div className="text-right">
                <ReloadButton />
            </div>
        </footer>
    )
}
