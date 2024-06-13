import { rbaSchema } from '@/app/api/schema/rba'
import { aktivitasRba, rba } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import { asc, eq, like, or } from 'drizzle-orm'
import { z } from 'zod'

export const rbaRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db
                .select()
                .from(rba)
                .where(
                    input.search
                        ? or(like(rba.uraian, `%${input.search}%`))
                        : undefined
                )
                .orderBy(asc(rba.tglDokumen))
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rba.findFirst({
            where: eq(rba.id, input),
        })
    }),

    create: userProcedure.input(rbaSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(rba).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rbaSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db.update(rba).set(rest).where(eq(rba.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(rba).where(eq(rba.id, input))

            return { message: 'Data berhasil dihapus' }
        }),

    duplicateById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            const data = await ctx.db.query.rba.findFirst({
                where: eq(rba.id, input),
            })

            if (!data) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Data tidak ditemukan',
                })
            }

            const insertedRba = await ctx.db.insert(rba).values({
                noDokumen: data.noDokumen,
                uraian: data.uraian,
                tglDokumen: data.tglDokumen,
            })

            if (!insertedRba) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Gagal menduplikasi data',
                })
            }

            const insertedRbaItem = await ctx.db.query.rba.findFirst({
                where: eq(rba.id, insertedRba[0].insertId),
            })

            if (!insertedRbaItem) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Gagal menduplikasi data',
                })
            }

            // duplicate aktivitasRba
            const aktivitasRbaExisted =
                await ctx.db.query.aktivitasRba.findMany({
                    where: eq(rba.id, input),
                    with: {
                        rincianRbaBelanja: true,
                        rincianRbaPendapatan: true,
                    },
                })

            const aktivitasRbaInserted = await ctx.db
                .insert(aktivitasRba)
                .values(
                    aktivitasRbaExisted.map((item) => ({
                        rbaId: insertedRbaItem.id,
                        kode: item.kode,
                        nama: item.nama,
                        jenis: item.jenis,
                    }))
                )

            return { message: 'Data berhasil diduplikasi' }
        }),
})
