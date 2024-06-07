import { kegiatanRkaSchema } from '@/app/schema/kegiatan-rka'
import { kegiatanRka } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const kegiatanRkaRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().nullish(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db
                .select()
                .from(kegiatanRka)
                .where(
                    input.search
                        ? or(
                              like(kegiatanRka.nama, `%${input.search}%`),
                              like(kegiatanRka.kode, `%${input.search}%`)
                          )
                        : undefined
                )
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
