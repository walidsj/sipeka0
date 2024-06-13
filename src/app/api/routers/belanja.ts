import { aktivitasRba, belanja, dba } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { and, desc, eq, like, or, sum } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { belanjaSchema } from '../schema/belanja'
import { rekeningLevel6 } from '@/data/rekening'

export const belanjaRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const belanjaList = await ctx.db.query.belanja.findMany({
                with: {
                    rab: true,
                },
                where: input.search
                    ? or(
                          like(belanja.uraian, `%${input.search}%`),
                          like(belanja.noDokumen, `%${input.search}%`)
                      )
                    : undefined,
                orderBy: [desc(belanja.tglDokumen), desc(belanja.noDokumen)],
            })

            return belanjaList.map((belanja) => {
                const kodeRekening = rekeningLevel6.find(
                    (rekening) => rekening.kode === belanja.rab?.kodeRekening
                )

                return {
                    ...belanja,
                    rekening: kodeRekening,
                }
            })
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.belanja.findFirst({
            where: eq(belanja.id, input),
        })
    }),

    create: userProcedure
        .input(belanjaSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(belanja).values({
                ...input,
                jumlah: String(input.jumlah),
            })

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(belanjaSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db
                .update(belanja)
                .set({
                    ...rest,
                    jumlah: String(rest.jumlah),
                })
                .where(eq(belanja.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(belanja).where(eq(belanja.id, input))

            return { message: 'Data berhasil dihapus' }
        }),

    getRealisasiAll: userProcedure.query(async ({ ctx }) => {
        const realisasi = await ctx.db
            .select({ sum: sum(belanja.jumlah) })
            .from(belanja)

        return realisasi[0].sum
    }),

    getTarget: userProcedure.query(async ({ ctx }) => {
        const currentDba = await ctx.db.query.dba.findFirst({
            orderBy: desc(dba.tglDokumen),
            with: { rba: true },
        })

        if (!currentDba) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Belum ada penetapan DBA',
            })
        }

        const aktivitasBelanjabelanja =
            await ctx.db.query.aktivitasRba.findMany({
                where: and(
                    eq(aktivitasRba.rbaId, Number(currentDba.rbaId)),
                    eq(aktivitasRba.jenis, 'BELANJA')
                ),
                with: { rincianRbaBelanja: true },
            })

        return aktivitasBelanjabelanja.reduce((acc, item) => {
            return (
                acc +
                item.rincianRbaBelanja.reduce((acc, item) => {
                    return acc + Number(item.harga) * Number(item.volume)
                }, 0)
            )
        }, 0)
    }),

    getLatest: userProcedure.query(async ({ ctx }) => {
        const lastData = await ctx.db.query.belanja.findFirst({
            orderBy: desc(belanja.tglDokumen),
        })

        return lastData
    }),
})
