import { aktivitasRba, dba } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { and, desc, eq } from 'drizzle-orm'
import { TRPCError } from '@trpc/server'

export const belanjaRouter = createTRPCRouter({
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
                eq(aktivitasRba.jenis, 'BELANJA')
            ),
            with: { rincianRbaBelanja: true },
        })

        return aktivitasPendapatan.reduce((acc, item) => {
            return (
                acc +
                item.rincianRbaBelanja.reduce((acc, item) => {
                    return acc + Number(item.harga) * Number(item.volume)
                }, 0)
            )
        }, 0)
    }),
})
