import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { rincianRbaBelanjaSchema } from '@/server/api/schema/rincian-rba-belanja'
import RabPicker from '@/components/rab-picker'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader } from '@/components/ui/card'
import { NumericFormat } from 'react-number-format'

const newRincianRbaBelanjaSchema = rincianRbaBelanjaSchema.omit({
    aktivitasRbaId: true,
})

export default function CreateForm() {
    const navigate = useNavigate()
    const params = useParams<{ rbaId: string; aktivitasRbaId: string }>()

    const form = useForm<z.infer<typeof newRincianRbaBelanjaSchema>>({
        resolver: zodResolver(newRincianRbaBelanjaSchema),
        mode: 'onTouched',
        defaultValues: {
            rabId: undefined,
            harga: undefined,
            satuan: '',
            volume: undefined,
        },
    })

    const create = api.rincianRbaBelanja.create.useMutation({
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

    function onSubmit(data: z.infer<typeof newRincianRbaBelanjaSchema>) {
        create.mutate({
            aktivitasRbaId: parseInt(params.aktivitasRbaId ?? ''),
            ...data,
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={create.isPending}
                    className="flex max-w-96 flex-col gap-2"
                >
                    <FormField
                        name="rabId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Item RAB</FormLabel>
                                <FormControl>
                                    <RabPicker
                                        value={field.value}
                                        onValueChange={(val) =>
                                            field.onChange(val)
                                        }
                                    />
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
                                                onValueChange={(val) =>
                                                    field.onChange(
                                                        val.floatValue
                                                    )
                                                }
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
                                                onValueChange={(val) =>
                                                    field.onChange(
                                                        val.floatValue
                                                    )
                                                }
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
                                        form.watch('harga') &&
                                            form.watch('volume')
                                            ? (form.watch('harga') as number) *
                                                  (form.watch(
                                                      'volume'
                                                  ) as number)
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
                        <Button type="submit">
                            {create.isPending ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
