import { rincianRbaBelanja } from 'server/db/schema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { rincianRbaBelanjaSchema } from '#server/schema/rincian-rba-belanja'
import { Card, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import RabPicker from '@/components/rab-picker'
import { Label } from '@/components/ui/label'
import { NumericFormat } from 'react-number-format'

const newRincianRbaBelanjaSchema = rincianRbaBelanjaSchema.omit({
    aktivitasRbaId: true,
})

export default function EditForm({ data }: { data: typeof rincianRbaBelanja.$inferSelect }) {
    const navigate = useNavigate()
    const utils = api.useUtils()

    const form = useForm<z.infer<typeof newRincianRbaBelanjaSchema>>({
        resolver: zodResolver(newRincianRbaBelanjaSchema),
        mode: 'onTouched',
        defaultValues: {
            rabId: data.rabId ?? undefined,
            harga: Number(data.harga) ?? undefined,
            satuan: data.satuan ?? '',
            volume: Number(data.volume) ?? undefined,
        },
    })

    const edit = api.rincianRbaBelanja.updateById.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(res) {
            toast.dismiss()
            utils.rincianRbaBelanja.getById.invalidate()
            navigate(-1)
            toast.success(res.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(val: z.infer<typeof newRincianRbaBelanjaSchema>) {
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
                        name="rabId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Item RAB</FormLabel>
                                <FormControl>
                                    <RabPicker value={field.value} onValueChange={(val) => field.onChange(val)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Card className="mt-2">
                        <CardHeader>
                            <FormField
                                name="satuan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Satuan</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="volume"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Volume</FormLabel>
                                        <FormControl>
                                            <NumericFormat
                                                customInput={Input}
                                                value={field.value}
                                                onValueChange={(val) => field.onChange(val.floatValue)}
                                                thousandSeparator="."
                                                decimalSeparator=","
                                                decimalScale={2}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="harga"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Harga</FormLabel>
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
                            <div className="text-right">
                                <Label>Jumlah</Label>
                                <p className="text-lg font-semibold">
                                    {Number(
                                        form.watch('harga') && form.watch('volume')
                                            ? (form.watch('harga') as number) * (form.watch('volume') as number)
                                            : '0'
                                    ).toLocaleString('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                    })}
                                </p>
                            </div>
                        </CardHeader>
                    </Card>
                    <div className="mt-3">
                        <Button type="submit">{edit.isPending ? 'Menyimpan...' : 'Simpan'}</Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
