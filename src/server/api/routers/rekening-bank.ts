import { rekeningBankSchema } from '../schema/rekening-bank'
import { rekeningBankTable } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

export const rekeningBankRouter = createTRPCRouter({
    getAll: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.rekeningBankTable.findMany({
            with: { bank: true },
        })
    }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rekeningBankTable.findFirst({
            where: eq(rekeningBankTable.id, input),
        })
    }),

    create: userProcedure
        .input(rekeningBankSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(rekeningBankTable).values(input)

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rekeningBankSchema))
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(rekeningBankTable)
                .set(input)
                .where(eq(rekeningBankTable.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .delete(rekeningBankTable)
                .where(eq(rekeningBankTable.id, input))

            return { message: 'Data berhasil dihapus' }
        }),

    getLatest: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.rekeningBankTable.findFirst({
            orderBy: [desc(rekeningBankTable.createdAt)],
        })
    }),
})
