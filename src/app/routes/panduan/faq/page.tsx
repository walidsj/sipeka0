import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/web/components/ui/accordion'

export default function () {
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
                            Aplikasi SIPD Nasional maka pastikan username dan
                            password yang dimasukkan benar atau pastikan akun
                            tersebut masih aktif
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}
