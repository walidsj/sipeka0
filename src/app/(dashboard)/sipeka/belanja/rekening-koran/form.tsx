import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { format } from 'date-fns'
import { rekeningKoranSchema } from '@/server/api/schema/rekening-koran'
import { NumericFormat } from 'react-number-format'

const createRekeningKoranSchema = rekeningKoranSchema.omit({
    rekeningBankId: true,
})

export default function CreateForm({
    rekeningBankId,
}: {
    rekeningBankId: number
}) {
    const utils = api.useUtils()

    const form = useForm<z.infer<typeof createRekeningKoranSchema>>({
        resolver: zodResolver(createRekeningKoranSchema),
        mode: 'onTouched',
        defaultValues: {
            tglTransaksi: undefined,
            keterangan: undefined,
            noReferensi: undefined,
            debet: undefined,
            kredit: undefined,
        },
    })

    const create = api.rekeningKoran.create.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.rekeningKoran.invalidate()
            form.reset()
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(data: z.infer<typeof createRekeningKoranSchema>) {
        create.mutate({ rekeningBankId: rekeningBankId, ...data })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={create.isPending}
                    className="flex flex-row items-end gap-2"
                >
                    <FormField
                        name="tglTransaksi"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="normal-case">
                                    Tanggal Transaksi
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="font-normal"
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
                        name="keterangan"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="normal-case">
                                    Keterangan Mutasi
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="font-normal"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="noReferensi"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="normal-case">
                                    No. Referensi
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="font-normal"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="debet"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="normal-case">
                                    Debet
                                </FormLabel>
                                <FormControl>
                                    <NumericFormat
                                        className="font-normal"
                                        customInput={Input}
                                        value={field.value}
                                        onValueChange={(val) =>
                                            field.onChange(val.floatValue)
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
                    <FormField
                        name="kredit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="normal-case">
                                    Kredit
                                </FormLabel>
                                <FormControl>
                                    <NumericFormat
                                        className="font-normal"
                                        customInput={Input}
                                        value={field.value}
                                        onValueChange={(val) =>
                                            field.onChange(val.floatValue)
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
                    <div className="mt-3">
                        <Button type="submit">
                            {create.isPending ? 'Menyimpan...' : 'Tambah'}
                        </Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
