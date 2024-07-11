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
import { Input } from '@/components/ui/input'
import RapPicker from '@/components/rap-picker'
import { rincianRbaPendapatanSchema } from '@/server/api/schema/rincian-rba-pendapatan'
import { NumericFormat } from 'react-number-format'

const newRincianRbaPendapatanSchema = rincianRbaPendapatanSchema.omit({
    aktivitasRbaId: true,
})

export default function CreateForm() {
    const navigate = useNavigate()
    const params = useParams<{ rbaId: string; aktivitasRbaId: string }>()

    const form = useForm<z.infer<typeof newRincianRbaPendapatanSchema>>({
        resolver: zodResolver(newRincianRbaPendapatanSchema),
        mode: 'onTouched',
        defaultValues: {
            rapId: undefined,
            jumlah: undefined,
        },
    })

    const create = api.rincianRbaPendapatan.create.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(data) {
            toast.dismiss()
            navigate(
                `/anggaran/rba/penyusunan-rba/${params.rbaId}/aktivitas/${params.aktivitasRbaId}/rincian-rba`
            )
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(data: z.infer<typeof newRincianRbaPendapatanSchema>) {
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
                            {create.isPending ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
