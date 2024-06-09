import { Button } from '@/web/components/ui/button'
import { Helmet } from 'react-helmet'
import { FiDownload } from 'react-icons/fi'

export default function Page() {
    return (
        <div className="flex w-full flex-col px-8 py-5">
            <Helmet>
                <title>Panduan - SIPEKA</title>
            </Helmet>
            <h2 className="text-3xl font-extrabold">
                Panduan Penggunaan Aplikasi
            </h2>
            <div className="py-5">
                <p>
                    Aplikasi ini memiliki beberapa fitur yang dapat digunakan
                    oleh pengguna.
                </p>
            </div>
            <Button asChild size="lg" className="mr-auto">
                <a href="https://wa.me/6285172277277">
                    <FiDownload className="mr-2 h-5 w-5" />
                    Download EBook Panduan
                </a>
            </Button>
        </div>
    )
}
