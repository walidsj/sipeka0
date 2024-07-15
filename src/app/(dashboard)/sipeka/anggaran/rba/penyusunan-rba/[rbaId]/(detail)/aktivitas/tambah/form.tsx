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
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { aktivitasRbaSchema } from '@/server/api/schema/aktivitas-rba'

const newAktivitasRbaSchema = aktivitasRbaSchema.omit({ rbaId: true })

export default function CreateForm() {
    const navigate = useNavigate()
    const params = useParams<{ rbaId: string }>()

    const form = useForm<z.infer<typeof newAktivitasRbaSchema>>({
        resolver: zodResolver(newAktivitasRbaSchema),
        mode: 'onTouched',
        defaultValues: {
            kode: '',
            nama: '',
            jenis: undefined,
        },
    })

    const create = api.aktivitasRba.create.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(data) {
            toast.dismiss()
            navigate(-1)
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(data: z.infer<typeof newAktivitasRbaSchema>) {
        create.mutate({ rbaId: parseInt(params.rbaId ?? ''), ...data })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={create.isPending}
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
                            {create.isPending ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
