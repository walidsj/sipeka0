import { Button } from '@/components/ui/button'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { api } from '@/trpc/react'
import React from 'react'

type PreLoginSipdResponse = {
    id_pegawai: number
    id_user: number
    id_daerah: number
    id_skpd: number
    kode_skpd: string
    nama_skpd: string
    id_role: number
    nama_role: string
}

export default function Page() {
    const [input, setInput] = React.useState({
        username: '197804061997032003',
        password: 'kaltimprov',
        captcha_solution: '',
    })

    const [captcha, setCaptcha] = React.useState<{
        audio: string
        base64: string
        id: string
    }>()

    const [userList, setUserList] = React.useState<PreLoginSipdResponse[]>([])

    const [token, setToken] = React.useState<{
        token: string
        refresh_token: string
    }>()

    const getCaptchaMutation = api.tool.getCaptcha.useMutation({
        onSuccess: (data) => {
            setCaptcha(data)
        },
        onError: (error) => {
            alert(error.message)
        },
    })

    const preloginMutation = api.tool.preLoginSipd.useMutation({
        onSuccess: (data) => {
            if (data) {
                setUserList(data)
                getCaptchaMutation.mutate()
            }
        },
        onError: (error) => {
            alert(error.message)
        },
    })

    const loginMutation = api.tool.loginSipd.useMutation({
        onSuccess: (data) => {
            setToken(data)
        },
        onError: (error) => {
            alert(error.message)
        },
    })

    return (
        <div className="grid grid-cols-3 gap-2">
            <Card>
                <CardHeader>
                    <form
                        className="flex max-w-96 flex-col gap-2"
                        onSubmit={(e) => {
                            e.preventDefault()
                            preloginMutation.mutate(input)
                        }}
                    >
                        <h1 className="font-bold">SIPD Login</h1>
                        <Input
                            placeholder="Username"
                            value={input.username}
                            onChange={(e) =>
                                setInput((prev) => ({
                                    ...prev,
                                    username: e.target.value,
                                }))
                            }
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={input.password}
                            onChange={(e) =>
                                setInput((prev) => ({
                                    ...prev,
                                    password: e.target.value,
                                }))
                            }
                        />
                        <Button
                            type="submit"
                            disabled={preloginMutation.isPending}
                        >
                            {preloginMutation.isPending
                                ? 'Loading...'
                                : 'Login'}
                        </Button>
                    </form>
                </CardHeader>
            </Card>
            <div>
                {userList.map((user) => (
                    <Card key={user.id_user}>
                        <CardHeader className="flex flex-row justify-between">
                            <div>
                                <CardDescription>
                                    {user.kode_skpd}
                                </CardDescription>
                                <CardTitle>{user.nama_role}</CardTitle>
                                <CardDescription>
                                    {user.nama_skpd}
                                </CardDescription>
                            </div>
                            {captcha && (
                                <div className="flex flex-col">
                                    <img
                                        src={`data:image/png;base64,${captcha.base64}`}
                                        alt="captcha"
                                    />
                                    <Input
                                        placeholder="Captcha"
                                        value={input.captcha_solution}
                                        onChange={(e) =>
                                            setInput((prev) => ({
                                                ...prev,
                                                captcha_solution:
                                                    e.target.value,
                                            }))
                                        }
                                    />
                                    <Button
                                        disabled={loginMutation.isPending}
                                        onClick={() => {
                                            loginMutation.mutate({
                                                id_daerah: user.id_daerah,
                                                id_pegawai: user.id_pegawai,
                                                id_role: user.id_role,
                                                id_skpd: user.id_skpd,
                                                kode_skpd: user.kode_skpd,
                                                nama_role: user.nama_role,
                                                nama_skpd: user.nama_skpd,
                                                id_user: user.id_user,
                                                password: input.password,
                                                username: input.username,
                                                pegawai: userList,
                                                selected_pegawai: user,
                                                captcha_id: captcha.id,
                                                captcha_solution:
                                                    input.captcha_solution,
                                            })
                                        }}
                                    >
                                        {loginMutation.isPending
                                            ? 'Loading...'
                                            : 'Pilih'}
                                    </Button>
                                </div>
                            )}
                        </CardHeader>
                    </Card>
                ))}
            </div>
            {token && (
                <div className="bg-green-200 p-3">
                    Token: {token.token}
                    <br />
                    Refresh Token: {token.refresh_token}
                </div>
            )}
        </div>
    )
}
