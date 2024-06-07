import { bankSchema } from '@/app/schema/bank'
import { bank } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const bankRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db
                .select()
                .from(bank)
                .where(
                    input.search
                        ? or(
                              like(bank.nama, `%${input.search}%`),
                              like(bank.kode, `${input.search}%`)
                          )
                        : undefined
                )
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.bank.findFirst({
            where: eq(bank.id, input),
        })
    }),

    create: userProcedure.input(bankSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(bank).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(bankSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db.update(bank).set(rest).where(eq(bank.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(bank).where(eq(bank.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
