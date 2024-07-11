import { subKegiatanRkaSchema } from '../schema/sub-kegiatan-rka'
import { subKegiatanRka } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const subKegiatanRkaRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().nullish(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db
                .select()
                .from(subKegiatanRka)
                .where(
                    input.search
                        ? or(
                              like(subKegiatanRka.nama, `%${input.search}%`),
                              like(subKegiatanRka.kode, `%${input.search}%`)
                          )
                        : undefined
                )
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.subKegiatanRka.findFirst({
            where: eq(subKegiatanRka.id, input),
        })
    }),

    create: userProcedure
        .input(subKegiatanRkaSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(subKegiatanRka).values(input)

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(subKegiatanRkaSchema))
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(subKegiatanRka)
                .set(input)
                .where(eq(subKegiatanRka.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .delete(subKegiatanRka)
                .where(eq(subKegiatanRka.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
