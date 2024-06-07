import { rabSchema } from '@/app/schema/rab'
import { rab } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const rabRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db
                .select()
                .from(rab)
                .where(
                    input.search
                        ? or(like(rab.uraian, `%${input.search}%`))
                        : undefined
                )
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rab.findFirst({
            where: eq(rab.id, input),
        })
    }),

    create: userProcedure.input(rabSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(rab).values({
            kodeRekening: input.kodeRekening,
            uraian: input.uraian,
            spesifikasi: input.spesifikasi,
            volume: String(input.volume),
            satuan: input.satuan,
            harga: String(input.harga),
        })

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rabSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db
                .update(rab)
                .set({
                    kodeRekening: rest.kodeRekening,
                    uraian: rest.uraian,
                    spesifikasi: rest.spesifikasi,
                    volume: String(rest.volume),
                    satuan: rest.satuan,
                    harga: String(rest.harga),
                })
                .where(eq(rab.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(rab).where(eq(rab.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
