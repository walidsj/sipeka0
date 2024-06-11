import { Button } from '@/web/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/web/components/ui/form'
import { api } from '@/web/trpc/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'
import { aktivitasRbaSchema } from '@/app/api/schema/aktivitas-rba'
import SubKegiatanRkaPicker from '../../../../program-kegiatan/sub-kegiatan-rka-picker'
import AktivitasByRkaPicker from '@/app/routes/(dashboard)/anggaran/rba/penyusunan-rba/$rbaId/(detail)/aktivitas/aktivitas-by-rka-picker'

const addAktivitasSchema = aktivitasRbaSchema
    .pick({
        subKegiatanRkaId: true,
    })
    .merge(z.object({ aktivitasRbaId: z.number() }))

export default function AddAktivitasToSubKegiatanForm() {
    const navigate = useNavigate()
    const params = useParams<{ rkaId: string }>()

    const form = useForm<z.infer<typeof addAktivitasSchema>>({
        resolver: zodResolver(addAktivitasSchema),
        mode: 'onTouched',
        defaultValues: {
            aktivitasRbaId: undefined,
            subKegiatanRkaId: undefined,
        },
    })

    const addAktivitasToSubKegiatan =
        api.rka.addAktivitasToSubKegiatan.useMutation({
            onMutate() {
                toast.loading('Menyimpan data...')
            },
            onSuccess(data) {
                toast.dismiss()
                navigate(`/anggaran/rka/dokumen-rka/${params.rkaId}/rincian`)
                toast.success(data.message)
            },
            onError(error) {
                toast.dismiss()
                toast.error(error.message)
            },
        })

    function onSubmit(data: z.infer<typeof addAktivitasSchema>) {
        addAktivitasToSubKegiatan.mutate(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={addAktivitasToSubKegiatan.isPending}
                    className="flex max-w-96 flex-col gap-2"
                >
                    <FormField
                        name="aktivitasRbaId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Aktivitas RBA</FormLabel>
                                <FormControl>
                                    <AktivitasByRkaPicker
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
                        name="subKegiatanRkaId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sub Kegiatan RKA</FormLabel>
                                <FormControl>
                                    <SubKegiatanRkaPicker
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

                    <div className="mt-3">
                        <Button type="submit">
                            {addAktivitasToSubKegiatan.isPending
                                ? 'Menyimpan...'
                                : 'Simpan'}
                        </Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
