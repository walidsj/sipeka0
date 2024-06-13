import { dbaSchema } from '@/app/api/schema/dba'
import { rekeningLevel6 } from '@/data/rekening'
import {
    aktivitasRba,
    belanja,
    dba,
    rab,
    rba,
    rincianRbaBelanja,
} from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import { asc, count, desc, eq, isNotNull, like, or, sql } from 'drizzle-orm'
import { z } from 'zod'

export const dbaRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.dba.findMany({
                where: input.search
                    ? or(like(dba.uraian, `%${input.search}%`))
                    : undefined,
                with: { rba: true },
                orderBy: asc(dba.tglDokumen),
            })
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.dba.findFirst({
            where: eq(dba.id, input),
            with: { rba: true },
        })
    }),

    create: userProcedure.input(dbaSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(dba).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(dbaSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db.update(dba).set(rest).where(eq(dba.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(dba).where(eq(dba.id, input))

            return { message: 'Data berhasil dihapus' }
        }),

    getLatest: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.dba.findFirst({
            orderBy: desc(dba.tglDokumen),
        })
    }),

    count: userProcedure.query(async ({ ctx }) => {
        return (
            await ctx.db
                .select({ count: count(dba.id) })
                .from(dba)
                .where(isNotNull(dba.tglDokumen))
        )[0]
    }),

    getRbaBelanjaMonitoring: userProcedure.query(async ({ ctx }) => {
        const latestDba = await ctx.db.query.dba.findFirst({
            orderBy: desc(dba.tglDokumen),
        })

        if (!latestDba) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'DBA belum tersedia',
            })
        }

        const rbaByDba = await ctx.db.query.rba.findFirst({
            where: eq(rba.id, latestDba.rbaId!),
            with: {
                aktivitas: {
                    where: eq(aktivitasRba.jenis, 'BELANJA'),
                    with: {
                        rincianRbaBelanja: {
                            with: {
                                rab: true,
                            },
                        },
                    },
                },
            },
        })

        return rbaByDba
    }),

    getRealisasiBelanjaMonitoring: userProcedure.query(async ({ ctx }) => {
        const rekapBelanja = ctx.db
            .select({
                rabId: belanja.rabId,
                jumlah: sql`SUM(${belanja.jumlah})`.as('jumlah'),
            })
            .from(belanja)
            .groupBy(belanja.rabId)
            .as('belanja')

        const belanjaList = await ctx.db
            .select({
                id: rab.id,
                uraian: rab.uraian,
                kodeRekening: rab.kodeRekening,
                jumlah: rekapBelanja.jumlah,
            })
            .from(rab)
            .leftJoin(rekapBelanja, eq(rab.id, rekapBelanja.rabId))

        const dataBelanja = belanjaList.map((belanja) => {
            return {
                ...belanja,
                rekening: rekeningLevel6.find(
                    (rekening) => rekening.kode === belanja.kodeRekening
                ),
            }
        })

        return dataBelanja
    }),

    getRincianBelanjaByRincianRbaBelanjaId: userProcedure
        .input(z.number())
        .query(async ({ ctx, input }) => {
            const rincianRbaBelanjaSelected =
                await ctx.db.query.rincianRbaBelanja.findFirst({
                    where: eq(rincianRbaBelanja.id, input),
                    with: {
                        rab: true,
                    },
                })

            if (!rincianRbaBelanjaSelected) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Data tidak ditemukan',
                })
            }

            const belanjaList = await ctx.db.query.belanja.findMany({
                where: eq(
                    belanja.rabId,
                    Number(rincianRbaBelanjaSelected.rab?.id ?? 0)
                ),
                orderBy: [asc(belanja.tglDokumen), asc(belanja.noDokumen)],
            })

            return belanjaList
        }),
})
