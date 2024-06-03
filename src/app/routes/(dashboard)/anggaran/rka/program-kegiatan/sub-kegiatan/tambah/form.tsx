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
import { subKegiatanRkaSchema } from '../schema'
import { Textarea } from '@/web/components/ui/textarea'
import KegiatanRkaPicker from '../../kegiatan-rka-picker'

const defaultValues = {
    nama: '',
    kode: '',
    kegiatanRkaId: undefined,
}

export default function CreateForm() {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof subKegiatanRkaSchema>>({
        resolver: zodResolver(subKegiatanRkaSchema),
        mode: 'onTouched',
        defaultValues,
    })

    const create = api.subKegiatanRka.create.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(data) {
            toast.dismiss()
            navigate('/anggaran/rka/program-kegiatan/sub-kegiatan')
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(data: z.infer<typeof subKegiatanRkaSchema>) {
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
                        control={form.control}
                        name="kegiatanRkaId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kegiatan</FormLabel>
                                <FormControl>
                                    <KegiatanRkaPicker
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="kode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kode Sub Kegiatan</FormLabel>
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
                                <FormLabel>Nama Sub Kegiatan</FormLabel>
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
