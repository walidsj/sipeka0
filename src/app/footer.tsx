import { HiHeart } from 'react-icons/hi'

export default function Footer() {
    return (
        <footer className="bg-background w-full border-t shadow-sm">
            <div className="mx-auto flex flex-col items-center justify-between px-5 py-2 md:flex-row md:px-8 md:pr-6 lg:px-8 lg:pr-6 xl:px-12">
                <p className="text-left text-xs">
                    <HiHeart className="inline-block h-4 w-4 align-bottom text-red-500" />
                    <strong className="mr-2 border-r px-2">Versi {new Date().getFullYear()}</strong> Build{' '}
                    {new Date().getFullYear()}.{new Date().getMonth()}.{new Date().getDay()}
                </p>
            </div>
        </footer>
    )
}
