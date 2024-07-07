import { belanja, lpjBelanjaTable } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { desc, eq, isNull } from 'drizzle-orm'
import { z } from 'zod'
import { lpjBelanjaSchema } from '../schema/lpj_belanja'

export const lpjBelanjaRouter = createTRPCRouter({
    getAll: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.lpjBelanjaTable.findMany({
            orderBy: [
                desc(lpjBelanjaTable.tglDokumen),
                desc(lpjBelanjaTable.noDokumen),
                desc(lpjBelanjaTable.createdAt),
            ],
            with: {
                belanja: true,
            },
        })
    }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.lpjBelanjaTable.findFirst({
            where: eq(lpjBelanjaTable.id, input),
        })
    }),

    create: userProcedure
        .input(lpjBelanjaSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(lpjBelanjaTable).values(input)

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(lpjBelanjaSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db
                .update(lpjBelanjaTable)
                .set(rest)
                .where(eq(lpjBelanjaTable.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .delete(lpjBelanjaTable)
                .where(eq(lpjBelanjaTable.id, input))

            return { message: 'Data berhasil dihapus' }
        }),

    getLatest: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.lpjBelanjaTable.findFirst({
            orderBy: [
                desc(lpjBelanjaTable.tglDokumen),
                desc(lpjBelanjaTable.noDokumen),
            ],
        })
    }),

    getBelanjaByEmptyLpjBelanja: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.belanja.findMany({
            where: isNull(belanja.lpjBelanjaId),
            orderBy: [
                desc(belanja.tglDokumen),
                desc(belanja.noDokumen),
                desc(belanja.createdAt),
            ],
        })
    }),

    getBelanjaByLpjBelanjaId: userProcedure
        .input(z.number())
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.belanja.findMany({
                where: eq(belanja.lpjBelanjaId, input),
                orderBy: [
                    desc(belanja.tglDokumen),
                    desc(belanja.noDokumen),
                    desc(belanja.createdAt),
                ],
            })
        }),

    addItemToLpjBelanja: userProcedure
        .input(z.object({ id: z.number(), lpjBelanjaId: z.number() }))
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(belanja)
                .set({ lpjBelanjaId: input.lpjBelanjaId })
                .where(eq(belanja.id, input.id))

            return { message: 'Data berhasil ditambahkan' }
        }),

    deleteLpjBelanjaIdBelanja: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(belanja)
                .set({ lpjBelanjaId: null })
                .where(eq(belanja.lpjBelanjaId, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
