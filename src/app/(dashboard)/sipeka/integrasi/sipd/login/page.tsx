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
import { jwtDecode } from 'jwt-decode'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

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
    const utils = api.useUtils()
    const navigate = useNavigate()

    const [cookie, setCookie] = useCookies(['sipd_token', 'sipd_refresh_token'])

    const [input, setInput] = React.useState({
        tahun: 2024,
        username: '',
        password: '',
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
    }>({
        token: cookie.sipd_token || '',
        refresh_token: cookie.sipd_refresh_token || '',
    })

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
            utils.tool.getSipdProfile.invalidate()
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
            utils.tool.getSipdProfile.invalidate()
            if (data) {
                setToken(data)
                setCookie('sipd_token', data.token, {
                    expires: new Date(Number(jwtDecode(data.token).exp) * 1000),
                    path: '/',
                })
                setCookie('sipd_refresh_token', data.refresh_token, {
                    expires: new Date(
                        Number(jwtDecode(data.refresh_token).exp) * 1000
                    ),
                    path: '/',
                })
                navigate('/sipeka/integrasi/sipd/profil')
            }
        },
        onError: (error) => {
            alert(error.message)
        },
    })

    return (
        <div className="grid grid-cols-1 gap-2 xl:grid-cols-3">
            <div>
                <Card>
                    <CardHeader>
                        <form
                            className="flex max-w-96 flex-col gap-3"
                            onSubmit={(e) => {
                                e.preventDefault()
                                preloginMutation.mutate(input)
                            }}
                        >
                            <h1 className="text-xl font-bold">SIPD Login</h1>
                            <p className="text-sm">
                                Autentikasi aplikasi untuk integrasi dengan SIPD
                                Kemendagri dengan SIPEKA Atmaku
                            </p>
                            <select value={input.tahun} className="font-bold">
                                <option value="2024">TA 2024</option>
                            </select>
                            <Input
                                placeholder="Username"
                                name="username_sipd"
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
                                name="password_sipd"
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
            </div>
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
                                <form
                                    className="flex flex-col"
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        loginMutation.mutate({
                                            tahun: input.tahun,
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
                                        type="submit"
                                        className="mt-3"
                                        disabled={loginMutation.isPending}
                                    >
                                        {loginMutation.isPending
                                            ? 'Loading...'
                                            : 'Pilih'}
                                    </Button>
                                </form>
                            )}
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}
