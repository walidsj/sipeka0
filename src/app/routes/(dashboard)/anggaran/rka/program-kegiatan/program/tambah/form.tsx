import { Button } from '@/web/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/web/components/ui/form'
import { Input } from '@/web/components/ui/input'
import { api } from '@/web/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { programRkaSchema } from '../schema'
import { Textarea } from '@/web/components/ui/textarea'

const defaultValues = {
    nama: '',
    kode: '',
}

export default function CreateForm() {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof programRkaSchema>>({
        resolver: zodResolver(programRkaSchema),
        mode: 'onTouched',
        defaultValues,
    })

    const create = api.programRka.create.useMutation({
        onMutate() {
            toast.loading('Menyimpan programRka...')
        },
        onSuccess(data) {
            toast.dismiss()
            navigate('/anggaran/rka/program-kegiatan/program')
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(data: z.infer<typeof programRkaSchema>) {
        create.mutate(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={create.isPending}
                    className="flex max-w-96 flex-col gap-2"
                >
                    <FormField
                        name="kode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kode Program</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="nama"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Program</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="mt-3">
                        <Button type="submit">
                            {create.isPending ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
