import { aktivitasRba } from '@/server/db/schema'
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
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import {
    SelectItem,
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { aktivitasRbaSchema } from '@/server/api/schema/aktivitas-rba'

const newAktivitasRbaSchema = aktivitasRbaSchema.omit({ rbaId: true })

export default function EditForm({
    data,
}: {
    data: typeof aktivitasRba.$inferSelect
}) {
    const navigate = useNavigate()
    const utils = api.useUtils()

    const form = useForm<z.infer<typeof newAktivitasRbaSchema>>({
        resolver: zodResolver(newAktivitasRbaSchema),
        mode: 'onTouched',
        defaultValues: {
            kode: data.kode ?? '',
            nama: data.nama ?? '',
            jenis: data.jenis ?? undefined,
        },
    })

    const edit = api.aktivitasRba.updateById.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(res) {
            toast.dismiss()
            utils.aktivitasRba.getById.invalidate()
            navigate(
                `/anggaran/rba/penyusunan-rba/${String(data.rbaId)}/aktivitas`
            )
            toast.success(res.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(val: z.infer<typeof newAktivitasRbaSchema>) {
        edit.mutate({ id: data.id, rbaId: data.rbaId ?? 0, ...val })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={edit.isPending}
                    className="flex max-w-96 flex-col gap-2"
                >
                    <FormField
                        control={form.control}
                        name="jenis"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Jenis</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="BELANJA">
                                                BELANJA
                                            </SelectItem>
                                            <SelectItem value="PENDAPATAN">
                                                PENDAPATAN
                                            </SelectItem>
                                            <SelectItem value="PEMBIAYAAN">
                                                PEMBIAYAAN
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="kode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kode Aktivitas</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="nama"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Aktivitas</FormLabel>
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
