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
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'

const schema = z
    .object({
        password: z.string().min(1),
        newPassword: z.string().min(5),
        confirmNewPassword: z.string().min(5),
    })
    .superRefine(({ confirmNewPassword, newPassword }, ctx) => {
        if (confirmNewPassword !== newPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Konfirmasi password baru tidak sama',
                path: ['confirmNewPassword'],
            })
        }
    })

export default function GantiPassword() {
    return (
        <div className="max-w-96">
            <EditForm />
        </div>
    )
}

function EditForm() {
    const utils = api.useUtils()
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = React.useState(false)
    const [showNewPassword, setShowNewPassword] = React.useState(false)
    const [showConfirmNewPassword, setShowConfirmNewPassword] =
        React.useState(false)

    const editPassword = api.user.updatePassword.useMutation({
        onMutate() {
            toast.loading('Menyimpan perubahan...')
        },
        onSuccess(data) {
            toast.dismiss()
            utils.user.getProfile.invalidate()
            navigate('/profil')
            toast.success(data.message)
        },
        onError(err) {
            toast.dismiss()
            toast.error(err.message)
        },
    })

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        mode: 'onTouched',
        defaultValues: {
            password: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    })

    function onSubmit(input: z.infer<typeof schema>) {
        editPassword.mutate(input)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <fieldset
                    disabled={editPassword.isPending}
                    className="flex flex-col gap-4"
                >
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password Saat Ini</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            placeholder="Password Saat Ini"
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
                                            setShowPassword((prev) => !prev)
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
                        name="newPassword"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password Baru</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            placeholder="Password baru"
                                            type={
                                                showNewPassword
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
                                            setShowNewPassword((prev) => !prev)
                                        }
                                    >
                                        {showNewPassword ? (
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
                        name="confirmNewPassword"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ulangi Password Baru</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            placeholder="Ulangi Password Baru"
                                            type={
                                                showConfirmNewPassword
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
                                            setShowConfirmNewPassword(
                                                (prev) => !prev
                                            )
                                        }
                                    >
                                        {showConfirmNewPassword ? (
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

                    <div>
                        <Button type="submit">
                            {editPassword.isPending ? 'Menyimpan...' : 'Simpan'}
                        </Button>
                    </div>
                </fieldset>
            </form>
        </Form>
    )
}
