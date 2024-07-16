import { sppTable } from '@/server/db/schema'
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
import { format } from 'date-fns'
import { sppSchema } from '@/server/api/schema/spp'
import LpjBelanjaPicker from '@/components/lpj-belanja-picker'

export default function EditForm({
    data,
}: {
    data: typeof sppTable.$inferSelect
}) {
    const navigate = useNavigate()
    const utils = api.useUtils()

    const form = useForm<z.infer<typeof sppSchema>>({
        resolver: zodResolver(sppSchema),
        mode: 'onTouched',
        defaultValues: {
            lpjBelanjaId: data.lpjBelanjaId || undefined,
            noDokumen: data.noDokumen || '',
            tglDokumen: data.tglDokumen || undefined,
        },
    })

    const edit = api.spp.updateById.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.spp.getById.invalidate()
            navigate(-1)
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(val: z.infer<typeof sppSchema>) {
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
                        name="lpjBelanjaId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>LPJ Belanja</FormLabel>
                                <FormControl>
                                    <LpjBelanjaPicker
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
