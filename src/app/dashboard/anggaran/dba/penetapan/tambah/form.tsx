import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import { format } from 'date-fns'
import { dbaSchema } from '#server/schema/dba'
import RbaPicker from '@/components/rba-picker'

export default function CreateForm() {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof dbaSchema>>({
        resolver: zodResolver(dbaSchema),
        mode: 'onTouched',
        defaultValues: {
            rbaId: undefined,
            noDokumen: '',
            uraian: '',
            tglDokumen: undefined,
        },
    })

    const create = api.dba.create.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(data) {
            toast.dismiss()
            navigate('/sipeka/anggaran/dba/penetapan')
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(data: z.infer<typeof dbaSchema>) {
        create.mutate(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset disabled={create.isPending} className="flex max-w-96 flex-col gap-2">
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
                        <Button type="submit">{create.isPending ? 'Menyimpan...' : 'Simpan'}</Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
