import { belanja, pendapatan, sp3bTable } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { and, eq, gte, lt, lte } from 'drizzle-orm'
import { z } from 'zod'
import { sp3bSchema } from './schema'
import { TRPCError } from '@trpc/server'

export const sp3bRouter = createTRPCRouter({
    getAll: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.sp3bTable.findMany()
    }),

    create: userProcedure.input(sp3bSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(sp3bTable).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        const sp3b = await ctx.db.query.sp3bTable.findFirst({
            where: eq(sp3bTable.id, input),
            with: {
                penandatangan: true,
            },
        })

        if (!sp3b) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Tidak ada data SP3B dengan ID tersebut',
            })
        }

        const belanjaList = await ctx.db.query.belanja.findMany({
            where: and(
                gte(belanja.tglDokumen, sp3b?.tglMulai!),
                lte(belanja.tglDokumen, sp3b?.tglSelesai!)
            ),
            with: {
                rab: true,
            },
        })

        const belanjaBeforeList = await ctx.db.query.belanja.findMany({
            where: lt(belanja.tglDokumen, sp3b?.tglMulai!),
        })

        const rapList = await ctx.db.query.rap.findMany({
            with: {
                pendapatan: {
                    where: and(
                        gte(pendapatan.tglDokumen, sp3b?.tglMulai!),
                        lte(pendapatan.tglDokumen, sp3b?.tglSelesai!)
                    ),
                },
            },
        })

        const pendapatanBeforeList = await ctx.db.query.pendapatan.findMany({
            where: lt(pendapatan.tglDokumen, sp3b?.tglMulai!),
        })

        return {
            ...sp3b,
            belanja: {
                pegawai: belanjaList
                    .filter((item) =>
                        item.rab?.kodeRekening?.startsWith('5.1.01')
                    )
                    .reduce((acc, curr) => acc + Number(curr.jumlah), 0),
                barjas: belanjaList
                    .filter((item) =>
                        item.rab?.kodeRekening?.startsWith('5.1.02')
                    )
                    .reduce((acc, curr) => acc + Number(curr.jumlah), 0),
                modal: belanjaList
                    .filter((item) => item.rab?.kodeRekening?.startsWith('5.2'))
                    .reduce((acc, curr) => acc + Number(curr.jumlah), 0),
            },
            pendapatan: {
                rincian: rapList.map((item) => {
                    return {
                        uraian: item.uraian,
                        jumlah: item.pendapatan.reduce(
                            (acc, curr) => acc + Number(curr.jumlah),
                            0
                        ),
                    }
                }),
                total: rapList.reduce(
                    (acc, curr) =>
                        acc +
                        curr.pendapatan.reduce(
                            (acc, curr) => acc + Number(curr.jumlah),
                            0
                        ),
                    0
                ),
            },
            saldoAwal: {
                belanja: belanjaBeforeList.reduce(
                    (acc, curr) => acc + Number(curr.jumlah),
                    0
                ),
                pendapatan: pendapatanBeforeList.reduce(
                    (acc, curr) => acc + Number(curr.jumlah),
                    0
                ),
            },
        }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(sp3bSchema))
        .mutation(async ({ ctx, input }) => {
            const { id, ...rest } = input
            await ctx.db
                .update(sp3bTable)
                .set({ ...rest })
                .where(eq(sp3bTable.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(sp3bTable).where(eq(sp3bTable.id, input))

            return { message: 'Data berhasil dihapus' }
        }),
})
