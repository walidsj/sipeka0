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
import { Textarea } from '@/web/components/ui/textarea'
import { format } from 'date-fns'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/web/components/ui/select'
import { lpjBelanjaSchema } from '@/app/api/schema/lpj_belanja'

export default function CreateForm() {
    const navigate = useNavigate()

    const utils = api.useUtils()

    const form = useForm<z.infer<typeof lpjBelanjaSchema>>({
        resolver: zodResolver(lpjBelanjaSchema),
        mode: 'onTouched',
        defaultValues: {
            jenis: undefined,
            noDokumen: '',
            tglDokumen: undefined,
            uraian: '',
        },
    })

    const create = api.lpjBelanja.create.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.lpjBelanja.invalidate()
            navigate(-1)
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(data: z.infer<typeof lpjBelanjaSchema>) {
        create.mutate(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={create.isPending}
                    className="flex flex-col gap-2"
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
                                            <SelectItem value="GU">
                                                GU
                                            </SelectItem>
                                            <SelectItem value="LS">
                                                LS
                                            </SelectItem>
                                            <SelectItem value="TU">
                                                TU
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
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
