import { sppSchema } from '../schema/spp'
import { sppTable } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { desc, eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const sppRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.sppTable.findMany({
                orderBy: [desc(sppTable.tglDokumen), desc(sppTable.noDokumen)],
                with: {
                    lpjBelanja: true,
                },
                where: input.search
                    ? or(like(sppTable.noDokumen, `%${input.search}%`))
                    : undefined,
            })
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.sppTable.findFirst({
            where: eq(sppTable.id, input),
            with: {
                lpjBelanja: {
                    with: {
                        belanja: {
                            with: {
                                rab: true,
                            },
                        },
                    },
                },
            },
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

    getLatest: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.sppTable.findFirst({
            orderBy: [desc(sppTable.tglDokumen), desc(sppTable.noDokumen)],
        })
    }),
})
