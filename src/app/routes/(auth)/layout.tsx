import { FaHeart } from 'react-icons/fa'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <div className="flex min-h-[calc(100svh-80px)] flex-row bg-background">
            <div className="hidden bg-slate-100 bg-[url(/images/side-img.jpg)] bg-cover bg-bottom sm:block md:w-1/2 lg:w-2/5"></div>
            <div className="flex w-full flex-col items-center justify-center px-5 md:w-1/2 lg:w-3/5">
                <Outlet />
                <p className="py-5 text-center text-xs text-gray-400">
                    &copy; {new Date().getFullYear()} SIPEKA - RSJD Atma Husada
                    Mahakam
                    <br />
                    Powered with{' '}
                    <FaHeart className="inline-block text-red-500" /> by
                    @tumbuhbarengstudio
                </p>
            </div>
        </div>
    )
}
