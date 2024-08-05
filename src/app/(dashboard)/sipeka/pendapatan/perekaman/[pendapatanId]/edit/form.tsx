import { pendapatan } from '@/server/db/schema'
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
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import { pendapatanSchema } from '@/server/api/schema/pendapatan'
import RapPicker from '@/components/rap-picker'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'
import { NumericFormat } from 'react-number-format'

export default function EditForm({
    data,
}: {
    data: typeof pendapatan.$inferSelect
}) {
    const navigate = useNavigate()
    const utils = api.useUtils()

    const form = useForm<z.infer<typeof pendapatanSchema>>({
        resolver: zodResolver(pendapatanSchema),
        mode: 'onTouched',
        defaultValues: {
            jumlah: Number(data.jumlah) ?? undefined,
            keterangan: data.keterangan ?? '',
            rapId: data.rapId ?? undefined,
            tglDokumen: data.tglDokumen ?? undefined,
        },
    })

    const edit = api.pendapatan.updateById.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(res) {
            toast.dismiss()
            utils.pendapatan.invalidate()
            navigate(-1)
            toast.success(res.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(val: z.infer<typeof pendapatanSchema>) {
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
                        name="rapId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Item RAP</FormLabel>
                                <FormControl>
                                    <RapPicker
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
                    <FormField
                        name="tglDokumen"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tanggal Dokumen</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        onChange={(e) =>
                                            field.onChange(e.target.valueAsDate)
                                        }
                                        value={
                                            field.value
                                                ? format(
                                                      field.value,
                                                      'yyyy-MM-dd'
                                                  )
                                                : undefined
                                        }
                                    />
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
                                        onValueChange={(val) =>
                                            field.onChange(val.floatValue)
                                        }
                                        thousandSeparator={true}
                                        decimalScale={2}
                                        prefix={'Rp '}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="keterangan"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Keterangan</FormLabel>
                                <FormControl>
                                    <Textarea
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
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
