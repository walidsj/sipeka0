import { rekeningKoranTable } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { asc, eq } from 'drizzle-orm'
import { z } from 'zod'
import { rekeningKoranSchema } from '../schema/rekening-koran'

export const rekeningKoranRouter = createTRPCRouter({
    getAllByRekeningBankId: userProcedure
        .input(z.number())
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.rekeningKoranTable.findMany({
                where: eq(rekeningKoranTable.rekeningBankId, input),
                orderBy: [
                    asc(rekeningKoranTable.tglTransaksi),
                    asc(rekeningKoranTable.createdAt),
                ],
            })
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rekeningKoranTable.findFirst({
            where: eq(rekeningKoranTable.id, input),
        })
    }),

    create: userProcedure
        .input(rekeningKoranSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(rekeningKoranTable).values({
                ...input,
                debet: String(input.debet),
                kredit: String(input.kredit),
            })

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rekeningKoranSchema))
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(rekeningKoranTable)
                .set({
                    ...input,
                    debet: String(input.debet),
                    kredit: String(input.kredit),
                })
                .where(eq(rekeningKoranTable.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .delete(rekeningKoranTable)
                .where(eq(rekeningKoranTable.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
