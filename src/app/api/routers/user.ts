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
                username: z.string().min(1),
                password: z.string().min(5),
            })
        )
        .mutation(async ({ ctx, input }) => {
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
                username: input.username,
                password: bcryptjs.hashSync(input.password, 10),
                role: 'USER',
            })

            return { message: 'User berhasil didaftarkan' }
        }),

    getProfile: userProcedure.query(async ({ ctx }) => {
        return ctx.session
    }),
})
