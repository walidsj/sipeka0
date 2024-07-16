import { sppSchema } from '../schema/spp'
import { sppTable } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const sppRouter = createTRPCRouter({
    getAll: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.select().from(sppTable)
    }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.sppTable.findFirst({
            where: eq(sppTable.id, input),
        })
    }),

    create: userProcedure.input(sppSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(sppTable).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(sppSchema))
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(sppTable)
                .set(input)
                .where(eq(sppTable.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(sppTable).where(eq(sppTable.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
