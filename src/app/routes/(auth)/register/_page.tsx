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

const schema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
})

export default function Login() {
    const navigate = useNavigate()

    const register = api.user.register.useMutation({
        onSuccess(data) {
            toast.success(data.message)
            navigate('/login')
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
        register.mutate(data)
    }

    return (
        <Card className="max-w-96">
            <CardHeader>
                <CardTitle>Register</CardTitle>
                <CardDescription>Silakan registrasi akun</CardDescription>
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
                            <Button className="w-full">Daftar Akun</Button>
                            <Link to="/login">
                                <Button variant="link">Login</Button>
                            </Link>
                        </CardFooter>
                    </fieldset>
                </form>
            </Form>
        </Card>
    )
}
