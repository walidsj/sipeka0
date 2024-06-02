import { user } from '@/server/db/schema'
import { createTRPCRouter, publicProcedure, userProcedure } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'
import { env } from '@/env'
import { type JWTPayload, SignJWT } from 'jose'

const secret = env.JWT_SECRET_KEY
const key = new TextEncoder().encode(secret)

export const userRouter = createTRPCRouter({
    login: publicProcedure
        .input(
            z.object({
                username: z.string().min(1),
                password: z.string().min(1),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const existedUser = await ctx.db.query.user.findFirst({
                where: eq(user.username, input.username),
            })

            if (!existedUser) {
                throw new TRPCError({
                    message: 'Username tidak ditemukan',
                    code: 'UNAUTHORIZED',
                })
            }

            if (!bcryptjs.compareSync(input.password, existedUser.password!)) {
                throw new TRPCError({
                    message: 'Password salah',
                    code: 'UNAUTHORIZED',
                })
            }

            const token = await new SignJWT({
                id: existedUser.id.toString(),
                username: existedUser.username,
                role: existedUser.role,
            } as JWTPayload)
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('30d')
                .sign(key)

            return { token, message: 'Login berhasil' }
        }),

    register: publicProcedure
        .input(
            z.object({
                nama: z.string().min(1),
                username: z.string().min(1),
                password: z.string().min(5),
                instansi: z.string().min(1),
                token: z.string().length(8),
            })
        )
        .mutation(async ({ ctx, input }) => {
            if (input.token !== '12345678') {
                throw new TRPCError({
                    message: 'TokenID salah',
                    code: 'UNAUTHORIZED',
                })
            }

            const existedUser = await ctx.db.query.user.findFirst({
                where: eq(user.username, input.username),
            })

            if (existedUser) {
                throw new TRPCError({
                    message: 'Username telah didaftarkan, coba username lain',
                    code: 'UNAUTHORIZED',
                })
            }

            await ctx.db.insert(user).values({
                nama: input.nama,
                username: input.username,
                password: bcryptjs.hashSync(input.password, 10),
                instansi: input.instansi,
                role: 'USER',
            })

            return { message: 'User berhasil didaftarkan' }
        }),

    getProfile: userProcedure.query(async ({ ctx }) => {
        const existedUser = ctx.user!

        const { password, ...rest } = existedUser

        return rest
    }),

    updateProfile: userProcedure
        .input(
            z.object({ nama: z.string().min(1), instansi: z.string().min(1) })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(user)
                .set({ nama: input.nama, instansi: input.instansi })
                .where(eq(user.id, ctx.user?.id ?? 0))

            return { message: 'Profile berhasil diupdate' }
        }),

    updatePassword: userProcedure
        .input(
            z.object({
                password: z.string().min(1),
                newPassword: z.string().min(5),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const existedUser = await ctx.db.query.user.findFirst({
                where: eq(user.id, ctx.user?.id ?? 0),
            })

            if (!existedUser) {
                throw new TRPCError({
                    message: 'User tidak ditemukan',
                    code: 'UNAUTHORIZED',
                })
            }

            if (!bcryptjs.compareSync(input.password, existedUser.password!)) {
                throw new TRPCError({
                    message: 'Password lama salah',
                    code: 'UNAUTHORIZED',
                })
            }

            await ctx.db
                .update(user)
                .set({ password: bcryptjs.hashSync(input.newPassword, 10) })
                .where(eq(user.id, ctx.user?.id ?? 0))

            return { message: 'Password berhasil diupdate' }
        }),
})
