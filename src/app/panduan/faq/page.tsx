import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'

export default function Page() {
    return (
        <div className="flex w-full flex-col px-5 py-5 md:px-8 lg:px-10 xl:px-12">
            <h2 className="text-3xl font-extrabold">
                Frequently Asked Question (FAQ)
            </h2>
            <div className="py-8 text-justify">
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="1">
                        <AccordionTrigger>
                            Akun tidak dapat login/masuk ke dalam Aplikasi
                            SIPEKA
                        </AccordionTrigger>
                        <AccordionContent>
                            Jika akun tersebut tidak dapat masuk / login kedalam
                            Aplikasi SIPEKA maka pastikan username dan password
                            yang dimasukkan benar atau pastikan akun tersebut
                            masih aktif.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="2">
                        <AccordionTrigger>
                            Saya tidak punya TokenID untuk registrasi
                        </AccordionTrigger>
                        <AccordionContent>
                            TokenID merupakan kode unik dalam rangka memperkuat
                            keamanan aplikasi yang diberikan oleh Admin kepada
                            pengguna baru untuk melakukan registrasi akun. Jika
                            anda tidak memiliki TokenID silahkan hubungi Admin
                            untuk mendapatkan TokenID.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}
