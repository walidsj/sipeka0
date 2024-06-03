import { programRka } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const programRkaSchema = z.object({
    nama: z.string().min(1),
    kode: z.string().min(1),
})

export const programRkaRouter = createTRPCRouter({
    getAll: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.select().from(programRka)
    }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.programRka.findFirst({
            where: eq(programRka.id, input),
        })
    }),

    create: userProcedure
        .input(programRkaSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(programRka).values(input)

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(programRkaSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db
                .update(programRka)
                .set(rest)
                .where(eq(programRka.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(programRka).where(eq(programRka.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
