import { rekeningLevel6 } from '@/data/rekening'
import { aktivitasRba, dba, pendapatan } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { and, desc, eq, like, sum } from 'drizzle-orm'
import { z } from 'zod'
import { pendapatanSchema } from '../schema/pendapatan'
import { TRPCError } from '@trpc/server'

export const pendapatanRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const pendapatanList = await ctx.db.query.pendapatan.findMany({
                with: {
                    rap: true,
                },
                where: input.search
                    ? like(pendapatan.keterangan, `%${input.search}%`)
                    : undefined,
                orderBy: [
                    desc(pendapatan.tglDokumen),
                    desc(pendapatan.createdAt),
                ],
            })

            return pendapatanList.map((pendapatan) => {
                const kodeRekening = rekeningLevel6.find(
                    (rekening) => rekening.kode === pendapatan.rap?.kodeRekening
                )

                return {
                    ...pendapatan,
                    rekening: kodeRekening,
                }
            })
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.pendapatan.findFirst({
            where: eq(pendapatan.id, input),
        })
    }),

    create: userProcedure
        .input(pendapatanSchema)
        .mutation(async ({ ctx, input }) => {
            await ctx.db.insert(pendapatan).values({
                ...input,
                jumlah: String(input.jumlah),
            })

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(pendapatanSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db
                .update(pendapatan)
                .set({
                    ...rest,
                    jumlah: String(rest.jumlah),
                })
                .where(eq(pendapatan.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(pendapatan).where(eq(pendapatan.id, input))

            return { message: 'Data berhasil dihapus' }
        }),

    getRealisasiAll: userProcedure.query(async ({ ctx }) => {
        const realisasi = await ctx.db
            .select({ sum: sum(pendapatan.jumlah) })
            .from(pendapatan)

        return realisasi[0].sum
    }),

    getLatest: userProcedure.query(async ({ ctx }) => {
        const lastData = await ctx.db.query.pendapatan.findFirst({
            orderBy: desc(pendapatan.tglDokumen),
        })

        return lastData
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

        const aktivitasPendapatan = await ctx.db.query.aktivitasRba.findMany({
            where: and(
                eq(aktivitasRba.rbaId, Number(currentDba.rbaId)),
                eq(aktivitasRba.jenis, 'PENDAPATAN')
            ),
            with: { rincianRbaPendapatan: true },
        })

        return aktivitasPendapatan.reduce((acc, item) => {
            return (
                acc +
                item.rincianRbaPendapatan.reduce((acc, item) => {
                    return acc + Number(item.jumlah)
                }, 0)
            )
        }, 0)
    }),
})
