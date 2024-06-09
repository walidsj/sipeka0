import { bankSchema } from '@/app/api/routers/database/bank.schema'
import { bank } from '@/server/db/schema'
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

export default function EditForm({ data }: { data: typeof bank.$inferSelect }) {
    const navigate = useNavigate()
    const utils = api.useUtils()

    const form = useForm<z.infer<typeof bankSchema>>({
        resolver: zodResolver(bankSchema),
        mode: 'onTouched',
        defaultValues: {
            nama: data.nama ?? '',
            kode: data.kode ?? '',
        },
    })

    const edit = api.bank.updateById.useMutation({
        onMutate() {
            toast.loading('Menyimpan bank...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.bank.getById.invalidate()
            navigate('/lainnya/database/bank')
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(val: z.infer<typeof bankSchema>) {
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
                        name="nama"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nama Bank</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="kode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Kode Bank</FormLabel>
                                <FormControl>
                                    <Input {...field} />
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
