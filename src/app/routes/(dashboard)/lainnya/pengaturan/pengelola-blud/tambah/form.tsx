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
import { pengelolaBludSchema } from '../schema'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/web/components/ui/select'
import PegawaiPicker from '../../../database/pegawai-picker'
import { format } from 'date-fns'

const defaultValues = {
    pegawaiId: undefined,
    role: undefined,
    noSk: '',
    tglSk: undefined,
}

export default function CreateForm() {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof pengelolaBludSchema>>({
        resolver: zodResolver(pengelolaBludSchema),
        mode: 'onTouched',
        defaultValues,
    })

    const create = api.pengelolaBlud.create.useMutation({
        onMutate() {
            toast.loading('Menyimpan data...')
        },
        onSuccess(data) {
            toast.dismiss()
            navigate('/lainnya/pengaturan/pengelola-blud')
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(data: z.infer<typeof pengelolaBludSchema>) {
        create.mutate(data)
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
                        name="pegawaiId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pegawai</FormLabel>
                                <FormControl>
                                    <PegawaiPicker
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Jabatan Pengelola</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {[
                                                'KUASA PENGGUNA ANGGARAN',
                                                'PEJABAT PELAKSANA TEKNIS KEGIATAN',
                                                'PEJABAT PEMBUAT KOMITMEN',
                                                'BENDAHARA PENGELUARAN',
                                                'BENDAHARA PENERIMAAN',
                                                'PEJABAT PENATAUSAHAAN KEUANGAN',
                                                'PENGURUS BARANG',
                                                'PEJABAT PENGADAAN',
                                            ].map((item) => (
                                                <SelectItem
                                                    key={item}
                                                    value={item}
                                                >
                                                    {item}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="noSk"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>No. SK</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tglSk"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tanggal SK</FormLabel>
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
                            {create.isPending ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
