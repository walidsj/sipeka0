import { rku } from '@/server/db/schema'
import { Button } from '@/web/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/web/components/ui/form'
import { Input } from '@/web/components/ui/input'
import { api } from '@/web/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { format } from 'date-fns'
import { Textarea } from '@/web/components/ui/textarea'
import { rkuSchema } from '../../schema'
import UnitKerjaPicker from '@/app/routes/(dashboard)/lainnya/database/unit-kerja-picker'

export default function EditForm({ data }: { data: typeof rku.$inferSelect }) {
    const navigate = useNavigate()
    const utils = api.useUtils()

    const form = useForm<z.infer<typeof rkuSchema>>({
        resolver: zodResolver(rkuSchema),
        mode: 'onTouched',
        defaultValues: {
            unitKerjaId: data.unitKerjaId ?? undefined,
            noDokumen: data.noDokumen ?? '',
            uraian: data.uraian ?? '',
            tglDokumen: data.tglDokumen ?? undefined,
        },
    })

    const edit = api.rku.updateById.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.rku.getById.invalidate()
            navigate('/anggaran/rba/rku')
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(val: z.infer<typeof rkuSchema>) {
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
                        control={form.control}
                        name="unitKerjaId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Unit Kerja</FormLabel>
                                <FormControl>
                                    <UnitKerjaPicker
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="noDokumen"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>No. Dokumen</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
                                    <Textarea {...field} />
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
                                            field.onChange(
                                                new Date(e.target.value)
                                            )
                                        }
                                        value={
                                            field.value
                                                ? format(
                                                      new Date(field.value),
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
