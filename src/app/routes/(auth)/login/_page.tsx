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

const schema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
})

export default function Login() {
    const navigate = useNavigate()
    const auth = useAuth()

    const login = api.user.login.useMutation({
        onSuccess(data) {
            auth.login(data.token)
            toast.success(data.message)
            navigate('/home')
        },
        onError(error) {
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
        <Card className="max-w-96 w-full shadow-none border-0">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Mohon masukkan informasi akun Anda untuk mulai menggunakan
                    SIPEKA
                </CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <fieldset>
                        <CardContent className="flex flex-col gap-3">
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
                                        <FormControl>
                                            <Input
                                                placeholder="Password"
                                                type="password"
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
                                Masuk ke Sistem
                            </Button>
                            <Button asChild variant="link">
                                <Link to="/register">Register</Link>
                            </Button>
                        </CardFooter>
                    </fieldset>
                </form>
            </Form>
            <p className="text-xs text-center text-gray-400 mt-5">
                &copy; {new Date().getFullYear()} SIPEKA. RSJD Atma Husada
                Mahakam.
            </p>
        </Card>
    )
}
