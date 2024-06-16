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
import { Link, useNavigate } from 'react-router-dom'
import { api } from '@/web/trpc/react'
import { useAuth } from '@/web/lib/auth'
import { FiEye, FiEyeOff, FiLock, FiUser } from 'react-icons/fi'
import React from 'react'

const schema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
})

export default function Login() {
    const navigate = useNavigate()
    const auth = useAuth()

    const [showPassword, setShowPassword] = React.useState(false)

    const login = api.user.login.useMutation({
        onMutate() {
            toast.loading('Sedang memproses...')
        },
        onSuccess(data) {
            toast.dismiss()
            auth.login(data.token)
            toast.success(data.message)
            navigate('/home')
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
            username: '',
            password: '',
        },
    })

    function onSubmit(data: z.infer<typeof schema>) {
        login.mutate(data)
    }

    return (
        <Card className="mx-auto w-full max-w-xs items-center justify-center border-0 p-0 shadow-none">
            <CardHeader className="px-0">
                <CardTitle className="text-2xl">Selamat Datang!</CardTitle>
                <CardDescription>
                    Mohon masukkan informasi akun Anda untuk mulai menggunakan
                    SIPEKA
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <fieldset disabled={login.isPending}>
                        <CardContent className="flex flex-col gap-2 px-0">
                            <FormField
                                name="username"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <div className="relative">
                                            <div className="absolute left-0 top-0 flex h-full items-center pl-3">
                                                <FiUser className="text-gray-400" />
                                            </div>
                                            <FormControl>
                                                <Input
                                                    placeholder="Username"
                                                    className="h-12 pl-10"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
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
                                            <div className="absolute left-0 top-0 flex h-full items-center pl-3">
                                                <FiLock className="text-gray-400" />
                                            </div>
                                            <FormControl>
                                                <Input
                                                    placeholder="Password"
                                                    className="h-12 px-10"
                                                    type={
                                                        showPassword
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    {...field}
                                                />
                                            </FormControl>
                                            <div className="absolute right-0 top-0 flex h-full items-center">
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    className="hover:bg-transparent"
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
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3 px-0">
                            <Button size="lg" className="w-full">
                                {login.isPending
                                    ? 'Memproses...'
                                    : 'Masuk ke Sistem'}
                            </Button>
                            <p>
                                Belum punya akun?{' '}
                                <Link to="/register" className="text-primary">
                                    Daftar sekarang
                                </Link>
                            </p>
                        </CardFooter>
                    </fieldset>
                </form>
            </Form>
        </Card>
    )
}
