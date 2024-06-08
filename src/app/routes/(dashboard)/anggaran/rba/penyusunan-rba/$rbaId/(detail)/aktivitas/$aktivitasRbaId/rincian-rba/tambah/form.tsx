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
import { rincianRbaSchema } from '@/app/schema/rincian-rba'
import RabPicker from '@/app/routes/(dashboard)/anggaran/rba/daftar-rab/rab-picker'
import { Input } from '@/web/components/ui/input'
import { Label } from '@/web/components/ui/label'
import { Card, CardHeader } from '@/web/components/ui/card'

const newRincianRbaSchema = rincianRbaSchema.omit({ aktivitasRbaId: true })

export default function CreateForm() {
    const navigate = useNavigate()
    const params = useParams<{ rbaId: string; aktivitasRbaId: string }>()

    const form = useForm<z.infer<typeof newRincianRbaSchema>>({
        resolver: zodResolver(newRincianRbaSchema),
        mode: 'onTouched',
        defaultValues: {
            rabId: undefined,
            harga: undefined,
            keterangan: '',
            satuan: '',
            volume: undefined,
        },
    })

    const create = api.rincianRba.create.useMutation({
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

    function onSubmit(data: z.infer<typeof newRincianRbaSchema>) {
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
                                            <Input
                                                type="number"
                                                value={String(
                                                    field.value ?? ''
                                                )}
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
                            <FormField
                                name="harga"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Harga</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                value={String(
                                                    field.value ?? ''
                                                )}
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
                            {create.isPending ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
