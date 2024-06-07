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
import { Textarea } from '@/web/components/ui/textarea'
import KodeRekeningPicker from '@/app/routes/(dashboard)/lainnya/referensi/kode-rekening-picker'
import { rincianRbaSchema } from '@/app/schema/rincian-rba'

const newRincianRbaSchema = rincianRbaSchema.omit({ aktivitasRbaId: true })

export default function EditForm({
    data,
}: {
    data: typeof rincianRba.$inferSelect
}) {
    const navigate = useNavigate()
    const utils = api.useUtils()
    const params = useParams<{ rbaId: string; aktivitasRbaId: string }>()

    const aktivitasRba = api.aktivitasRba.getById.useQuery(
        parseInt(params.aktivitasRbaId ?? '')
    )

    const form = useForm<z.infer<typeof newRincianRbaSchema>>({
        resolver: zodResolver(newRincianRbaSchema),
        mode: 'onTouched',
        defaultValues: {
            rabId: data.rabId ?? undefined,
            harga: Number(data.harga) ?? undefined,
            keterangan: data.keterangan ?? '',
            satuan: data.satuan ?? '',
            volume: Number(data.volume) ?? undefined,
        },
    })

    const edit = api.rincianRba.updateById.useMutation({
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
                        name="kodeRekening"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kode Rekening</FormLabel>
                                <FormControl>
                                    <KodeRekeningPicker
                                        value={field.value}
                                        onValueChange={(val) =>
                                            field.onChange(val)
                                        }
                                        params={{
                                            searchKode:
                                                aktivitasRba.data?.jenis ===
                                                'BELANJA'
                                                    ? '5'
                                                    : aktivitasRba.data
                                                            ?.jenis ===
                                                        'PENDAPATAN'
                                                      ? '4'
                                                      : '',
                                        }}
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
