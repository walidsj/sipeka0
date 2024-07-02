import { belanja } from '@/server/db/schema'
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
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Textarea } from '@/web/components/ui/textarea'
import { belanjaSchema } from '@/app/api/modules/belanja/schema'
import { Input } from '@/web/components/ui/input'
import { format } from 'date-fns'
import { NumericFormat } from 'react-number-format'
import PegawaiPicker from '@/app/routes/(dashboard)/lainnya/database/pegawai-picker'
import RekananPicker from '@/app/routes/(dashboard)/lainnya/database/rekanan-picker'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/web/components/ui/select'
import RabPicker from '@/app/routes/(dashboard)/anggaran/rba/daftar-rab/rab-picker'

export default function EditForm({
    data,
}: {
    data: typeof belanja.$inferSelect
}) {
    const navigate = useNavigate()
    const utils = api.useUtils()

    const form = useForm<z.infer<typeof belanjaSchema>>({
        resolver: zodResolver(belanjaSchema),
        mode: 'onTouched',
        defaultValues: {
            jumlah: Number(data.jumlah),
            uraian: data.uraian ?? '',
            rabId: data.rabId ?? undefined,
            tglDokumen: data.tglDokumen ?? undefined,
            buktiPembayaran: data.buktiPembayaran ?? '',
            metodePembayaran: data.metodePembayaran ?? undefined,
            noDokumen: data.noDokumen ?? '',
            pegawaiId: data.pegawaiId ?? undefined,
            rekananId: data.rekananId ?? undefined,
        },
    })

    const edit = api.belanja.updateById.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(res) {
            toast.dismiss()
            utils.belanja.invalidate()
            // navigate(`/belanja/perekaman`)
            navigate(-1)
            toast.success(res.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(val: z.infer<typeof belanjaSchema>) {
        edit.mutate({ id: data.id, ...val })
    }

    function handleAtasNama(val: string) {
        const uraian = form.getValues('uraian')
        console.log(uraian, val)
        const newUraian = uraian.includes('a.n.')
            ? uraian.replace(/[\s\S]a.n. [\s\S]*/g, val ? ` a.n. ${val}` : '')
            : uraian + (val ? ` a.n. ${val}` : '')

        return form.setValue('uraian', newUraian)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={edit.isPending}
                    className="flex max-w-96 flex-col gap-2"
                >
                    <FormField
                        name="noDokumen"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>No. Dokumen</FormLabel>
                                <FormControl>
                                    <Input
                                        value={field.value}
                                        onChange={field.onChange}
                                        className="h-12 text-xl font-bold"
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
                    <FormField
                        name="uraian"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Uraian</FormLabel>
                                <FormControl>
                                    <Textarea
                                        value={field.value}
                                        onChange={field.onChange}
                                        rows={4}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="metodePembayaran"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Metode Pembayaran</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="TUNAI">
                                                TUNAI
                                            </SelectItem>
                                            <SelectItem value="TRANSFER">
                                                TRANSFER
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="buktiPembayaran"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bukti Pembayaran</FormLabel>
                                <FormControl>
                                    <Input
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="rekananId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Rekanan</FormLabel>
                                <FormControl>
                                    <RekananPicker
                                        value={field.value}
                                        onValueChange={(val, item) => {
                                            field.onChange(val)
                                            if (item) {
                                                handleAtasNama(item.nama!)
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="pegawaiId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pegawai</FormLabel>
                                <FormControl>
                                    <PegawaiPicker
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
