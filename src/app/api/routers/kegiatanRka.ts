import { kegiatanRka } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const kegiatanRkaSchema = z.object({
    nama: z.string().min(1),
    kode: z.string().min(1),
    programRkaId: z.number(),
})

export const kegiatanRkaRouter = createTRPCRouter({
    getAll: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.select().from(kegiatanRka)
    }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.kegiatanRka.findFirst({
            where: eq(kegiatanRka.id, input),
        })
    }),

    create: userProcedure
        .input(kegiatanRkaSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(kegiatanRka).values(input)

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(kegiatanRkaSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db
                .update(kegiatanRka)
                .set(rest)
                .where(eq(kegiatanRka.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(kegiatanRka).where(eq(kegiatanRka.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
