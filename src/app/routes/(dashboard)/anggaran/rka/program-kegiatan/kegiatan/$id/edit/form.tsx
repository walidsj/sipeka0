import { kegiatanRka } from '@/server/db/schema'
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
import { Textarea } from '@/web/components/ui/textarea'
import ProgramRkaPicker from '../../../program-rka-picker'
import { kegiatanRkaSchema } from '../../schema'

export default function EditForm({
    data,
}: {
    data: typeof kegiatanRka.$inferSelect
}) {
    const navigate = useNavigate()
    const utils = api.useUtils()

    const form = useForm<z.infer<typeof kegiatanRkaSchema>>({
        resolver: zodResolver(kegiatanRkaSchema),
        mode: 'onTouched',
        defaultValues: {
            programRkaId: data.programRkaId ?? undefined,
            nama: data.nama ?? '',
            kode: data.kode ?? '',
        },
    })

    const edit = api.kegiatanRka.updateById.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.kegiatanRka.getById.invalidate()
            navigate('/anggaran/rka/program-kegiatan/kegiatan')
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(val: z.infer<typeof kegiatanRkaSchema>) {
        edit.mutate({ id: data.id, ...val })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={edit.isPending}
                    className="flex max-w-96 flex-col gap-2"
                >
                    <FormField
                        control={form.control}
                        name="programRkaId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Program</FormLabel>
                                <FormControl>
                                    <ProgramRkaPicker
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
                                <FormLabel>Kode Kegiatan</FormLabel>
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
                                <FormLabel>Nama Kegiatan</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-3">
                        <Button type="submit">
                            {edit.isPending ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
