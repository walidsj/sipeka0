import { Button } from '@/web/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/web/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/web/components/ui/form'
import { Input } from '@/web/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { api } from '@/web/trpc/react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/web/components/ui/select'

const schema = z.object({
    nama: z.string().min(1),
    instansi: z.string().min(1),
    username: z.string().min(1),
    password: z.string().min(1),
    token: z.string().length(8),
})

export default function Login() {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = React.useState(false)

    const register = api.user.register.useMutation({
        onMutate() {
            toast.loading('Sedang mendaftarkan...')
        },
        onSuccess(data) {
            toast.dismiss()
            toast.success(data.message)
            navigate('/login')
        },
        onError(error) {
            toast.dismiss()
            toast.error(error.message)
        },
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onTouched',
        defaultValues: {
            nama: '',
            instansi: '',
            username: '',
            password: '',
            token: '',
        },
    })

    function onSubmit(data: z.infer<typeof schema>) {
        register.mutate(data)
    }

    return (
        <div className="w-full max-w-96 flex-1 pt-10">
            <Card className="w-full border-0 shadow-none">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Silakan registrasi akun</CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <fieldset disabled={register.isPending}>
                            <CardContent className="flex flex-col gap-2">
                                <FormField
                                    name="nama"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nama Lengkap</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Nama Lengkap"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="username"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Username"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="password"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <div className="relative">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Password"
                                                        type={
                                                            showPassword
                                                                ? 'text'
                                                                : 'password'
                                                        }
                                                        className="pr-10"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    className="absolute right-0 top-0 hover:bg-transparent"
                                                    onClick={() =>
                                                        setShowPassword(
                                                            (prev) => !prev
                                                        )
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <FiEyeOff />
                                                    ) : (
                                                        <FiEye />
                                                    )}
                                                </Button>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="instansi"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Asal Instansi</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Asal Instansi" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Internal
                                                        </SelectLabel>
                                                        <SelectItem value="RSJD Atma Husada Mahakam">
                                                            RSJD Atma Husada
                                                            Mahakam
                                                        </SelectItem>
                                                    </SelectGroup>
                                                    <SelectGroup>
                                                        <SelectLabel>
                                                            Eksternal
                                                        </SelectLabel>
                                                        <SelectItem value="BPKAD Prov. Kaltim">
                                                            BPKAD Prov. Kaltim
                                                        </SelectItem>
                                                        <SelectItem value="Bapenda Prov. Kaltim">
                                                            Bapenda Prov. Kaltim
                                                        </SelectItem>
                                                        <SelectItem value="BPK RI">
                                                            BPK RI
                                                        </SelectItem>
                                                        <SelectItem value="Biro Perekonomian Setda Prov. Kaltim">
                                                            Biro Perekonomian
                                                            Setda Prov. Kaltim
                                                        </SelectItem>
                                                        <SelectItem value="Inspektorat Prov. Kaltim">
                                                            Inspektorat Prov.
                                                            Kaltim
                                                        </SelectItem>
                                                        <SelectItem value="Lainnya">
                                                            Lainnya
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="token"
                                    control={form.control}
                                    render={({ field }) => (
                                        <FormItem className="mt-3 rounded-xl border border-blue-100 bg-blue-50 p-3">
                                            <FormLabel>
                                                Masukkan TokenID
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="TokenID"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter className="flex flex-col gap-3">
                                <Button size="lg" className="w-full">
                                    {register.isPending
                                        ? 'Mendaftarkan...'
                                        : 'Daftar Akun'}
                                </Button>
                                <p>
                                    Sudah punya akun?{' '}
                                    <Link to="/login" className="text-primary">
                                        Masuk
                                    </Link>
                                </p>
                            </CardFooter>
                        </fieldset>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
