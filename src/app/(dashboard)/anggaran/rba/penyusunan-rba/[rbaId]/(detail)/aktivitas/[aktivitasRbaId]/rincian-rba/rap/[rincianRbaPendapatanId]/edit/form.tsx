import { rincianRbaPendapatan } from 'server/db/schema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { rincianRbaPendapatanSchema } from '#server/schema/rincian-rba-pendapatan'
import { Input } from '@/components/ui/input'
import RapPicker from '@/components/rap-picker'
import { NumericFormat } from 'react-number-format'

const newRincianRbaPendapatanSchema = rincianRbaPendapatanSchema.omit({
    aktivitasRbaId: true,
})

export default function EditForm({ data }: { data: typeof rincianRbaPendapatan.$inferSelect }) {
    const navigate = useNavigate()
    const utils = api.useUtils()

    const form = useForm<z.infer<typeof newRincianRbaPendapatanSchema>>({
        resolver: zodResolver(newRincianRbaPendapatanSchema),
        mode: 'onTouched',
        defaultValues: {
            rapId: data.rapId ?? undefined,
            jumlah: Number(data.jumlah) ?? undefined,
        },
    })

    const edit = api.rincianRbaPendapatan.updateById.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(res) {
            toast.dismiss()
            utils.rincianRbaPendapatan.getById.invalidate()
            navigate(-1)
            toast.success(res.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(val: z.infer<typeof newRincianRbaPendapatanSchema>) {
        edit.mutate({
            id: data.id,
            aktivitasRbaId: data.aktivitasRbaId ?? 0,
            ...val,
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset disabled={edit.isPending} className="flex max-w-96 flex-col gap-2">
                    <FormField
                        name="rapId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Item RAP</FormLabel>
                                <FormControl>
                                    <RapPicker value={field.value} onValueChange={(val) => field.onChange(val)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="jumlah"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Jumlah</FormLabel>
                                <FormControl>
                                    <NumericFormat
                                        customInput={Input}
                                        value={field.value}
                                        onValueChange={(val) => field.onChange(val.floatValue)}
                                        thousandSeparator="."
                                        decimalSeparator=","
                                        decimalScale={2}
                                        prefix={'Rp '}
                                    />
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
