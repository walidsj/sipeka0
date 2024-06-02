import { bank } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const bankRouter = createTRPCRouter({
    getAll: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.bank.findMany({})
    }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.bank.findFirst({
            where: eq(bank.id, input),
        })
    }),

    create: userProcedure
        .input(
            z.object({
                nama: z.string().min(1),
                kode: z.string().length(3),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(bank).values(input)

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(
            z.object({
                id: z.number(),
                nama: z.string().min(1),
                kode: z.string().length(3),
            })
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(bank)
                .set({ nama: input.nama, kode: input.kode })
                .where(eq(bank.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(bank).where(eq(bank.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
