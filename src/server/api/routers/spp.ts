import { sppSchema } from '../schema/spp'
import { sppTable } from '@/server/db/schema'
import { createTRPCRouter, userProcedure } from '@/server/trpc'
import { desc, eq, like, or } from 'drizzle-orm'
import { z } from 'zod'
import { rekeningLevel6 } from '@/data/rekening'

export const sppRouter = createTRPCRouter({
    getAll: userProcedure
        .input(
            z.object({
                search: z.string().optional(),
                haveSpm: z.boolean().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            let spp = await ctx.db.query.sppTable.findMany({
                orderBy: [desc(sppTable.tglDokumen), desc(sppTable.noDokumen)],
                with: {
                    lpjBelanja: {
                        with: {
                            belanja: true,
                        },
                    },
                    spm: true,
                },
                where: input.search
                    ? or(like(sppTable.noDokumen, `%${input.search}%`))
                    : undefined,
            })

            if (input.haveSpm === true) {
                spp = spp.filter((item) => item.spm)
            }

            if (input.haveSpm === false) {
                spp = spp.filter((item) => !item.spm)
            }

            return spp.map((item) => ({
                id: item.id,
                tglDokumen: item.tglDokumen,
                noDokumen: item.noDokumen,
                uraian: item.lpjBelanja?.uraian,
                jumlah: item.lpjBelanja?.belanja.reduce(
                    (acc, curr) => acc + Number(curr.jumlah),
                    0
                ),
                createdAt: item.createdAt,
                updatedAt: item.updatedAt,
            }))
        }),

    getById: userProcedure.input(z.number()).query(async ({ ctx, input }) => {
        const sppData = await ctx.db.query.sppTable.findFirst({
            where: eq(sppTable.id, input),
            with: {
                lpjBelanja: {
                    with: {
                        belanja: {
                            with: {
                                rab: true,
                            },
                        },
                    },
                },
            },
        })

        if (!sppData) {
            return null
        }

        // add kode and uraian to kodeRekening rab
        return {
            ...sppData,
            lpjBelanja: {
                ...sppData.lpjBelanja,
                belanja:
                    sppData.lpjBelanja?.belanja.map((item) => ({
                        ...item,
                        rab: {
                            ...item.rab,
                            rekening: rekeningLevel6.find(
                                (rekening) =>
                                    rekening.kode === item.rab?.kodeRekening
                            ),
                        },
                    })) || [],
            },
        }
    }),

    create: userProcedure.input(sppSchema).mutation(async ({ ctx, input }) => {
        await ctx.db.insert(sppTable).values(input)

        return { message: 'Data berhasil ditambahkan' }
    }),

    updateById: userProcedure
        .input(z.object({ id: z.number() }).merge(sppSchema))
        .mutation(async ({ ctx, input }) => {
            await ctx.db
                .update(sppTable)
                .set(input)
                .where(eq(sppTable.id, input.id))

            return { message: 'Data berhasil diupdate' }
        }),

    deleteById: userProcedure
        .input(z.number())
        .mutation(async ({ ctx, input }) => {
            await ctx.db.delete(sppTable).where(eq(sppTable.id, input))

            return { message: 'Data berhasil dihapus' }
        }),

    getLatest: userProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.sppTable.findFirst({
            orderBy: [desc(sppTable.tglDokumen), desc(sppTable.noDokumen)],
        })
    }),
})
