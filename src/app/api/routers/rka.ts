import { rkaSchema } from '@/app/api/schema/rka'
import { rka } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const rkaRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db
                .select()
                .from(rka)
                .where(
                    input.search
                        ? or(like(rka.uraian, `%${input.search}%`))
                        : undefined
                )
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rka.findFirst({
            where: eq(rka.id, input),
        })
    }),

    create: userProcedure.input(rkaSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(rka).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rkaSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db.update(rka).set(rest).where(eq(rka.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(rka).where(eq(rka.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
