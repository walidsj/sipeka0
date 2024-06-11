import { rkaSchema } from '@/app/api/schema/rka'
import { aktivitasRba, rka } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { and, eq, isNotNull, like, or } from 'drizzle-orm'
import { z } from 'zod'
import { aktivitasRbaSchema } from '../schema/aktivitas-rba'
import { TRPCError } from '@trpc/server'

export const rkaRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.rka.findMany({
                where: input.search
                    ? or(like(rka.uraian, `%${input.search}%`))
                    : undefined,
                with: { rba: true },
            })
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rka.findFirst({
            where: eq(rka.id, input),
            with: { rba: true },
        })
    }),

    create: userProcedure.input(rkaSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(rka).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rkaSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db.update(rka).set(rest).where(eq(rka.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(rka).where(eq(rka.id, input))

            return { message: 'Data berhasil dihapus' }
        }),

    addAktivitasToSubKegiatan: userProcedure
        .input(
            aktivitasRbaSchema
                .pick({
                    subKegiatanRkaId: true,
                })
                .merge(z.object({ aktivitasRbaId: z.number() }))
        )
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(aktivitasRba)
                .set({ subKegiatanRkaId: input.subKegiatanRkaId })
                .where(eq(aktivitasRba.id, input.aktivitasRbaId))

            return { message: 'Data berhasil disimpan' }
        }),

    getAktivitasByRbaId: userProcedure
        .input(z.number())
        .query(async ({ ctx, input }) => {
            const rkaItem = await ctx.db.query.rka.findFirst({
                where: eq(rka.id, input),
            })

            if (!rkaItem) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'RBA tidak ada',
                })
            }

            return await ctx.db.query.aktivitasRba.findMany({
                where: and(
                    eq(aktivitasRba.rbaId, Number(rkaItem.rbaId)),
                    isNotNull(aktivitasRba.subKegiatanRkaId)
                ),
                with: {
                    subKegiatanRka: {
                        columns: {
                            kode: true,
                            nama: true,
                        },
                        with: {
                            aktivitasRba: true,
                        },
                    },
                },
            })
        }),

    deleteAktivitasByRbaId: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(aktivitasRba)
                .set({
                    subKegiatanRkaId: null,
                })
                .where(eq(aktivitasRba.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
