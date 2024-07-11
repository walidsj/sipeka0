import { pegawai } from '@/server/db/schema'
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import BankPicker from '@/components/bank-picker'
import { Textarea } from '@/components/ui/textarea'
import { pegawaiSchema } from '@/server/api/schema/pegawai'

export default function EditForm({
    data,
}: {
    data: typeof pegawai.$inferSelect
}) {
    const navigate = useNavigate()
    const utils = api.useUtils()

    const form = useForm<z.infer<typeof pegawaiSchema>>({
        resolver: zodResolver(pegawaiSchema),
        mode: 'onTouched',
        defaultValues: {
            nama: data.nama ?? '',
            gelarDepan: data.gelarDepan ?? '',
            gelarBelakang: data.gelarBelakang ?? '',
            nip: data.nip ?? '',
            nik: data.nik ?? '',
            jabatan: data.jabatan ?? '',
            npwp: data.npwp ?? '',
            noTelp: data.noTelp ?? '',
            statusPegawai: data.statusPegawai ?? undefined,
            bankId: data.bankId ?? undefined,
            namaRekening: data.namaRekening ?? '',
            noRekening: data.noRekening ?? '',
            jenisKelamin: data.jenisKelamin ?? undefined,
        },
    })

    const edit = api.pegawai.updateById.useMutation({
        onMutate() {
            toast.loading('Menyimpan pegawai...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.pegawai.getById.invalidate()
            navigate('/lainnya/database/pegawai')
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(val: z.infer<typeof pegawaiSchema>) {
        edit.mutate({ id: data.id, ...val })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset disabled={edit.isPending} className="max-w-3xl">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="flex flex-col gap-2">
                            <FormField
                                name="nama"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Pegawai</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="gelarDepan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gelar Depan</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="gelarBelakang"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Gelar Belakang</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="nip"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>NIP</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="nik"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>NIK</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="jabatan"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jabatan</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <FormField
                                name="npwp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>NPWP</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="noTelp"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>No. Telp</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="statusPegawai"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jenis Pegawai</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="PNS">
                                                        PNS
                                                    </SelectItem>
                                                    <SelectItem value="PPPK">
                                                        PPPK
                                                    </SelectItem>
                                                    <SelectItem value="NON ASN">
                                                        NON ASN
                                                    </SelectItem>
                                                    <SelectItem value="MOU">
                                                        MOU
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="jenisKelamin"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Jenis Kelamin</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="LAKI-LAKI">
                                                        LAKI-LAKI
                                                    </SelectItem>
                                                    <SelectItem value="PEREMPUAN">
                                                        PEREMPUAN
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bankId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bank</FormLabel>
                                        <FormControl>
                                            <BankPicker
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="namaRekening"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Rekening</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="noRekening"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>No. Rekening</FormLabel>
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
                        </div>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
