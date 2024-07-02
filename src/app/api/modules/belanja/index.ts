import { aktivitasRba, belanja, dba, potonganBelanja } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { and, count, desc, eq, gte, like, lte, or, sum } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { belanjaSchema, potonganBelanjaSchema } from './schema'
import { rekeningLevel6 } from '@/data/rekening'

export const belanjaRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
                page: z.number().optional(),
                pageSize: z.number().optional(),
                startDate: z.date().optional(),
                endDate: z.date().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const page = input.page ?? 1
            const pageSize = input.pageSize ?? 10
            const search = input.search ?? ''
            const startDate = input.startDate
            const endDate = input.endDate

            const filterDate = and(
                startDate ? gte(belanja.tglDokumen, startDate) : undefined,
                endDate ? lte(belanja.tglDokumen, endDate) : undefined
            )

            const belanjaList = await ctx.db.query.belanja.findMany({
                with: {
                    rab: true,
                    potonganBelanja: true,
                    rekanan: {
                        with: {
                            bank: true,
                        },
                    },
                    pegawai: {
                        with: {
                            bank: true,
                        },
                    },
                },
                where: search
                    ? and(
                          or(
                              like(belanja.uraian, `%${search}%`),
                              like(belanja.noDokumen, `%${search}%`)
                          ),
                          filterDate
                      )
                    : filterDate,
                orderBy: [desc(belanja.tglDokumen), desc(belanja.noDokumen)],
                limit: pageSize ?? 10,
                offset: page ? (page - 1) * pageSize : 0,
            })

            const data = belanjaList.map((belanja) => ({
                ...belanja,
                rekening: rekeningLevel6.find(
                    (rekening) => rekening.kode === belanja.rab?.kodeRekening
                ),
            }))

            const total = await ctx.db
                .select({
                    sum: sum(belanja.jumlah),
                    count: count(belanja.jumlah),
                })
                .from(belanja)

            const filtered = await ctx.db
                .select({ count: count(belanja.jumlah) })
                .from(belanja)
                .where(
                    search
                        ? and(
                              or(
                                  like(belanja.uraian, `%${search}%`),
                                  like(belanja.noDokumen, `%${search}%`)
                              ),
                              filterDate
                          )
                        : filterDate
                )

            const totalSum = total[0].sum
            const dataFiltered = filtered[0].count
            const dataTotal = total[0].count
            const firstRow = (page ? (page - 1) * pageSize : 0) + 1
            const lastRow = (page ? (page - 1) * pageSize : 0) + data.length
            const pageCount = Math.ceil(dataFiltered / pageSize)

            return {
                data,
                totalSum,
                meta: {
                    pagination: {
                        dataTotal,
                        dataFiltered,
                        page,
                        pageCount,
                        pageSize,
                        firstRow,
                        lastRow,
                    },
                },
            }
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        return await ctx.db.query.belanja.findFirst({
            where: eq(belanja.id, input),
            with: {
                potonganBelanja: true,
                rab: true,
                pegawai: {
                    with: {
                        bank: true,
                    },
                },
                rekanan: {
                    with: {
                        bank: true,
                    },
                },
            },
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
            orderBy: [desc(belanja.tglDokumen), desc(belanja.createdAt)],
        })

        return lastData
    }),

    createPotonganById: userProcedure
        .input(potonganBelanjaSchema)
        .mutation(async ({ ctx, input }) => {
            const belanjaData = await ctx.db.query.belanja.findFirst({
                where: eq(belanja.id, input.belanjaId),
            })

            if (!belanjaData) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Data belanja tidak ditemukan',
                })
            }

            await ctx.db.insert(potonganBelanja).values({
                belanjaId: input.belanjaId,
                jenis: input.jenis,
                jumlah: String(input.jumlah),
                billing: input.billing,
                ntpn: input.ntpn,
            })

            return { message: 'Data berhasil ditambahkan' }
        }),

    getPotonganByBelanjaId: userProcedure
        .input(z.number())
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.potonganBelanja.findMany({
                where: eq(potonganBelanja.belanjaId, input),
            })
        }),

    getPotonganById: userProcedure
        .input(z.number())
        .query(async ({ ctx, input }) => {
            return await ctx.db.query.potonganBelanja.findFirst({
                where: eq(potonganBelanja.id, input),
            })
        }),

    updatePotonganById: userProcedure
        .input(z.object({ id: z.number() }).merge(potonganBelanjaSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db
                .update(potonganBelanja)
                .set({
                    ...rest,
                    jumlah: String(rest.jumlah),
                })
                .where(eq(potonganBelanja.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deletePotonganById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .delete(potonganBelanja)
                .where(eq(potonganBelanja.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
