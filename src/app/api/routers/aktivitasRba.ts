import { aktivitasRba } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import { eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const aktivitasRbaSchema = z.object({
    kode: z.string().min(1),
    nama: z.string().min(1),
    rbaId: z.number(),
    jenis: z.enum(['BELANJA', 'PENDAPATAN', 'PEMBIAYAAN']),
})

export const aktivitasRbaRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db
                .select()
                .from(aktivitasRba)
                .where(
                    input.search
                        ? or(like(aktivitasRba.nama, `%${input.search}%`))
                        : undefined
                )
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.aktivitasRba.findFirst({
            where: eq(aktivitasRba.id, input),
        })
    }),

    getByRbaId: userProcedure
        .input(z.number())
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.aktivitasRba.findMany({
                where: eq(aktivitasRba.rbaId, input),
            })
        }),

    create: userProcedure
        .input(aktivitasRbaSchema)
        .mutation(async ({ ctx, input }) => {
            if (
                (await ctx.db.query.rba.findFirst({
                    where: eq(aktivitasRba.id, input.rbaId),
                })) === null
            ) {
                throw new TRPCError({
                    message: 'RBA Induk tidak ditemukan',
                    code: 'NOT_FOUND',
                })
            }

            await ctx.db.insert(aktivitasRba).values(input)

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(aktivitasRbaSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db
                .update(aktivitasRba)
                .set(rest)
                .where(eq(aktivitasRba.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(aktivitasRba).where(eq(aktivitasRba.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
