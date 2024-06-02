import { Button } from '@/web/components/ui/button'
import { FaWhatsapp } from 'react-icons/fa'
import { FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="flex w-full flex-col">
            <div className="rounded-lg bg-white px-8 pb-28 pt-20">
                <h2 className="text-5xl">Selamat datang di </h2>
                <h1 className="text-7xl font-bold">Aplikasi SIPEKA</h1>
                <p className="mb-5 mt-8 text-gray-600">
                    Jika ada pertanyaan atau kendala, silahkan hubungi admin
                </p>
                <div className="flex gap-2">
                    <Button asChild size="lg">
                        <Link to="/login">
                            Mulai Sekarang
                            <FiArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                    <Button asChild size="lg" className="bg-emerald-500">
                        <a href="https://wa.me/6285172277277">
                            <FaWhatsapp className="mr-2 h-5 w-5" />
                            Hubungi Admin
                        </a>
                    </Button>
                </div>
            </div>
            <div className="p-8">
                <p className="mb-2 text-sm">Build with:</p>
                <div className="grid max-w-48 grid-cols-3 gap-3">
                    <div className="flex flex-col justify-center">
                        <img
                            src="/images/icons/react.png"
                            className="mx-auto h-10"
                        />
                        <span className="text-center text-xs">React.js</span>
                    </div>
                    <div className="flex flex-col justify-center">
                        <img
                            src="/images/icons/hono.png"
                            className="mx-auto h-10"
                        />
                        <span className="text-center text-xs">Hono</span>
                    </div>
                    <div className="flex flex-col justify-center">
                        <img
                            src="/images/icons/tailwind.png"
                            className="mx-auto h-10"
                        />
                        <span className="text-center text-xs">Tailwind</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
