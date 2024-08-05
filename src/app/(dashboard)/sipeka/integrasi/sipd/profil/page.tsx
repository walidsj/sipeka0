import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { api } from '@/trpc/react'
import React from 'react'
import { jwtDecode } from 'jwt-decode'
import { Textarea } from '@/components/ui/textarea'
import { useCookies } from 'react-cookie'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { formatTanggal } from '@/lib/utils'

export default function Page() {
    const [cookie, setCookie] = useCookies(['sipd_token', 'sipd_refresh_token'])

    const [token] = React.useState<{
        token: string
        refresh_token: string
    }>({
        token: cookie.sipd_token || '',
        refresh_token: cookie.sipd_refresh_token || '',
    })

    const profileSipd = api.tool.getSipdProfile.useQuery(undefined, {
        enabled: !!token.token && !!token.refresh_token,
    })

    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardHeader>
                    {profileSipd.data && (
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableHead>Nama User</TableHead>
                                    <TableCell>
                                        {profileSipd.data.nama_user}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>NIP User</TableHead>
                                    <TableCell>
                                        {profileSipd.data.nip_user}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>NPWP User</TableHead>
                                    <TableCell>
                                        {profileSipd.data.npwp_user}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Alamat</TableHead>
                                    <TableCell>
                                        {profileSipd.data.alamat}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>Tanggal Lahir</TableHead>
                                    <TableCell>
                                        {formatTanggal(
                                            profileSipd.data.lahir_user
                                        )}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    )}
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={() => {
                            setCookie('sipd_token', '', { path: '/' })
                            setCookie('sipd_refresh_token', '', { path: '/' })
                        }}
                    >
                        Logout
                    </Button>
                </CardContent>
            </Card>
            {token && (
                <div className="text-wrap rounded-2xl bg-green-200 p-3 text-xs">
                    {token.token && (
                        <div>
                            <strong>
                                Token: Valid sampai{' '}
                                {Intl.DateTimeFormat('id', {
                                    dateStyle: 'full',
                                    timeStyle: 'long',
                                }).format(
                                    new Date(
                                        Number(jwtDecode(token.token).exp) *
                                            1000
                                    )
                                )}
                            </strong>
                            <Textarea readOnly value={token.token} />
                            <strong>Data Token</strong>
                            <Textarea
                                readOnly
                                value={JSON.stringify(jwtDecode(token.token))}
                            />
                        </div>
                    )}
                    {token.refresh_token && (
                        <div>
                            <strong>
                                Refresh Token: Valid sampai{' '}
                                {Intl.DateTimeFormat('id', {
                                    dateStyle: 'full',
                                    timeStyle: 'long',
                                }).format(
                                    new Date(
                                        Number(
                                            jwtDecode(token.refresh_token).exp
                                        ) * 1000
                                    )
                                )}
                            </strong>
                            <Textarea readOnly value={token.refresh_token} />
                            <strong>Data Refresh Token</strong>
                            <Textarea
                                readOnly
                                value={JSON.stringify(
                                    jwtDecode(token.refresh_token)
                                )}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
