import { rabSchema } from '@/app/api/schema/rab'
import { rekeningLevel6 } from '@/data/rekening'
import { rab } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const rabRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const rabList = await ctx.db
                .select()
                .from(rab)
                .where(
                    input.search
                        ? or(like(rab.uraian, `%${input.search}%`))
                        : undefined
                )

            return rabList.map((rab) => {
                return {
                    ...rab,
                    uraianRekening: rekeningLevel6.find(
                        (rekening) => rekening.kode === rab.kodeRekening
                    )?.uraian,
                }
            })
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rab.findFirst({
            where: eq(rab.id, input),
        })
    }),

    create: userProcedure.input(rabSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(rab).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rabSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db.update(rab).set(rest).where(eq(rab.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(rab).where(eq(rab.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
