import {
    aktivitasRba,
    belanja,
    dba,
    potonganBelanja,
    rab,
    rba,
} from '@/server/db/schema'
import { createTRPCRouter, publicProcedure, userProcedure } from '@/server/trpc'
import {
    and,
    asc,
    count,
    desc,
    eq,
    gte,
    isNotNull,
    like,
    lt,
    lte,
    or,
    sql,
    sum,
} from 'drizzle-orm'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { belanjaSchema, potonganBelanjaSchema } from './belanja.schema'
import { rekeningLevel6 } from '@/data/rekening'
import lodash from 'lodash'
import { format } from 'date-fns'

export type JurnalType = {
    id?: string | number
    tgl: Date | null
    noDokumen: string | null
    kodeRekening?: string | null
    uraian: string | null
    penerimaan: number | null
    pengeluaran: number | null
    potonganBelanja?: JurnalType[]
}

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
            await ctx.db
                .update(belanja)
                .set({
                    ...input,
                    jumlah: String(input.jumlah),
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
            await ctx.db
                .update(potonganBelanja)
                .set({
                    ...input,
                    jumlah: String(input.jumlah),
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

    getUnclassifiedBelanjaByRba: userProcedure.query(async ({ ctx }) => {
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
        })

        const unclassified = await ctx.db.query.belanja.findMany({
            with: {
                rab: {
                    with: {
                        rincianRbaBelanja: {
                            with: {
                                aktivitas: true,
                            },
                        },
                    },
                },
            },
            orderBy: [asc(belanja.tglDokumen), asc(belanja.createdAt)],
        })

        return unclassified
            .filter((item) => {
                return !item.rab?.rincianRbaBelanja.find((rincian) => {
                    return rincian.aktivitas?.rbaId === rbaByDba?.id
                })
            })
            .map((item) => ({
                ...item,
                rekening: rekeningLevel6.find(
                    (rekening) => rekening.kode === item.rab?.kodeRekening
                ),
            }))
    }),

    getBelanjaBku: userProcedure
        .input(
            z.object({
                startDate: z.date().optional(),
                endDate: z.date().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const startDate =
                input.startDate || new Date(format(new Date(), 'yyyy-MM-01'))
            const endDate = input.endDate || new Date()

            const filterDate = and(
                startDate ? gte(belanja.tglDokumen, startDate) : undefined,
                endDate ? lte(belanja.tglDokumen, endDate) : undefined
            )

            let jurnal: JurnalType[] = []

            const belanjaBeforeList = await ctx.db.query.belanja.findMany({
                where: lt(belanja.tglDokumen, startDate!),
                with: {
                    potonganBelanja: true,
                },
            })

            const lpjBelanjaBeforeList =
                await ctx.db.query.lpjBelanjaTable.findMany({
                    where: lt(belanja.tglDokumen, startDate!),
                    with: {
                        belanja: true,
                    },
                })

            const belanjaList = await ctx.db.query.belanja.findMany({
                with: {
                    rab: true,
                    potonganBelanja: true,
                },
                where: filterDate,
                orderBy: [asc(belanja.tglDokumen), asc(belanja.noDokumen)],
            })

            const lpjBelanjaList = await ctx.db.query.lpjBelanjaTable.findMany({
                with: {
                    belanja: true,
                },
                where: filterDate,
                orderBy: [asc(belanja.tglDokumen), asc(belanja.noDokumen)],
            })

            const saldoAwalPengeluaran = belanjaBeforeList.reduce(
                (acc, item) => {
                    return acc + Number(item.jumlah)
                },
                0
            )

            const saldoAwalPotongan = belanjaBeforeList.reduce((acc, item) => {
                return (
                    acc +
                    item.potonganBelanja.reduce((acc, item) => {
                        return acc + Number(item.jumlah)
                    }, 0)
                )
            }, 0)

            let saldoAwalPenerimaan = lpjBelanjaBeforeList.reduce(
                (acc, item) => {
                    return (
                        acc +
                        item.belanja.reduce((acc, item) => {
                            return acc + Number(item.jumlah)
                        }, 0)
                    )
                },
                0
            )

            if (startDate && startDate >= new Date('2024-01-15')) {
                saldoAwalPenerimaan = saldoAwalPenerimaan += 750_000_000
            }

            if (startDate && startDate < new Date('2024-01-15')) {
                jurnal.push({
                    tgl: new Date('2024-01-15'),
                    noDokumen: '900.1.3.5/001/UP /SP2D/RSJD-AHM/BLUD',
                    kodeRekening: null,
                    uraian: 'Terima Pencairan SP2D Uang Persediaan (UP) BLUD pada RSJD Atma Husada Mahakam Prov. Kaltim untuk Tahun Anggaran 2024',
                    penerimaan: 750_000_000,
                    pengeluaran: 0,
                })
            }

            lodash
                .sortBy(
                    belanjaList,
                    ['tglDokumen', 'noDokumen'],
                    ['asc', 'asc']
                )
                .map((blj) => {
                    const lpjSelected = lpjBelanjaList.find(
                        (lpj) => blj.lpjBelanjaId === lpj.id
                    )

                    if (lpjSelected && lpjSelected.jenis !== 'GU') {
                        jurnal.push({
                            tgl: lpjSelected.tglDokumen,
                            noDokumen: `900.1.3.5/${lpjSelected.noDokumen}/${lpjSelected.jenis} /SP2D/RSJD-AHM/BLUD`,
                            kodeRekening: null,
                            uraian: `Terima Pencairan SP2D Pembayaran ${lpjSelected.uraian}`,
                            penerimaan: lpjSelected.belanja.reduce(
                                (acc, item) => {
                                    return acc + Number(item.jumlah)
                                },
                                0
                            ),
                            pengeluaran: 0,
                        })
                    }

                    jurnal.push({
                        id: blj.id,
                        tgl: blj.tglDokumen,
                        noDokumen: blj.noDokumen,
                        kodeRekening: blj.rab?.kodeRekening,
                        uraian: blj.uraian,
                        penerimaan: 0,
                        pengeluaran: Number(blj.jumlah),
                        potonganBelanja: blj.potonganBelanja.map(
                            (potongan) => ({
                                tgl: null,
                                id: blj.id,
                                noDokumen: null,
                                kodeRekening: null,
                                uraian: `Pemotongan dan penyetoran ${potongan.jenis}`,
                                penerimaan: Number(potongan.jumlah),
                                pengeluaran: Number(potongan.jumlah),
                            })
                        ),
                    })
                })

            const lpjBelanjaGu = lpjBelanjaList.filter(
                (lpj) => lpj.jenis === 'GU'
            )
            lpjBelanjaGu.map((lpj) => {
                const belanja = lodash.sortBy(
                    lpj.belanja,
                    ['noDokumen', 'tglDokumen'],
                    ['asc', 'asc']
                )

                const lastBelanja = belanja[belanja.length - 1]

                const lastBelanjaIndex =
                    lodash.lastIndexOf(
                        jurnal,
                        jurnal.find((item) => item.id === lastBelanja.id)
                    ) +
                    jurnal.filter((item) => item.id === lastBelanja.id).length -
                    1

                const spliceAtas = jurnal.splice(
                    lastBelanjaIndex + 1,
                    jurnal.length
                )
                const spliceBawah = jurnal.splice(0, lastBelanjaIndex + 1)

                const jurnalGu = {
                    tgl: lpj.tglDokumen,
                    noDokumen: `900.1.3.5/${lpj.noDokumen}/${lpj.jenis} /SP2D/RSJD-AHM/BLUD`,
                    kodeRekening: null,
                    uraian: `Terima Pencairan SP2D Pembayaran ${lpj.uraian}`,
                    penerimaan: lpj.belanja.reduce((acc, item) => {
                        return acc + Number(item.jumlah)
                    }, 0),
                    pengeluaran: 0,
                }

                jurnal = [...spliceBawah, jurnalGu, ...spliceAtas]
            })

            jurnal = lodash.sortBy(jurnal, ['tgl'], ['asc'])

            return {
                data: jurnal,
                meta: {
                    totalThisPeriode: {
                        potongan: belanjaList.reduce((acc, item) => {
                            return (
                                acc +
                                item.potonganBelanja.reduce((acc, item) => {
                                    return acc + Number(item.jumlah)
                                }, 0)
                            )
                        }, 0),
                    },
                    totalLastPeriode: {
                        penerimaan: saldoAwalPenerimaan,
                        pengeluaran: saldoAwalPengeluaran,
                        potongan: saldoAwalPotongan,
                    },
                },
            }
        }),

    getAllBkPajak: userProcedure
        .input(
            z.object({
                startDate: z.date().optional(),
                endDate: z.date().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const startDate =
                input.startDate || new Date(format(new Date(), 'yyyy-MM-01'))
            const endDate = input.endDate || new Date()

            const filterDate = and(
                startDate ? gte(belanja.tglDokumen, startDate) : undefined,
                endDate ? lte(belanja.tglDokumen, endDate) : undefined
            )

            const belanjaList = await ctx.db.query.belanja.findMany({
                with: {
                    rab: true,
                    potonganBelanja: true,
                    rekanan: true,
                    pegawai: true,
                },
                where: filterDate,
                orderBy: [asc(belanja.tglDokumen), asc(belanja.noDokumen)],
            })

            return belanjaList
        }),

    getBelanjaLra: userProcedure
        .input(
            z.object({
                startDate: z.date().optional(),
                endDate: z.date().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
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

            if (!rbaByDba) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'RBA belum tersedia',
                })
            }

            /// buat array dengan format {kodeRekening: 'kode', jumlah: XXX}
            const anggaranBelanja = rbaByDba.aktivitas.map((aktivitas) => {
                return aktivitas.rincianRbaBelanja.map((rincian) => {
                    return {
                        kodeRekening: rincian.rab?.kodeRekening,
                        jumlah: Number(rincian.harga) * Number(rincian.volume),
                    }
                })
            })

            const anggaranBelanjaFlatten = anggaranBelanja.flat()

            const startDate =
                input.startDate || new Date(format(new Date(), 'yyyy-01-01'))
            const endDate = input.endDate || new Date()

            const filterDate = and(
                startDate ? gte(belanja.tglDokumen, startDate) : undefined,
                endDate ? lte(belanja.tglDokumen, endDate) : undefined
            )

            const rekapBelanja = ctx.db
                .select({
                    rabId: belanja.rabId,
                    jumlah: sql`SUM(${belanja.jumlah})`.as('jumlah'),
                })
                .from(belanja)
                .where(filterDate)
                .groupBy(belanja.rabId)
                .as('belanja')

            const belanjaList = await ctx.db
                .select({
                    id: rab.id,
                    kodeRekening: rab.kodeRekening,
                    jumlah: rekapBelanja.jumlah,
                })
                .from(rab)
                .leftJoin(rekapBelanja, eq(rab.id, rekapBelanja.rabId))
                .where(isNotNull(rekapBelanja.jumlah))

            const kodeRekeningBelanja = [
                ...new Set(belanjaList.map((item) => item.kodeRekening)),
            ]

            const kodeRekeningAnggaran = [
                ...new Set(
                    anggaranBelanjaFlatten.map((item) => item.kodeRekening)
                ),
            ]

            const rekeningLv6 = rekeningLevel6.filter((item) => {
                return (
                    kodeRekeningBelanja.includes(item.kode) ||
                    kodeRekeningAnggaran.includes(item.kode)
                )
            })

            const data = rekeningLv6.map((item) => {
                const belanja = belanjaList.filter(
                    (belanja) => belanja.kodeRekening === item.kode
                )

                return {
                    kodeRekening: item.kode,
                    uraian: item.uraian,
                    anggaran: anggaranBelanjaFlatten
                        .filter((anggaran) => {
                            return anggaran.kodeRekening === item.kode
                        })
                        .reduce((acc, item) => {
                            return acc + item.jumlah
                        }, 0),
                    jumlah: belanja.reduce((acc, item) => {
                        return acc + Number(item.jumlah)
                    }, 0),
                }
            })

            return data
        }),

    getBelanjaLrabyKodeRekening: userProcedure
        .input(
            z.object({
                kodeRekening: z.string(),
                startDate: z.date().optional(),
                endDate: z.date().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const startDate =
                input.startDate || new Date(format(new Date(), 'yyyy-01-01'))
            const endDate = input.endDate || new Date()

            const filterDate = and(
                startDate ? gte(belanja.tglDokumen, startDate) : undefined,
                endDate ? lte(belanja.tglDokumen, endDate) : undefined
            )

            const rabList = await ctx.db.query.rab.findMany({
                where: eq(rab.kodeRekening, input.kodeRekening),
                with: {
                    belanja: {
                        where: filterDate,
                        with: {
                            pegawai: true,
                            rekanan: true,
                            rab: true,
                            lpjBelanja: true,
                        },
                    },
                },
            })

            // belanja list dari rabList
            const belanjaList = rabList.map((rab) => rab.belanja)

            // flatten belanjaList
            const belanjaListFlatten = belanjaList.flat()

            return lodash.sortBy(
                belanjaListFlatten,
                ['tglDokumen', 'noDokumen'],
                ['asc', 'asc']
            )
        }),

    getRealisasiHome: publicProcedure.query(async ({ ctx }) => {
        const realisasi = await ctx.db.query.belanja.findMany({
            with: {
                rab: true,
            },
        })

        return [
            {
                name: 'Belanja Pegawai',
                realisasi: realisasi.reduce((acc, item) => {
                    if (item.rab?.kodeRekening?.startsWith('5.1.01')) {
                        return acc + Number(item.jumlah)
                    }
                    return acc + 0
                }, 0),
            },
            {
                name: 'Belanja Barang dan Jasa',
                realisasi: realisasi.reduce((acc, item) => {
                    if (item.rab?.kodeRekening?.startsWith('5.1.02')) {
                        return acc + Number(item.jumlah)
                    }
                    return acc + 0
                }, 0),
            },
            {
                name: 'Belanja Modal',
                realisasi: realisasi.reduce((acc, item) => {
                    if (item.rab?.kodeRekening?.startsWith('5.2')) {
                        return acc + Number(item.jumlah)
                    }
                    return acc + 0
                }, 0),
            },
        ]
    }),
})
