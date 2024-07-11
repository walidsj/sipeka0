import { pengelolaBludSchema } from '../schema/pengelola-blud'
import { pengelolaBlud } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const pengelolaBludRouter = createTRPCRouter({
    getAll: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.pengelolaBlud.findMany({
            with: { pegawai: true },
        })
    }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.pengelolaBlud.findFirst({
            where: eq(pengelolaBlud.id, input),
        })
    }),

    create: userProcedure
        .input(pengelolaBludSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(pengelolaBlud).values(input)

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(pengelolaBludSchema))
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(pengelolaBlud)
                .set(input)
                .where(eq(pengelolaBlud.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .delete(pengelolaBlud)
                .where(eq(pengelolaBlud.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
