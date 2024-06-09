import { rapSchema } from '@/app/api/schema/rap'
import { rekeningLevel6 } from '@/data/rekening'
import { rap } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const rapRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const rapList = await ctx.db.query.rap.findMany({
                where: input.search
                    ? or(like(rap.uraian, `%${input.search}%`))
                    : undefined,
            })

            return rapList.map((rap) => {
                return {
                    ...rap,
                    uraianRekening: rekeningLevel6.find(
                        (rekening) => rekening.kode === rap.kodeRekening
                    )?.uraian,
                }
            })
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rap.findFirst({
            where: eq(rap.id, input),
        })
    }),

    create: userProcedure.input(rapSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(rap).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rapSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db.update(rap).set(rest).where(eq(rap.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(rap).where(eq(rap.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
