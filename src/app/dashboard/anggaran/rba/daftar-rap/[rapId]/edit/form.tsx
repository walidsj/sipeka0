import { rap } from 'server/db/schema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import { rapSchema } from '#server/schema/rap'
import KodeRekeningPicker from '@/components/kode-rekening-picker'

export default function EditForm({ data }: { data: typeof rap.$inferSelect }) {
    const navigate = useNavigate()
    const utils = api.useUtils()

    const form = useForm<z.infer<typeof rapSchema>>({
        resolver: zodResolver(rapSchema),
        mode: 'onTouched',
        defaultValues: {
            kodeRekening: data.kodeRekening ?? undefined,
            uraian: data.uraian ?? '',
        },
    })

    const edit = api.rap.updateById.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(res) {
            toast.dismiss()
            utils.rap.getById.invalidate()
            navigate(-1)
            toast.success(res.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(val: z.infer<typeof rapSchema>) {
        edit.mutate({ id: data.id, ...val })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset disabled={edit.isPending} className="flex max-w-96 flex-col gap-2">
                    <FormField
                        name="kodeRekening"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kode Rekening</FormLabel>
                                <FormControl>
                                    <KodeRekeningPicker
                                        value={field.value}
                                        onValueChange={(val) => field.onChange(val)}
                                        params={{
                                            searchKode: '4',
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="uraian"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Uraian</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-3">
                        <Button type="submit">{edit.isPending ? 'Menyimpan...' : 'Simpan'}</Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
