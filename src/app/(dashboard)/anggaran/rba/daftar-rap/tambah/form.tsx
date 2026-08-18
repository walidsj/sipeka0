import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { rapSchema } from '#server/schema/rap'
import KodeRekeningPicker from '@/components/kode-rekening-picker'
import { Textarea } from '@/components/ui/textarea'

export default function CreateForm() {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof rapSchema>>({
        resolver: zodResolver(rapSchema),
        mode: 'onTouched',
        defaultValues: {
            kodeRekening: undefined,
            uraian: '',
        },
    })

    const create = api.rap.create.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(data) {
            toast.dismiss()
            navigate(-1)
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(data: z.infer<typeof rapSchema>) {
        create.mutate(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset disabled={create.isPending} className="flex max-w-96 flex-col gap-2">
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
                        <Button type="submit">{create.isPending ? 'Menyimpan...' : 'Simpan'}</Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
