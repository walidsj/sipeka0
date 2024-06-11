import { dbaSchema } from '@/app/api/schema/dba'
import { dba } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { desc, eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const dbaRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.dba.findMany({
                where: input.search
                    ? or(like(dba.uraian, `%${input.search}%`))
                    : undefined,
                with: { rba: true },
            })
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.dba.findFirst({
            where: eq(dba.id, input),
            with: { rba: true },
        })
    }),

    create: userProcedure.input(dbaSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(dba).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(dbaSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db.update(dba).set(rest).where(eq(dba.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(dba).where(eq(dba.id, input))

            return { message: 'Data berhasil dihapus' }
        }),

    getLatest: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.dba.findFirst({
            orderBy: desc(dba.tglDokumen),
        })
    }),
})
