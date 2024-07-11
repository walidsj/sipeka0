import { FaHeart } from 'react-icons/fa6'

export default function Footer() {
    return (
        <footer className="flex flex-col justify-between gap-5 bg-primary px-5 py-5 text-sm text-white md:flex-row md:px-8 lg:px-10 xl:px-12">
            <p>&copy;{new Date().getFullYear()} by RSJD Atma Husada Mahakam</p>
            <p>
                Build with{' '}
                <FaHeart className="inline-block h-5 w-5 text-red-500" />
            </p>
        </footer>
    )
}
