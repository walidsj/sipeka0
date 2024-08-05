import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { z } from 'zod'
import axios from 'axios'
import { TRPCError } from '@trpc/server'
import https from 'https'
import cookie from 'cookie'

export const toolRouter = createTRPCRouter({
    preLoginSipd: userProcedure
        .input(
            z.object({
                tahun: z.number(),
                username: z.string(),
                password: z.string(),
            })
        )
        .mutation(async ({ input }) => {
            const data = {
                tahun: input.tahun,
                username: input.username,
                password: input.password,
                remember_me: true,
            }

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

            try {
                const response = await axios.post(
                    'https://service.sipd.kemendagri.go.id/auth/auth/pre-login',
                    data,
                    {
                        httpsAgent: new https.Agent({
                            rejectUnauthorized: false,
                        }),
                    }
                )

                return response.data as PreLoginSipdResponse[]
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    throw new TRPCError({
                        code: 'UNAUTHORIZED',
                        message: JSON.stringify(error.response?.data),
                    })
                }
            }
        }),

    getCaptcha: userProcedure.mutation(async () => {
        try {
            const response = await axios.get(
                'https://service.sipd.kemendagri.go.id/auth/captcha/new'
            )

            return response.data as {
                audio: string
                base64: string
                id: string
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: JSON.stringify(error.response?.data),
                })
            }
        }
    }),

    loginSipd: userProcedure
        .input(
            z.object({
                tahun: z.number(),
                captcha_id: z.string(),
                captcha_solution: z.string(),
                id_pegawai: z.number(),
                id_user: z.number(),
                id_daerah: z.number(),
                id_skpd: z.number(),
                kode_skpd: z.string(),
                nama_skpd: z.string(),
                id_role: z.number(),
                nama_role: z.string(),
                username: z.string(),
                password: z.string(),
                pegawai: z.array(
                    z.object({
                        id_pegawai: z.number(),
                        id_user: z.number(),
                        id_daerah: z.number(),
                        id_skpd: z.number(),
                        kode_skpd: z.string(),
                        nama_skpd: z.string(),
                        id_role: z.number(),
                        nama_role: z.string(),
                    })
                ),
                selected_pegawai: z.object({
                    id_pegawai: z.number(),
                    id_user: z.number(),
                    id_daerah: z.number(),
                    id_skpd: z.number(),
                    kode_skpd: z.string(),
                    nama_skpd: z.string(),
                    id_role: z.number(),
                    nama_role: z.string(),
                }),
            })
        )
        .mutation(async ({ input }) => {
            const payload = {
                tahun: input.tahun,
                username: input.username,
                password: input.password,
                id_daerah: input.id_daerah,
                id_role: input.id_role,
                id_skpd: input.id_skpd,
                id_pegawai: input.id_pegawai,
                captcha_id: input.captcha_id,
                captcha_solution: input.captcha_solution,
                remember_me: true,
                pegawai: input.pegawai,
                selected_pegawai: input.selected_pegawai,
            }

            try {
                const response = await axios.post(
                    'https://service.sipd.kemendagri.go.id/auth/auth/login',
                    payload,
                    {
                        httpsAgent: new https.Agent({
                            rejectUnauthorized: false,
                        }),
                    }
                )

                return response.data as { token: string; refresh_token: string }
            } catch (error) {
                console.log(error)

                if (axios.isAxiosError(error)) {
                    throw new TRPCError({
                        code: 'UNAUTHORIZED',
                        message: JSON.stringify(error.response?.data),
                    })
                }
            }
        }),

    getSipdProfile: userProcedure.query(async ({ ctx }) => {
        const { sipd_token }: { sipd_token: string } = cookie.parse(
            ctx.headers.cookie
        )

        try {
            const response = await axios.get(
                'https://service.sipd.kemendagri.go.id/auth/strict/user/profile',
                {
                    headers: {
                        Authorization: `Bearer ${sipd_token}`,
                    },
                    httpsAgent: new https.Agent({
                        rejectUnauthorized: false,
                    }),
                }
            )

            return response.data as {
                id_user: number
                id_daerah: number
                nip_user: string
                nama_user: string
                id_pang_gol: number
                nik_user: string
                npwp_user: string
                alamat: string
                lahir_user: string
            }
        } catch (error) {
            console.log(error)

            if (axios.isAxiosError(error)) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: JSON.stringify(error.response?.data),
                })
            }
        }
    }),
})
