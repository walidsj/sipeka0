import { rekeningLevel6 } from '@/data/rekening'
import { pendapatan } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { eq, like } from 'drizzle-orm'
import { z } from 'zod'
import { pendapatanSchema } from '../schema/pendapatan'

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
        const realisasi = await ctx.db.select().from(pendapatan)

        return realisasi.reduce((acc, item) => acc + Number(item.jumlah), 0)
    }),
})
