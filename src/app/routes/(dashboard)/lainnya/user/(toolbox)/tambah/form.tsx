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
import {
    SelectItem,
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from '@/web/components/ui/select'
import { userSchema } from '../../schema'
import PegawaiPicker from '../../../database/pegawai-picker'

const defaultValues = {
    nama: '',
    username: '',
    instansi: '',
    role: undefined,
    userId: undefined,
    password: '',
}

const createUserSchema = userSchema.merge(
    z.object({
        password: z.string().min(5),
    })
)

export default function CreateForm() {
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof createUserSchema>>({
        resolver: zodResolver(createUserSchema),
        mode: 'onTouched',
        defaultValues,
    })

    const create = api.user.create.useMutation({
        onMutate() {
            toast.loading('Menyimpan user...')
        },
        onSuccess(data) {
            toast.dismiss()
            navigate('/lainnya/user')
            toast.success(data.message)
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    function onSubmit(data: z.infer<typeof createUserSchema>) {
        create.mutate(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset disabled={create.isPending} className="max-w-80">
                    <div className="flex flex-col gap-2">
                        <FormField
                            name="nama"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama User</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="instansi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instansi</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="USER">
                                                    USER
                                                </SelectItem>
                                                <SelectItem value="ADMIN">
                                                    ADMIN
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
                            name="pegawaiId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pegawai</FormLabel>
                                    <FormControl>
                                        <PegawaiPicker
                                            onValueChange={(val) =>
                                                field.onChange(val ?? null)
                                            }
                                            value={field.value ?? undefined}
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
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
