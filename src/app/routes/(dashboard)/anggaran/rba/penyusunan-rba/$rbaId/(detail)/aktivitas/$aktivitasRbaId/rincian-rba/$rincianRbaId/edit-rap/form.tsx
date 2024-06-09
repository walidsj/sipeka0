import { rincianRba } from '@/server/db/schema'
import { Button } from '@/web/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/web/components/ui/form'
import { api } from '@/web/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { rincianRbaSchema } from '@/app/api/schema/rincian-rba'
import { Input } from '@/web/components/ui/input'
import RapPicker from '@/app/routes/(dashboard)/anggaran/rba/daftar-rap/rap-picker'

const newRincianRbaSchema = rincianRbaSchema.omit({ aktivitasRbaId: true })

export default function EditForm({
    data,
}: {
    data: typeof rincianRba.$inferSelect
}) {
    const navigate = useNavigate()
    const utils = api.useUtils()
    const params = useParams<{ rbaId: string; aktivitasRbaId: string }>()

    const form = useForm<z.infer<typeof newRincianRbaSchema>>({
        resolver: zodResolver(newRincianRbaSchema),
        mode: 'onTouched',
        defaultValues: {
            rapId: data.rapId ?? undefined,
            jumlah: Number(data.jumlah) ?? undefined,
        },
    })

    const edit = api.rincianRba.updateRapById.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(res) {
            toast.dismiss()
            utils.rincianRba.getById.invalidate()
            navigate(
                `/anggaran/rba/penyusunan-rba/${params.rbaId}/aktivitas/${data.aktivitasRbaId}/rincian-rba`
            )
            toast.success(res.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(val: z.infer<typeof newRincianRbaSchema>) {
        edit.mutate({
            id: data.id,
            aktivitasRbaId: data.aktivitasRbaId ?? 0,
            ...val,
        })
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
                        name="jumlah"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Jumlah</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        value={String(field.value ?? '')}
                                        onChange={(e) => {
                                            field.onChange(
                                                Number(e.target.value)
                                            )
                                        }}
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
