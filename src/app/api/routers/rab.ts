import { rabSchema } from '@/app/api/schema/rab'
import { rekeningLevel6 } from '@/data/rekening'
import { rab } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { count, eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const rabRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
                page: z.number().optional(),
                pageSize: z.number().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const page = input.page ?? 1
            const pageSize = input.pageSize ?? 10
            const search = input.search ?? ''

            const rabList = await ctx.db.query.rab.findMany({
                with: { unitKerja: true },
                where: search ? or(like(rab.uraian, `%${search}%`)) : undefined,
                limit: pageSize ?? 10,
                offset: page ? (page - 1) * pageSize : 0,
            })

            const data = rabList.map((rab) => ({
                ...rab,
                rekening: rekeningLevel6.find(
                    (rekening) => rekening.kode === rab.kodeRekening
                ),
            }))

            const total = await ctx.db
                .select({
                    count: count(rab.id),
                })
                .from(rab)

            const dataCount = data.length
            const dataTotal = total[0].count
            const firstRow = (page ? (page - 1) * pageSize : 0) + 1
            const lastRow = (page ? (page - 1) * pageSize : 0) + data.length
            const pageCount = Math.ceil(dataCount / pageSize)

            return {
                data,
                meta: {
                    pagination: {
                        dataTotal,
                        dataCount,
                        page,
                        pageCount,
                        pageSize,
                        firstRow,
                        lastRow,
                    },
                },
            }
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rab.findFirst({
            where: eq(rab.id, input),
        })
    }),

    create: userProcedure.input(rabSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(rab).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rabSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db.update(rab).set(rest).where(eq(rab.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(rab).where(eq(rab.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
