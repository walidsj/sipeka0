import { rincianRbaPendapatanSchema } from '@/app/api/schema/rincian-rba-pendapatan'
import { rekeningLevel6 } from '@/data/rekening'
import { rincianRbaPendapatan } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const rincianRbaPendapatanRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx }) => {
            const rincianRbaPendapatanList =
                await ctx.db.query.rincianRbaPendapatan.findMany({
                    with: {
                        rap: true,
                    },
                })

            return rincianRbaPendapatanList.map((rincianRbaPendapatan) => {
                const kodeRekening = rekeningLevel6.find(
                    (rekening) =>
                        rekening.kode === rincianRbaPendapatan.rap?.kodeRekening
                )

                return {
                    ...rincianRbaPendapatan,
                    kodeRekening: kodeRekening?.kode,
                    uraianRekening: kodeRekening?.uraian,
                }
            })
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.rincianRbaPendapatan.findFirst({
            where: eq(rincianRbaPendapatan.id, input),
        })
    }),

    getByAktivitasRbaId: userProcedure
        .input(z.number())
        .query(async ({ ctx, input }) => {
            const rincianRbaPendapatanList =
                await ctx.db.query.rincianRbaPendapatan.findMany({
                    where: eq(rincianRbaPendapatan.aktivitasRbaId, input),
                    with: {
                        rap: true,
                    },
                })
            return rincianRbaPendapatanList.map((rincianRbaPendapatan) => {
                const kodeRekening = rekeningLevel6.find(
                    (rekening) =>
                        rekening.kode === rincianRbaPendapatan.rap?.kodeRekening
                )

                return {
                    ...rincianRbaPendapatan,
                    rekening: kodeRekening,
                }
            })
        }),

    create: userProcedure
        .input(rincianRbaPendapatanSchema)
        .mutation(async ({ ctx, input }) => {
            if (
                (await ctx.db.query.aktivitasRba.findFirst({
                    where: eq(rincianRbaPendapatan.id, input.aktivitasRbaId),
                })) === null
            ) {
                throw new TRPCError({
                    message: 'Aktivitas RBA Induk tidak ditemukan',
                    code: 'NOT_FOUND',
                })
            }

            await ctx.db.insert(rincianRbaPendapatan).values({
                rapId: input.rapId,
                jumlah: String(input.jumlah),
                aktivitasRbaId: input.aktivitasRbaId,
            })

            return { message: 'Data berhasil ditambahkan' }
        }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(rincianRbaPendapatanSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db
                .update(rincianRbaPendapatan)
                .set({
                    rapId: rest.rapId,
                    jumlah: String(rest.jumlah),
                    aktivitasRbaId: rest.aktivitasRbaId,
                })
                .where(eq(rincianRbaPendapatan.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .delete(rincianRbaPendapatan)
                .where(eq(rincianRbaPendapatan.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
