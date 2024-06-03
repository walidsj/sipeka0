import { rku } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const rkuSchema = z.object({
    noDokumen: z.string().min(1),
    uraian: z.string().min(1),
    unitKerjaId: z.number().nullish(),
    tglDokumen: z.date(),
})

export const rkuRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db
                .select()
                .from(rku)
                .where(
                    input.search
                        ? or(like(rku.uraian, `%${input.search}%`))
                        : undefined
                )
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rku.findFirst({
            where: eq(rku.id, input),
        })
    }),

    create: userProcedure.input(rkuSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(rku).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rkuSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db.update(rku).set(rest).where(eq(rku.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(rku).where(eq(rku.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
