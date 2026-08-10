import { dba } from 'server/db/schema'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { format } from 'date-fns'
import { Textarea } from '@/components/ui/textarea'
import { dbaSchema } from '#server/schema/dba'
import RbaPicker from '@/components/rba-picker'

export default function EditForm({ data }: { data: typeof dba.$inferSelect }) {
    const navigate = useNavigate()
    const utils = api.useUtils()

    const form = useForm<z.infer<typeof dbaSchema>>({
        resolver: zodResolver(dbaSchema),
        mode: 'onTouched',
        defaultValues: {
            rbaId: data.rbaId ?? undefined,
            noDokumen: data.noDokumen ?? '',
            uraian: data.uraian ?? '',
            tglDokumen: data.tglDokumen ?? undefined,
        },
    })

    const edit = api.dba.updateById.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.dba.getById.invalidate()
            navigate('/sipeka/anggaran/dba/penetapan')
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(val: z.infer<typeof dbaSchema>) {
        edit.mutate({ id: data.id, ...val })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset disabled={edit.isPending} className="flex max-w-96 flex-col gap-2">
                    <FormField
                        name="rbaId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Dokumen RBA</FormLabel>
                                <FormControl>
                                    <RbaPicker value={field.value} onValueChange={(val) => field.onChange(val)} />
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
                                        onChange={(e) => field.onChange(new Date(e.target.value))}
                                        value={field.value ? format(new Date(field.value), 'yyyy-MM-dd') : undefined}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="mt-3">
                        <Button type="submit">{edit.isPending ? 'Menyimpan...' : 'Simpan'}</Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
