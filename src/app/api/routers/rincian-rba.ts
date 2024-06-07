import { rincianRbaSchema } from '@/app/schema/rincian-rba'
import { rincianRba } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import { eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const rincianRbaRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db
                .select()
                .from(rincianRba)
                .where(
                    input.search
                        ? or(like(rincianRba.uraian, `%${input.search}%`))
                        : undefined
                )
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rincianRba.findFirst({
            where: eq(rincianRba.id, input),
        })
    }),

    getByAktivitasRbaId: userProcedure
        .input(z.number())
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.rincianRba.findMany({
                where: eq(rincianRba.aktivitasRbaId, input),
            })
        }),

    create: userProcedure
        .input(rincianRbaSchema)
        .mutation(async ({ ctx, input }) => {
            if (
                (await ctx.db.query.rba.findFirst({
                    where: eq(rincianRba.id, input.aktivitasRbaId),
                })) === null
            ) {
                throw new TRPCError({
                    message: 'Aktivitas RBA Induk tidak ditemukan',
                    code: 'NOT_FOUND',
                })
            }

            await ctx.db.insert(rincianRba).values(input)

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rincianRbaSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db
                .update(rincianRba)
                .set(rest)
                .where(eq(rincianRba.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(rincianRba).where(eq(rincianRba.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
