import { Button } from '@/web/components/ui/button'
import { FiHome } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center pt-28">
            <img
                src="/images/icons/404-error.png"
                alt="404"
                className="mb-5 w-36"
            />
            <h1 className="text-center text-4xl font-bold">We&apos;re Sorry</h1>
            <p className="mb-5 text-center text-lg">
                Halaman yang Anda cari tidak ditemukan
            </p>
            <Button asChild>
                <Link to="/home">
                    <FiHome className="mr-2" />
                    Kembali ke Home
                </Link>
            </Button>
        </div>
    )
}
