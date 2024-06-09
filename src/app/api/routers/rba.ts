import { rbaSchema } from '@/app/api/schema/rba'
import { rba } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const rbaRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db
                .select()
                .from(rba)
                .where(
                    input.search
                        ? or(like(rba.uraian, `%${input.search}%`))
                        : undefined
                )
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rba.findFirst({
            where: eq(rba.id, input),
        })
    }),

    create: userProcedure.input(rbaSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(rba).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rbaSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db.update(rba).set(rest).where(eq(rba.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(rba).where(eq(rba.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
